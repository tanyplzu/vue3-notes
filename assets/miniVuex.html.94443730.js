import { e as createStaticVNode } from "./app.11f00557.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="\u81EA\u5B9A\u4E49-vuex" tabindex="-1"><a class="header-anchor" href="#\u81EA\u5B9A\u4E49-vuex" aria-hidden="true">#</a> \u81EA\u5B9A\u4E49 Vuex</h1><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">createStore</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">useStore</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token punctuation">{</span> createStore<span class="token punctuation">,</span> useStore <span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre></div><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token function">createStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token function">state</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      count<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  mutations<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      state<span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p>createStore</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">createStore</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    <span class="token comment">// \u4F20\u5165\u7684state\u662F\u4E2A\u65B9\u6CD5\uFF0C\u6211\u4EEC\u771F\u6B63\u9700\u8981\u7684\u662F\u8FD4\u56DE\u7684\u7ED3\u679C</span>\n    state<span class="token operator">:</span> params<span class="token punctuation">.</span><span class="token function">state</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    mutations<span class="token operator">:</span> params<span class="token punctuation">.</span>mutations<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre></div><p>state \u58F0\u660E\u6210\u54CD\u5E94\u5F0F</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">createStore</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    <span class="token comment">// state\u58F0\u660E\u6210\u54CD\u5E94\u5F0F</span>\n    state<span class="token operator">:</span> <span class="token function">reactive</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span><span class="token function">state</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    mutations<span class="token operator">:</span> params<span class="token punctuation">.</span>mutations<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre></div><p>\u589E\u52A0 install \u65B9\u6CD5\uFF0C\u5C06 store \u5B9E\u4F8B\u6CE8\u518C\u5230\u5168\u5C40</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> provide<span class="token punctuation">,</span> inject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>\n<span class="token operator">...</span>\n<span class="token keyword">const</span> <span class="token function-variable function">createStore</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n        state<span class="token operator">:</span> <span class="token function">reactive</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span><span class="token function">state</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        mutations<span class="token operator">:</span> params<span class="token punctuation">.</span>mutations<span class="token punctuation">,</span>\n        <span class="token function">install</span><span class="token punctuation">(</span><span class="token parameter">app</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            app<span class="token punctuation">.</span><span class="token function">provide</span><span class="token punctuation">(</span><span class="token string">&#39;STORE&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>useStore</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token comment">// \u8FD4\u56DEstore\u5B9E\u4F8B</span>\n<span class="token keyword">const</span> <span class="token function-variable function">useStore</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token function">inject</span><span class="token punctuation">(</span><span class="token string">&quot;STORE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre></div><p>commit \u65B9\u6CD5</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">createStore</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    state<span class="token operator">:</span> <span class="token function">reactive</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span><span class="token function">state</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    mutations<span class="token operator">:</span> params<span class="token punctuation">.</span>mutations<span class="token punctuation">,</span>\n    <span class="token comment">// commit\u7528\u6765\u6267\u884Cmutations\u4E0B\u7684\u65B9\u6CD5</span>\n    <span class="token function">commit</span><span class="token punctuation">(</span><span class="token parameter">fun<span class="token punctuation">,</span> payload</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// mutations\u4E0B\u7684\u65B9\u6CD5\u63A5\u53D7state\u4F5C\u4E3A\u53C2\u6570</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>mutations<span class="token punctuation">[</span>fun<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">,</span> payload<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token function">install</span><span class="token punctuation">(</span><span class="token parameter">app</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      app<span class="token punctuation">.</span><span class="token function">provide</span><span class="token punctuation">(</span><span class="token string">&quot;STORE&quot;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre></div><p>\u7B80\u5355\u7248\u672C\u7684 Vuex</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> inject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">createStore</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    state<span class="token operator">:</span> <span class="token function">reactive</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span><span class="token function">state</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    mutations<span class="token operator">:</span> params<span class="token punctuation">.</span>mutations<span class="token punctuation">,</span>\n    <span class="token comment">// commit\u7528\u6765\u6267\u884Cmutations\u4E0B\u7684\u65B9\u6CD5</span>\n    <span class="token function">commit</span><span class="token punctuation">(</span><span class="token parameter">fun<span class="token punctuation">,</span> payload</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// mutations\u4E0B\u7684\u65B9\u6CD5\u63A5\u53D7state\u4F5C\u4E3A\u53C2\u6570</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>mutations<span class="token punctuation">[</span>fun<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">,</span> payload<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token function">install</span><span class="token punctuation">(</span><span class="token parameter">app</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      app<span class="token punctuation">.</span><span class="token function">provide</span><span class="token punctuation">(</span><span class="token string">&quot;STORE&quot;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">useStore</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token function">inject</span><span class="token punctuation">(</span><span class="token string">&quot;STORE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token punctuation">{</span> createStore<span class="token punctuation">,</span> useStore <span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre></div>', 15);
function _sfc_render(_ctx, _cache) {
  return _hoisted_1;
}
_sfc_main.render = _sfc_render;
export { _sfc_main as default };
