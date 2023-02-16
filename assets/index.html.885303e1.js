import { e as createStaticVNode } from "./app.f1ef7422.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.5a098b48.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="card" tabindex="-1"><a class="header-anchor" href="#card" aria-hidden="true">#</a> card</h1><p>card.vue</p><div class="language-vue ext-vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>[ns.b(), ns.is(`${shadow}-shadow`)]<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>$slots.header || header<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ns.e(<span class="token punctuation">&#39;</span>header<span class="token punctuation">&#39;</span>)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>header<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ header }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ns.e(<span class="token punctuation">&#39;</span>body<span class="token punctuation">&#39;</span>)<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>bodyStyle<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token punctuation">/&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> useNamespace <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@element-plus/hooks&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> cardProps <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./card&#39;</span>\n\n<span class="token function">defineOptions</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  name<span class="token operator">:</span> <span class="token string">&#39;ElCard&#39;</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token function">defineProps</span><span class="token punctuation">(</span>cardProps<span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> ns <span class="token operator">=</span> <span class="token function">useNamespace</span><span class="token punctuation">(</span><span class="token string">&#39;card&#39;</span><span class="token punctuation">)</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><p>card.ts</p><div class="language-typescript ext-ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> buildProps<span class="token punctuation">,</span> definePropType <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@element-plus/utils&#39;</span>\n<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> ExtractPropTypes<span class="token punctuation">,</span> StyleValue <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> cardProps <span class="token operator">=</span> <span class="token function">buildProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token doc-comment comment">/**\n   * <span class="token keyword">@description</span> title of the card. Also accepts a DOM passed by `slot#header`\n   */</span>\n  header<span class="token operator">:</span> <span class="token punctuation">{</span>\n    type<span class="token operator">:</span> String<span class="token punctuation">,</span>\n    <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token doc-comment comment">/**\n   * <span class="token keyword">@description</span> CSS style of card body\n   */</span>\n  bodyStyle<span class="token operator">:</span> <span class="token punctuation">{</span>\n    type<span class="token operator">:</span> <span class="token generic-function"><span class="token function">definePropType</span><span class="token generic class-name"><span class="token operator">&lt;</span>StyleValue<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span>String<span class="token punctuation">,</span> Object<span class="token punctuation">,</span> <span class="token builtin">Array</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token doc-comment comment">/**\n   * <span class="token keyword">@description</span> when to show card shadows\n   */</span>\n  shadow<span class="token operator">:</span> <span class="token punctuation">{</span>\n    type<span class="token operator">:</span> String<span class="token punctuation">,</span>\n    values<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;hover&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;never&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span> <span class="token keyword">as</span> <span class="token keyword">const</span><span class="token punctuation">)</span>\n<span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">CardProps</span> <span class="token operator">=</span> ExtractPropTypes<span class="token operator">&lt;</span><span class="token keyword">typeof</span> cardProps<span class="token operator">&gt;</span>\n</code></pre></div><p>instance.ts</p><div class="language-typescript ext-ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token class-name">Card</span> <span class="token keyword">from</span> <span class="token string">&#39;./card.vue&#39;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">CardInstance</span> <span class="token operator">=</span> InstanceType<span class="token operator">&lt;</span><span class="token keyword">typeof</span> Card<span class="token operator">&gt;</span>\n</code></pre></div><p>index.ts</p><div class="language-typescript ext-ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> withInstall <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@element-plus/utils&#39;</span>\n\n<span class="token keyword">import</span> Card <span class="token keyword">from</span> <span class="token string">&#39;./src/card.vue&#39;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> ElCard <span class="token operator">=</span> <span class="token function">withInstall</span><span class="token punctuation">(</span>Card<span class="token punctuation">)</span>\n<span class="token keyword">export</span> <span class="token keyword">default</span> ElCard\n\n<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">&#39;./src/card&#39;</span>\n<span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> CardInstance <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./src/instance&#39;</span>\n\n</code></pre></div>', 9);
function _sfc_render(_ctx, _cache) {
  return _hoisted_1;
}
var index_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index_html as default };
