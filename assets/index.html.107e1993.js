import { r as resolveComponent, c as createElementBlock, a as createBaseVNode, b as createVNode, F as Fragment, d as createTextVNode, o as openBlock } from "./app.f1ef7422.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.5a098b48.js";
var _imports_0 = "/assets/vue2Router.42b64e9d.png";
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
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("h2", {
  id: "vue2-router",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#vue2-router",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" vue2 Router")
], -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createBaseVNode("img", {
    src: _imports_0,
    alt: "vue2Router"
  })
], -1);
const _hoisted_4 = {
  href: "https://next.router.vuejs.org/zh/",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_5 = /* @__PURE__ */ createTextVNode("Vue Router");
function _sfc_render(_ctx, _cache) {
  const _component_OutboundLink = resolveComponent("OutboundLink");
  return openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1,
    _hoisted_2,
    _hoisted_3,
    createBaseVNode("ul", null, [
      createBaseVNode("li", null, [
        createBaseVNode("a", _hoisted_4, [
          _hoisted_5,
          createVNode(_component_OutboundLink)
        ])
      ])
    ])
  ], 64);
}
var index_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index_html as default };
