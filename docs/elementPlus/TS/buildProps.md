# buildProps

```ts
export const buildProps = <
  Props extends Record<
    string,
    | { [epPropKey]: true }
    | NativePropType
    | EpPropInput<any, any, any, any, any>
  >
>(
  props: Props
): {
  [K in keyof Props]: IfEpProp<
    Props[K],
    Props[K],
    IfNativePropType<Props[K], Props[K], EpPropConvert<Props[K]>>
  >
} =>
  fromPairs(
    Object.entries(props).map(([key, option]) => [
      key,
      buildProp(option as any, key),
    ])
  ) as any
```

## 泛型

先来TS泛型的应用

普通函数：

```js
function drinkMilk(args) {
  console.log(args); 
}
```

加上泛型：在参数前加 `<T>`

```ts
function drinkMilk<T>(args:T) {
  console.log(args); 
}
```

带返回值：在参数后面加 : T

```ts
function drinkMilk<T>(args:T) ：T { return args }
```

使用箭头函数 `=>`

```ts
const getMilk = <T>(args: T) : T => { return args; }
```

给泛型 T 加上约束条件

```ts
interface WithLength { 
  length: number; 
}
const getMilk = <T extends WithLength>(args: T) : T =>{
  return args.length;
}
```

## 带约束的泛型

> 知识点：Record<key, value>

```ts
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

取 K 中的每一个属性，该属性的值是 T 类型。

```ts
type person = 'man' | 'woman'
interface Info {
    name: string,
    age: number
}
type personInfo = Record<person, Info>
```

Record 可以把超能力赋予每一个人。瞬间就让 man 和 woman 拥有了 name 和 age 属性。

再来看 Element Plus 源码中的部分

```ts
type epValue = 
    | { [epPropKey]: true }
    | NativePropType
    | EpPropInput<any, any, any, any, any>
    
Props extends Record<string, epValue>
```

`Props extends Record`，表示 Props 应符合后面 Record 的约束，即：
Props 需要是 string 类型的 key，epValue 那三种类型的 value

- { ['__epPropKey'] : true }
- NativePropType : 原生 prop 类型
- EpPropInput : Element Plus 定义的 Prop 输入类型

```ts
type EpPropInput = {
    type?: StringConstructor | undefined;
    required?: true | undefined;
    values?: readonly "a"[] | undefined;
    validator?: ((val: any) => boolean) | ((val: any) => val is never) | undefined;
    default?: undefined;
  }
```

通过对泛型 Props 的约束，结合参数 props: Props，表示出：该函数的入参，必须满足 props 的 key 是 string 类型，value 是上述的 epValue 的三种联合类型之一。

## buildProps 返回值

通过花括号 {}，判断返回值应该是一个 object

```ts
{
  [K in keyof Props]: IfEpProp<
    Props[K],
    Props[K],
    IfNativePropType<Props[K], Props[K], EpPropConvert<Props[K]>>
  >
}
```

其 key 是 [K in keyof Props]，value 通过 IfEpProp 的返回。

IfEpProp

```ts
export type IfEpProp<T, Y, N> = T extends { [epPropKey]: true } ? Y : N
```

IfNativePropType

```ts
/**
 * 原生 prop `类型，BooleanConstructor`、`StringConstructor`、`null`、`undefined` 等
 */
export type NativePropType =
  | ((...args: any) => any)
  | { new (...args: any): any }
  | undefined
  | null
export type IfNativePropType<T, Y, N> = [T] extends [NativePropType] ? Y : N
```

EpPropConvert

```ts
/**
 * 将输入转换为输出
 */
export type EpPropConvert<Input> = Input extends EpPropInput<
  infer Type,
  infer Value,
  infer Validator,
  any,
  infer Required
>
  ? EpPropFinalized<Type, Value, Validator, Input['default'], Required>
  : never
```

### [K in keyof Props]

一个例子

```ts
function getValue(obj: object, key: string) {
  return obj[key] // error
}
```

我们会得到一段报错，这是新手 TypeScript 开发者常常犯的错误，编译器告诉我们，参数 obj 实际上是 {},因此后面的 key 是无法在上面取到任何值的。

```ts
function getValue<T extends object>(obj: T, key: string) {
  return obj[key] // error
}
```

这依然解决不了问题。因为我们第二个参数 key 是不是存在于 obj 上是无法确定的，因此我们需要对这个 key 也进行约束，我们把它约束为只存在于 obj 属性的类型，这个时候需要借助到索引类型进行实现 `<U extends keyof T>`

```ts
function getValue<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key] // ok
}
```

### 值判断

源码中通过 IfEpProp, IfNativePropType, EpPropConvert 三部分，对 `Props[K]` 做了判断、转换。

- IfEpProp: 如果是 EpProp 类型，则直接输出
- IfNativePropType: 如果是原生Prop类型，则直接输出
- EpPropConvert: 转换成 EpPropFinalized 输出

## buildProps 函数实际内容

```ts
fromPairs(
    Object.entries(props).map(([key, option]) => [
      key,
      buildProp(option as any, key),
    ])
  ) as any
```

大致流程如下:

- Object.entries 将 props 转换为二维数组
- 将二维数组以 key option 的形式取出，实际上就是拿到了 props 中的参数的 key 和 value
- 将 value 通过 buildProp 函数处理一下
- fromPairs 又将二维数组转换成 object

通过源码中注释可以知道，buildProp 是为了 “生成 prop，能更好地优化类型”。所以最终结论，就是对 props 中的所有 value 进行类型优化。

这么说有点生硬了，举个例子：

我们的 Props 如下：

```ts
{
  name: {
    type: String,
    default: 'sun',
  },
  age: {
    type: Number,
    default: 18,
  },
}
```

经过 Object.entries 后，转换为

```ts
[
 ['name', {type:String, default:'sun'}],
 ['age', {type:Number, default:18}],
]
```

通过 map 遍历，key 是 'name', option 是 {type:String, defalut: 'sun'} ，再通过 buildProp 函数将其转化为 EpPropFinalized 类型

```ts
{
    0: false,
    1: true,
    default: "sun",
    required: false,
    type: String,
    validator: undefined,
    __epPropKey: true
}
```

遍历结束后，通过 fromPairs 转回 object，最终返回结果。

## 小结

Element Plus 的 buildProps 方法，说白了就是对 element 组件开发过程中，大家编码时的 Props 的设置，进行了统一格式化，或者说优化类型。

> <https://juejin.cn/post/7138061136112386079>
