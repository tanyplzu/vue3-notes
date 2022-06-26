import { e as createStaticVNode } from "./app.11f00557.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="mini-vue" tabindex="-1"><a class="header-anchor" href="#mini-vue" aria-hidden="true">#</a> mini vue</h1><p>\u5C24\u96E8\u6EAA</p><div class="language-html ext-html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n  <span class="token comment">// v-dom</span>\n  <span class="token keyword">function</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token parameter">tag<span class="token punctuation">,</span> props<span class="token punctuation">,</span> children</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      tag<span class="token punctuation">,</span>\n      props<span class="token punctuation">,</span>\n      children<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">function</span> <span class="token function">mount</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> el <span class="token operator">=</span> <span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>tag<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// props \u89E3\u6790props \u4E3Ael\u8BBE\u7F6Eattribute</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> vnode<span class="token punctuation">.</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> value <span class="token operator">=</span> vnode<span class="token punctuation">.</span>props<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>key<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&#39;on&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          el<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>key<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n          el<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token comment">// children</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>children<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> vnode<span class="token punctuation">.</span>children <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        el<span class="token punctuation">.</span>textContent <span class="token operator">=</span> vnode<span class="token punctuation">.</span>children<span class="token punctuation">;</span>\n      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        vnode<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">child</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n          <span class="token function">mount</span><span class="token punctuation">(</span>child<span class="token punctuation">,</span> el<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// \u5143\u7D20\u6302\u8F7D\u5728container\u4E0A</span>\n    container<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">function</span> <span class="token function">patch</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> el <span class="token operator">=</span> <span class="token punctuation">(</span>n2<span class="token punctuation">.</span>el <span class="token operator">=</span> n1<span class="token punctuation">.</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>n1<span class="token punctuation">.</span>tag <span class="token operator">===</span> n2<span class="token punctuation">.</span>tag<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">//props</span>\n      <span class="token keyword">const</span> oldProps <span class="token operator">=</span> n1<span class="token punctuation">.</span>props <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n      <span class="token keyword">const</span> newProps <span class="token operator">=</span> n2<span class="token punctuation">.</span>props <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> newProps<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> oldValue <span class="token operator">=</span> oldProps<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>\n        <span class="token keyword">const</span> newValue <span class="token operator">=</span> newProps<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>newValue <span class="token operator">!==</span> oldValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          el<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span>\n\n      <span class="token comment">// \u5220\u9664props \u5220\u9664\u65E7vnode\u4E0A\u9762\u7684attrbute</span>\n      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> oldProps<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> newProps<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          el<span class="token punctuation">.</span><span class="token function">removeAttribute</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span>\n\n      <span class="token comment">// children</span>\n      <span class="token keyword">const</span> oldChildren <span class="token operator">=</span> n1<span class="token punctuation">.</span>children<span class="token punctuation">;</span>\n      <span class="token keyword">const</span> newChildren <span class="token operator">=</span> n2<span class="token punctuation">.</span>children<span class="token punctuation">;</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> newChildren <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// newChild \u4E3A\u5B57\u7B26\u4E32</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> oldChildren <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token keyword">if</span> <span class="token punctuation">(</span>newChildren <span class="token operator">!==</span> oldChildren<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            el<span class="token punctuation">.</span>textContent <span class="token operator">=</span> newChildren<span class="token punctuation">;</span>\n          <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n          el<span class="token punctuation">.</span>textContent <span class="token operator">=</span> newChildren<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        <span class="token comment">// newChild \u4E3A\u6570\u7EC4</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> oldChildren <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token comment">// newChildren\u4E3A\u6570\u7EC4 oldChild\u4E3A\u5B57\u7B26\u4E32</span>\n          el<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>\n          newChildren<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">child</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n            <span class="token function">mount</span><span class="token punctuation">(</span>child<span class="token punctuation">,</span> el<span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n          <span class="token comment">// newChildren oldChildren\u90FD\u4E3A\u6570\u7EC4</span>\n\n          <span class="token comment">// \u516C\u5171\u90E8\u5206\u957F\u5EA6</span>\n          <span class="token keyword">const</span> commonLength <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>oldChildren<span class="token punctuation">.</span>length<span class="token punctuation">,</span> newChildren<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n          <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> commonLength<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token function">patch</span><span class="token punctuation">(</span>oldChildren<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> newChildren<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token punctuation">}</span>\n\n          <span class="token keyword">if</span> <span class="token punctuation">(</span>newChildren<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> oldChildren<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            newChildren<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>commonLength<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">child</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n              <span class="token function">mount</span><span class="token punctuation">(</span>child<span class="token punctuation">,</span> el<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>newChildren<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> oldChildren<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            oldChildren<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>commonLength<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">child</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n              el<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>child<span class="token punctuation">.</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token comment">//reactivity</span>\n  <span class="token keyword">let</span> activeEffect<span class="token punctuation">;</span>\n\n  <span class="token comment">// \u4F9D\u8D56\u6536\u96C6\u5668</span>\n  <span class="token keyword">class</span> <span class="token class-name">Dep</span> <span class="token punctuation">{</span>\n    subscribers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>subscribers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>subscribers<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">effect</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">function</span> <span class="token function">watchEffect</span><span class="token punctuation">(</span><span class="token parameter">effect</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    activeEffect <span class="token operator">=</span> effect<span class="token punctuation">;</span>\n    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    activeEffect <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">const</span> targetMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token comment">// \u8BE5\u51FD\u6570\u7684\u529F\u80FD\u662F\u8FD4\u56DEtarget[key]\u7684\u4F9D\u8D56\u6536\u96C6\u5668</span>\n  <span class="token keyword">function</span> <span class="token function">getTarget</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// depsMap\u4E3AMap\u7C7B\u578B \u91CC\u9762\u5B58\u50A8\u8981\u54CD\u5E94\u7684\u5BF9\u8C61\u7684Map</span>\n    <span class="token doc-comment comment">/**\n     * <span class="token punctuation">{</span>\n     *  [target]: Map()\n     *<span class="token punctuation">}</span>\n     */</span>\n    <span class="token keyword">let</span> depsMap <span class="token operator">=</span> targetMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      depsMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      targetMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> depsMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// \u4E3A\u6BCF\u4E00\u4E2Akey\u8BBE\u7F6EDep\u76D1\u542C\u7C7B</span>\n    <span class="token keyword">let</span> dep <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>dep<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      dep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      depsMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> dep<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> dep<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">const</span> reactiveHandler <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">const</span> dep <span class="token operator">=</span> <span class="token function">getTarget</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token comment">// \u6536\u96C6\u4F9D\u8D56</span>\n      dep<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">const</span> dep <span class="token operator">=</span> <span class="token function">getTarget</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token keyword">const</span> result <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">function</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token parameter">raw</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>raw<span class="token punctuation">,</span> reactiveHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token punctuation">{</span>\n    data<span class="token operator">:</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      count<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>\n        <span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span>\n        <span class="token punctuation">{</span>\n          <span class="token function-variable function">onClick</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span>\n          <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token function">String</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">.</span>count<span class="token punctuation">)</span>\n      <span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">function</span> <span class="token function">mountApp</span><span class="token punctuation">(</span><span class="token parameter">component<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> isMounted <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n    <span class="token keyword">let</span> prevVdom<span class="token punctuation">;</span>\n\n    <span class="token function">watchEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        prevVdom <span class="token operator">=</span> component<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">mount</span><span class="token punctuation">(</span>prevVdom<span class="token punctuation">,</span> container<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        isMounted <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> newVdom <span class="token operator">=</span> component<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">patch</span><span class="token punctuation">(</span>prevVdom<span class="token punctuation">,</span> newVdom<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        prevVdom <span class="token operator">=</span> newVdom<span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">mountApp</span><span class="token punctuation">(</span>App<span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;app&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>', 3);
function _sfc_render(_ctx, _cache) {
  return _hoisted_1;
}
_sfc_main.render = _sfc_render;
export { _sfc_main as default };
