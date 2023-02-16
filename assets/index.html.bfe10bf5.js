import { r as resolveComponent, c as createElementBlock, a as createBaseVNode, b as createVNode, F as Fragment, d as createTextVNode, o as openBlock } from "./app.f1ef7422.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.5a098b48.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h1", {
  id: "introduction",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#introduction",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" Introduction")
], -1);
const _hoisted_2 = {
  href: "https://juejin.cn/post/6914598983205847053",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_3 = /* @__PURE__ */ createTextVNode("Vue 3 \u7EC4\u4EF6\u5E93\uFF1Aelement-plus \u6E90\u7801\u5206\u6790");
function _sfc_render(_ctx, _cache) {
  const _component_OutboundLink = resolveComponent("OutboundLink");
  return openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1,
    createBaseVNode("ul", null, [
      createBaseVNode("li", null, [
        createBaseVNode("a", _hoisted_2, [
          _hoisted_3,
          createVNode(_component_OutboundLink)
        ])
      ])
    ])
  ], 64);
}
var index_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index_html as default };
