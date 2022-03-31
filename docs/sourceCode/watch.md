# watch

```ts
function doWatch(
  source: WatchSource | WatchSource[] | WatchEffect | object,
  cb: WatchCallback | null,
  { immediate, deep, flush, onTrack, onTrigger }: WatchOptions = EMPTY_OBJ,
  instance = currentInstance
): WatchStopHandle {
  let getter: () => any;
  let forceTrigger = false;
  let isMultiSource = false;

  // 对不同的情况做getter赋值
  if (isRef(source)) {
    // ref通过.value获取
    getter = () => (source as Ref).value;
    forceTrigger = !!(source as Ref)._shallow;
  } else if (isReactive(source)) {
    // reactive直接获取
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    // 如果是数组，做遍历处理
    isMultiSource = true;
    forceTrigger = source.some(isReactive);
    getter = () =>
      source.map((s) => {
        if (isRef(s)) {
          return s.value;
        } else if (isReactive(s)) {
          return traverse(s);
        } else if (isFunction(s)) {
          return callWithErrorHandling(s, instance, ErrorCodes.WATCH_GETTER, [
            instance && (instance.proxy as any),
          ]);
        } else {
          __DEV__ && warnInvalidSource(s);
        }
      });
  } else if (isFunction(source)) {
    // 如果是函数的情况
    // 有cb则为watch，没有则为watchEffect
    if (cb) {
      // getter with cb
      getter = () =>
        callWithErrorHandling(source, instance, ErrorCodes.WATCH_GETTER, [
          instance && (instance.proxy as any),
        ]);
    } else {
      // no cb -> simple effect
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          ErrorCodes.WATCH_CALLBACK,
          [onInvalidate]
        );
      };
    }
  } else {
    // 异常情况
    getter = NOOP;
    // 抛出异常
    __DEV__ && warnInvalidSource(source);
  }

  // 深度监听逻辑处理
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }

  let cleanup: () => void;
  let onInvalidate: InvalidateCbRegistrator = (fn: () => void) => {
    cleanup = runner.options.onStop = () => {
      callWithErrorHandling(fn, instance, ErrorCodes.WATCH_CLEANUP);
    };
  };

  // 记录oldValue，并通过runner获取newValue
  // callback的封装处理为job
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job: SchedulerJob = () => {
    if (!runner.active) {
      return;
    }
    if (cb) {
      // watch(source, cb)
      const newValue = runner();
      if (
        deep ||
        forceTrigger ||
        (isMultiSource
          ? (newValue as any[]).some((v, i) =>
              hasChanged(v, (oldValue as any[])[i])
            )
          : hasChanged(newValue, oldValue)) ||
        (__COMPAT__ &&
          isArray(newValue) &&
          isCompatEnabled(DeprecationTypes.WATCH_ARRAY, instance))
      ) {
        // cleanup before running cb again
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, ErrorCodes.WATCH_CALLBACK, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
          onInvalidate,
        ]);
        oldValue = newValue;
      }
    } else {
      // watchEffect
      runner();
    }
  };

  // important: mark the job as a watcher callback so that scheduler knows
  // it is allowed to self-trigger (#1727)
  job.allowRecurse = !!cb;

  // 通过读取配置，处理job的触发时机
  // 并再次将job的执行封装到scheduler中
  let scheduler: ReactiveEffectOptions['scheduler'];
  if (flush === 'sync') {
    // 同步执行
    scheduler = job;
  } else if (flush === 'post') {
    // 更新后执行
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    // default: 'pre'
    // 更新前执行
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job);
      } else {
        // with 'pre' option, the first call must happen before
        // the component is mounted so it is called synchronously.
        job();
      }
    };
  }

  // 使用effect副作用处理依赖收集，在依赖更新后调用scheduler（其中封装了callback的执行）
  const runner = effect(getter, {
    lazy: true,
    onTrack,
    onTrigger,
    scheduler,
  });

  // 收集依赖
  recordInstanceBoundEffect(runner, instance);

  // 读取配置，进行watch初始化
  // 是否有cb
  if (cb) {
    // 是否立刻执行
    if (immediate) {
      job();
    } else {
      oldValue = runner();
    }
  } else if (flush === 'post') {
    // 是否更新后执行
    queuePostRenderEffect(runner, instance && instance.suspense);
  } else {
    runner();
  }

  // 返回手动停止函数
  return () => {
    stop(runner);
    if (instance) {
      remove(instance.effects!, runner);
    }
  };
}
```
