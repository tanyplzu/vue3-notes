import { e as createStaticVNode } from "./app.11f00557.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="validation" tabindex="-1"><a class="header-anchor" href="#validation" aria-hidden="true">#</a> validation</h1><p>\u5D4C\u5957\u7684\u719F\u6089\u4F7F\u7528<code>:</code></p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token comment">// form-item.vue</span>\n<span class="token keyword">const</span> fieldValue <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> model <span class="token operator">=</span> elForm<span class="token punctuation">.</span>model<span class="token punctuation">;</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>model <span class="token operator">||</span> <span class="token operator">!</span>props<span class="token punctuation">.</span>prop<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">let</span> path <span class="token operator">=</span> props<span class="token punctuation">.</span>prop<span class="token punctuation">;</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&#39;:&#39;</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    path <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">:</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">&#39;.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">return</span> <span class="token function">getPropByPath</span><span class="token punctuation">(</span>model<span class="token punctuation">,</span> path<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">.</span>v<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div>', 3);
function _sfc_render(_ctx, _cache) {
  return _hoisted_1;
}
_sfc_main.render = _sfc_render;
export { _sfc_main as default };
