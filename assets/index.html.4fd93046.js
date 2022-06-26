import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, w as withCtx, F as Fragment, d as createTextVNode } from "./app.11f00557.js";
var _imports_0 = "/assets/vuex.804b3f17.png";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h1", {
  id: "vuex-\u7B14\u8BB0",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#vuex-\u7B14\u8BB0",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" vuex \u7B14\u8BB0")
], -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("blockquote", null, [
  /* @__PURE__ */ createBaseVNode("p", null, "Flux \u67B6\u6784\u5C31\u50CF\u773C\u955C\uFF1A\u60A8\u81EA\u4F1A\u77E5\u9053\u4EC0\u4E48\u65F6\u5019\u9700\u8981\u5B83\u3002 \u2014\u2014 Redux \u7684\u4F5C\u8005 Dan Abramov")
], -1);
const _hoisted_3 = { class: "table-of-contents" };
const _hoisted_4 = /* @__PURE__ */ createTextVNode("vuex \u5173\u7CFB\u56FE");
const _hoisted_5 = /* @__PURE__ */ createTextVNode("\u793A\u4F8B");
const _hoisted_6 = /* @__PURE__ */ createTextVNode("form \u8868\u5355\u95EE\u9898");
const _hoisted_7 = /* @__PURE__ */ createTextVNode("\u5B98\u65B9\u89E3\u51B3");
const _hoisted_8 = /* @__PURE__ */ createTextVNode("\u8BA1\u7B97\u5C5E\u6027 set\u3001get \u65B9\u5F0F");
const _hoisted_9 = /* @__PURE__ */ createTextVNode("vuex \u6709\u5173\u7684\u95EE\u9898");
const _hoisted_10 = /* @__PURE__ */ createTextVNode("1. vuex \u4E2D\u4E3A\u4EC0\u4E48\u628A\u628A\u5F02\u6B65\u64CD\u4F5C\u5C01\u88C5\u5728 action\uFF0C\u628A\u540C\u6B65\u64CD\u4F5C\u653E\u5728 mutations\uFF1F");
const _hoisted_11 = /* @__PURE__ */ createTextVNode("2. state \u5185\u90E8\u652F\u6301\u6A21\u5757\u914D\u7F6E\u548C\u6A21\u5757\u5D4C\u5957\uFF0C\u5982\u4F55\u5B9E\u73B0\u7684\uFF1F");
const _hoisted_12 = /* @__PURE__ */ createTextVNode("defineProperty \u4F55\u65F6\u6267\u884C");
const _hoisted_13 = /* @__PURE__ */ createBaseVNode("h2", {
  id: "vuex-\u5173\u7CFB\u56FE",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#vuex-\u5173\u7CFB\u56FE",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" vuex \u5173\u7CFB\u56FE")
], -1);
const _hoisted_14 = /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createBaseVNode("img", {
    src: _imports_0,
    alt: "vuex"
  })
], -1);
const _hoisted_15 = /* @__PURE__ */ createBaseVNode("h2", {
  id: "\u793A\u4F8B",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#\u793A\u4F8B",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" \u793A\u4F8B")
], -1);
const _hoisted_16 = /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createBaseVNode("code", null, "/app.js")
], -1);
const _hoisted_17 = /* @__PURE__ */ createBaseVNode("div", { class: "language-javascript ext-js" }, [
  /* @__PURE__ */ createBaseVNode("pre", { class: "language-javascript" }, [
    /* @__PURE__ */ createBaseVNode("code", null, [
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "import"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode(" createApp "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "from"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'vue'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "import"),
      /* @__PURE__ */ createTextVNode(" App "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "from"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'./components/App.vue'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "import"),
      /* @__PURE__ */ createTextVNode(" store "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "from"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'./store'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "import"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode(" currency "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "from"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'./currency'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "const"),
      /* @__PURE__ */ createTextVNode(" app "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "createApp"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createTextVNode("App"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n\napp"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "use"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createTextVNode("store"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n\napp"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "mount"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'#app'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n")
    ])
  ])
], -1);
const _hoisted_18 = /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createBaseVNode("code", null, "/store/index.js")
], -1);
const _hoisted_19 = /* @__PURE__ */ createBaseVNode("div", { class: "language-javascript ext-js" }, [
  /* @__PURE__ */ createBaseVNode("pre", { class: "language-javascript" }, [
    /* @__PURE__ */ createBaseVNode("code", null, [
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "import"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode(" createStore"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode(" createLogger "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "from"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'vuex'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "import"),
      /* @__PURE__ */ createTextVNode(" products "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "from"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'./modules/products'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "const"),
      /* @__PURE__ */ createTextVNode(" debug "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(" process"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("env"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token constant" }, "NODE_ENV"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "!=="),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'production'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "export"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "default"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "createStore"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n  modules"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n    products"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\n  strict"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
      /* @__PURE__ */ createTextVNode(" debug"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\n  plugins"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
      /* @__PURE__ */ createTextVNode(" debug "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "?"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "["),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "createLogger"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "]"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "["),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "]"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n")
    ])
  ])
], -1);
const _hoisted_20 = /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createBaseVNode("code", null, "/store/modules/products.js")
], -1);
const _hoisted_21 = /* @__PURE__ */ createBaseVNode("div", { class: "language-javascript ext-js" }, [
  /* @__PURE__ */ createBaseVNode("pre", { class: "language-javascript" }, [
    /* @__PURE__ */ createBaseVNode("code", null, [
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "import"),
      /* @__PURE__ */ createTextVNode(" shop "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "from"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'../../api/shop'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token comment" }, "// initial state"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "const"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function-variable function" }, "state"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "=>"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n  all"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "["),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "]"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token comment" }, "// getters"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "const"),
      /* @__PURE__ */ createTextVNode(" getters "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token comment" }, "// actions"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "const"),
      /* @__PURE__ */ createTextVNode(" actions "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "async"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "getAllProducts"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token parameter" }, [
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
        /* @__PURE__ */ createTextVNode(" commit "),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}")
      ]),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n    "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "const"),
      /* @__PURE__ */ createTextVNode(" products "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "await"),
      /* @__PURE__ */ createTextVNode(" shop"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "getProducts"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n    "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "commit"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'setProducts'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode(" products"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token comment" }, "// mutations"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "const"),
      /* @__PURE__ */ createTextVNode(" mutations "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "setProducts"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token parameter" }, [
        /* @__PURE__ */ createTextVNode("state"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
        /* @__PURE__ */ createTextVNode(" products")
      ]),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n    state"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("all "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(" products"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\n\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "decrementProductInventory"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token parameter" }, [
        /* @__PURE__ */ createTextVNode("state"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
        /* @__PURE__ */ createTextVNode(" id "),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}")
      ]),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n    "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "const"),
      /* @__PURE__ */ createTextVNode(" product "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(" state"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("all"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "find"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token parameter" }, "product"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "=>"),
      /* @__PURE__ */ createTextVNode(" product"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("id "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "==="),
      /* @__PURE__ */ createTextVNode(" id"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n    product"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("inventory"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "--"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "export"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "default"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n  namespaced"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token boolean" }, "true"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\n  state"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\n  getters"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\n  actions"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\n  mutations"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n")
    ])
  ])
], -1);
const _hoisted_22 = /* @__PURE__ */ createBaseVNode("h2", {
  id: "form-\u8868\u5355\u95EE\u9898",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#form-\u8868\u5355\u95EE\u9898",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" form \u8868\u5355\u95EE\u9898")
], -1);
const _hoisted_23 = /* @__PURE__ */ createBaseVNode("h3", {
  id: "\u5B98\u65B9\u89E3\u51B3",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#\u5B98\u65B9\u89E3\u51B3",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" \u5B98\u65B9\u89E3\u51B3")
], -1);
const _hoisted_24 = /* @__PURE__ */ createBaseVNode("div", { class: "language-html ext-html" }, [
  /* @__PURE__ */ createBaseVNode("pre", { class: "language-html" }, [
    /* @__PURE__ */ createBaseVNode("code", null, [
      /* @__PURE__ */ createBaseVNode("span", { class: "token tag" }, [
        /* @__PURE__ */ createBaseVNode("span", { class: "token tag" }, [
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "<"),
          /* @__PURE__ */ createTextVNode("input")
        ]),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token attr-name" }, ":value"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token attr-value" }, [
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation attr-equals" }, "="),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, '"'),
          /* @__PURE__ */ createTextVNode("message"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, '"')
        ]),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token attr-name" }, "@input"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token attr-value" }, [
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation attr-equals" }, "="),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, '"'),
          /* @__PURE__ */ createTextVNode("updateMessage"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, '"')
        ]),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "/>")
      ]),
      /* @__PURE__ */ createTextVNode("\n")
    ])
  ])
], -1);
const _hoisted_25 = /* @__PURE__ */ createBaseVNode("div", { class: "language-javascript ext-js" }, [
  /* @__PURE__ */ createBaseVNode("pre", { class: "language-javascript" }, [
    /* @__PURE__ */ createBaseVNode("code", null, [
      /* @__PURE__ */ createBaseVNode("span", { class: "token comment" }, "// ..."),
      /* @__PURE__ */ createTextVNode("\ncomputed"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "..."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "mapState"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n    "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function-variable function" }, "message"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token parameter" }, "state"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "=>"),
      /* @__PURE__ */ createTextVNode(" state"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("obj"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("message\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\nmethods"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "updateMessage"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token parameter" }, "e"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n    "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "this"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("$store"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "commit"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'updateMessage'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode(" e"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("target"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("value"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createTextVNode("\n")
    ])
  ])
], -1);
const _hoisted_26 = /* @__PURE__ */ createBaseVNode("p", null, "\u4E0B\u9762\u662F mutation \u51FD\u6570\uFF1A", -1);
const _hoisted_27 = /* @__PURE__ */ createBaseVNode("div", { class: "language-javascript ext-js" }, [
  /* @__PURE__ */ createBaseVNode("pre", { class: "language-javascript" }, [
    /* @__PURE__ */ createBaseVNode("code", null, [
      /* @__PURE__ */ createBaseVNode("span", { class: "token comment" }, "// ..."),
      /* @__PURE__ */ createTextVNode("\nmutations"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "updateMessage"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token parameter" }, [
        /* @__PURE__ */ createTextVNode("state"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
        /* @__PURE__ */ createTextVNode(" message")
      ]),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n    state"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("obj"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("message "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(" message\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createTextVNode("\n")
    ])
  ])
], -1);
const _hoisted_28 = /* @__PURE__ */ createBaseVNode("h4", {
  id: "\u53CC\u5411\u7ED1\u5B9A\u7684\u8BA1\u7B97\u5C5E\u6027",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#\u53CC\u5411\u7ED1\u5B9A\u7684\u8BA1\u7B97\u5C5E\u6027",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" \u53CC\u5411\u7ED1\u5B9A\u7684\u8BA1\u7B97\u5C5E\u6027")
], -1);
const _hoisted_29 = /* @__PURE__ */ createBaseVNode("p", null, "\u4F7F\u7528\u5E26\u6709 setter \u7684\u53CC\u5411\u7ED1\u5B9A\u8BA1\u7B97\u5C5E\u6027", -1);
const _hoisted_30 = /* @__PURE__ */ createBaseVNode("div", { class: "language-html ext-html" }, [
  /* @__PURE__ */ createBaseVNode("pre", { class: "language-html" }, [
    /* @__PURE__ */ createBaseVNode("code", null, [
      /* @__PURE__ */ createBaseVNode("span", { class: "token tag" }, [
        /* @__PURE__ */ createBaseVNode("span", { class: "token tag" }, [
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "<"),
          /* @__PURE__ */ createTextVNode("input")
        ]),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token attr-name" }, "v-model"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token attr-value" }, [
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation attr-equals" }, "="),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, '"'),
          /* @__PURE__ */ createTextVNode("message"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, '"')
        ]),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "/>")
      ]),
      /* @__PURE__ */ createTextVNode("\n")
    ])
  ])
], -1);
const _hoisted_31 = /* @__PURE__ */ createBaseVNode("div", { class: "language-javascript ext-js" }, [
  /* @__PURE__ */ createBaseVNode("pre", { class: "language-javascript" }, [
    /* @__PURE__ */ createBaseVNode("code", null, [
      /* @__PURE__ */ createBaseVNode("span", { class: "token comment" }, "// ..."),
      /* @__PURE__ */ createTextVNode("\ncomputed"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n  message"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n    "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "get"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n      "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "return"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "this"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("$store"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("state"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("obj"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("message\n    "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\n    "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "set"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createTextVNode("value"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n      "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "this"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("$store"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "commit"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'updateMessage'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode(" value"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode("\n    "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createTextVNode("\n")
    ])
  ])
], -1);
const _hoisted_32 = /* @__PURE__ */ createBaseVNode("h3", {
  id: "\u8BA1\u7B97\u5C5E\u6027-set\u3001get-\u65B9\u5F0F",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#\u8BA1\u7B97\u5C5E\u6027-set\u3001get-\u65B9\u5F0F",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" \u8BA1\u7B97\u5C5E\u6027 set\u3001get \u65B9\u5F0F")
], -1);
const _hoisted_33 = /* @__PURE__ */ createBaseVNode("div", { class: "language-vue ext-vue" }, [
  /* @__PURE__ */ createBaseVNode("pre", { class: "language-vue" }, [
    /* @__PURE__ */ createBaseVNode("code", null, [
      /* @__PURE__ */ createBaseVNode("span", { class: "token tag" }, [
        /* @__PURE__ */ createBaseVNode("span", { class: "token tag" }, [
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "<"),
          /* @__PURE__ */ createTextVNode("template")
        ]),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ">")
      ]),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token tag" }, [
        /* @__PURE__ */ createBaseVNode("span", { class: "token tag" }, [
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "<"),
          /* @__PURE__ */ createTextVNode("div")
        ]),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ">")
      ]),
      /* @__PURE__ */ createTextVNode("\n    "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token tag" }, [
        /* @__PURE__ */ createBaseVNode("span", { class: "token tag" }, [
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "<"),
          /* @__PURE__ */ createTextVNode("input")
        ]),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token attr-name" }, "v-model"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token attr-value" }, [
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation attr-equals" }, "="),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, '"'),
          /* @__PURE__ */ createTextVNode("stateValue"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, '"')
        ]),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "/>")
      ]),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token tag" }, [
        /* @__PURE__ */ createBaseVNode("span", { class: "token tag" }, [
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "</"),
          /* @__PURE__ */ createTextVNode("div")
        ]),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ">")
      ]),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token tag" }, [
        /* @__PURE__ */ createBaseVNode("span", { class: "token tag" }, [
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "</"),
          /* @__PURE__ */ createTextVNode("template")
        ]),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ">")
      ]),
      /* @__PURE__ */ createTextVNode("\n\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token tag" }, [
        /* @__PURE__ */ createBaseVNode("span", { class: "token tag" }, [
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "<"),
          /* @__PURE__ */ createTextVNode("script")
        ]),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ">")
      ]),
      /* @__PURE__ */ createBaseVNode("span", { class: "token script" }, [
        /* @__PURE__ */ createBaseVNode("span", { class: "token language-javascript" }, [
          /* @__PURE__ */ createTextVNode("\n"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "export"),
          /* @__PURE__ */ createTextVNode(),
          /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "default"),
          /* @__PURE__ */ createTextVNode(),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
          /* @__PURE__ */ createTextVNode("\n  computed"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
          /* @__PURE__ */ createTextVNode(),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
          /* @__PURE__ */ createTextVNode("\n    stateValue"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
          /* @__PURE__ */ createTextVNode(),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
          /* @__PURE__ */ createTextVNode("\n      "),
          /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "get"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
          /* @__PURE__ */ createTextVNode(),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
          /* @__PURE__ */ createTextVNode("\n        "),
          /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "return"),
          /* @__PURE__ */ createTextVNode(),
          /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "this"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
          /* @__PURE__ */ createTextVNode("$store"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
          /* @__PURE__ */ createTextVNode("state"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
          /* @__PURE__ */ createTextVNode("stateValue"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
          /* @__PURE__ */ createTextVNode("\n      "),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
          /* @__PURE__ */ createTextVNode("\n      "),
          /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "set"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
          /* @__PURE__ */ createTextVNode("value"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
          /* @__PURE__ */ createTextVNode(),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
          /* @__PURE__ */ createTextVNode("\n        "),
          /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "this"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
          /* @__PURE__ */ createTextVNode("$store"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
          /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "commit"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
          /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'SET_STATE_VALUE'"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
          /* @__PURE__ */ createTextVNode(" value"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
          /* @__PURE__ */ createTextVNode("\n      "),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
          /* @__PURE__ */ createTextVNode("\n    "),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
          /* @__PURE__ */ createTextVNode("\n  "),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
          /* @__PURE__ */ createTextVNode("\n"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
          /* @__PURE__ */ createTextVNode("\n")
        ])
      ]),
      /* @__PURE__ */ createBaseVNode("span", { class: "token tag" }, [
        /* @__PURE__ */ createBaseVNode("span", { class: "token tag" }, [
          /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "</"),
          /* @__PURE__ */ createTextVNode("script")
        ]),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ">")
      ]),
      /* @__PURE__ */ createTextVNode("\n")
    ])
  ])
], -1);
const _hoisted_34 = /* @__PURE__ */ createBaseVNode("p", null, "\u5982\u679C\u6709\u5F88\u591A\u4E2A computed\uFF0C\u53EF\u4EE5\u5199\u6210\u8FD9\u6837", -1);
const _hoisted_35 = /* @__PURE__ */ createBaseVNode("div", { class: "language-javascript ext-js" }, [
  /* @__PURE__ */ createBaseVNode("pre", { class: "language-javascript" }, [
    /* @__PURE__ */ createBaseVNode("code", null, [
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "function"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "mapModel"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token parameter" }, "names"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "return"),
      /* @__PURE__ */ createTextVNode(" names"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "reduce"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token parameter" }, [
        /* @__PURE__ */ createTextVNode("computed"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
        /* @__PURE__ */ createTextVNode(" name")
      ]),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "=>"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n    "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "return"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n      "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "..."),
      /* @__PURE__ */ createTextVNode("computed"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\n      "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "["),
      /* @__PURE__ */ createTextVNode("name"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "]"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n        "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "get"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n          "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "return"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "this"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("$store"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("values"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "["),
      /* @__PURE__ */ createTextVNode("name"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "]"),
      /* @__PURE__ */ createTextVNode("\n        "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\n        "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "set"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createTextVNode("value"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n          "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "this"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("$store"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "commit"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'setValues'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode(" name"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode(" value "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode("\n        "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createTextVNode("\n      "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createTextVNode("\n    "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createTextVNode("\n\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token comment" }, "// ..."),
      /* @__PURE__ */ createTextVNode("\ncomputed"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "..."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "mapModel"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "["),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'message'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'age'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'username'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "]"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createTextVNode("\n")
    ])
  ])
], -1);
const _hoisted_36 = /* @__PURE__ */ createBaseVNode("p", null, "\u4F9D\u7136\u6BD4\u8F83\u7E41\u7410\u3002\u5176\u5B9E\u5728 github vuex \u7684 Issues \u4E2D\u6709\u597D\u51E0\u4E2A\u7C7B\u4F3C\u7684\u95EE\u9898\uFF0C\u4F46\u89E3\u51B3\u65B9\u6848\u4F9D\u7136\u662F\u8FD9\u4E2A\u3002\u6700\u7B80\u5355\u7684\u529E\u6CD5\u5C31\u662F\u5C06 vuex \u8BBE\u7F6E\u6210\u975E\u4E25\u683C\u6A21\u5F0F\uFF0C\u76F4\u63A5\u4FEE\u6539 store \u7684\u503C\uFF0C\u5982\u679C\u8FD9\u6837\u4F7F\u7528\uFF0C\u53EF\u80FD\u4E0D\u7B26\u5408 vuex \u7684\u4E00\u4E9B\u8BBE\u8BA1\u539F\u5219\u3002", -1);
const _hoisted_37 = /* @__PURE__ */ createBaseVNode("h2", {
  id: "vuex-\u6709\u5173\u7684\u95EE\u9898",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#vuex-\u6709\u5173\u7684\u95EE\u9898",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" vuex \u6709\u5173\u7684\u95EE\u9898")
], -1);
const _hoisted_38 = {
  id: "_1-vuex-\u4E2D\u4E3A\u4EC0\u4E48\u628A\u628A\u5F02\u6B65\u64CD\u4F5C\u5C01\u88C5\u5728-action-\u628A\u540C\u6B65\u64CD\u4F5C\u653E\u5728-mutations",
  tabindex: "-1"
};
const _hoisted_39 = /* @__PURE__ */ createBaseVNode("a", {
  class: "header-anchor",
  href: "#_1-vuex-\u4E2D\u4E3A\u4EC0\u4E48\u628A\u628A\u5F02\u6B65\u64CD\u4F5C\u5C01\u88C5\u5728-action-\u628A\u540C\u6B65\u64CD\u4F5C\u653E\u5728-mutations",
  "aria-hidden": "true"
}, "#", -1);
const _hoisted_40 = /* @__PURE__ */ createTextVNode(" 1. ");
const _hoisted_41 = {
  href: "https://www.zhihu.com/question/48759748?utm_source=wechat_session&utm_medium=social&utm_oi=689440301193916416&utm_content=group3_supplementQuestions&utm_campaign=shareopn",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_42 = /* @__PURE__ */ createTextVNode("vuex \u4E2D\u4E3A\u4EC0\u4E48\u628A\u628A\u5F02\u6B65\u64CD\u4F5C\u5C01\u88C5\u5728 action\uFF0C\u628A\u540C\u6B65\u64CD\u4F5C\u653E\u5728 mutations\uFF1F");
const _hoisted_43 = /* @__PURE__ */ createBaseVNode("blockquote", null, [
  /* @__PURE__ */ createBaseVNode("p", null, "\u533A\u5206 actions \u548C mutations \u5E76\u4E0D\u662F\u4E3A\u4E86\u89E3\u51B3\u7ADE\u6001\u95EE\u9898\uFF0C\u800C\u662F\u4E3A\u4E86\u80FD\u7528 devtools \u8FFD\u8E2A\u72B6\u6001\u53D8\u5316\u3002\u4E8B\u5B9E\u4E0A\u5728 vuex \u91CC\u9762 actions \u53EA\u662F\u4E00\u4E2A\u67B6\u6784\u6027\u7684\u6982\u5FF5\uFF0C\u5E76\u4E0D\u662F\u5FC5\u987B\u7684\uFF0C\u8BF4\u5230\u5E95\u53EA\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u4F60\u5728\u91CC\u9762\u60F3\u5E72\u561B\u90FD\u53EF\u4EE5\uFF0C\u53EA\u8981\u6700\u540E\u89E6\u53D1 mutation \u5C31\u884C\u3002\u5F02\u6B65\u7ADE\u6001\u600E\u4E48\u5904\u7406\u90A3\u662F\u7528\u6237\u81EA\u5DF1\u7684\u4E8B\u60C5\u3002vuex \u771F\u6B63\u9650\u5236\u4F60\u7684\u53EA\u6709 mutation \u5FC5\u987B\u662F\u540C\u6B65\u7684\u8FD9\u4E00\u70B9\uFF08\u5728 redux \u91CC\u9762\u5C31\u597D\u50CF reducer \u5FC5\u987B\u540C\u6B65\u8FD4\u56DE\u4E0B\u4E00\u4E2A\u72B6\u6001\u4E00\u6837\uFF09\u3002\u540C\u6B65\u7684\u610F\u4E49\u5728\u4E8E\u8FD9\u6837\u6BCF\u4E00\u4E2A mutation \u6267\u884C\u5B8C\u6210\u540E\u90FD\u53EF\u4EE5\u5BF9\u5E94\u5230\u4E00\u4E2A\u65B0\u7684\u72B6\u6001\uFF08\u548C reducer \u4E00\u6837\uFF09\uFF0C\u8FD9\u6837 devtools \u5C31\u53EF\u4EE5\u6253\u4E2A snapshot \u5B58\u4E0B\u6765\uFF0C\u7136\u540E\u5C31\u53EF\u4EE5\u968F\u4FBF time-travel \u4E86\u3002\u5982\u679C\u4F60\u5F00\u7740 devtool \u8C03\u7528\u4E00\u4E2A\u5F02\u6B65\u7684 action\uFF0C\u4F60\u53EF\u4EE5\u6E05\u695A\u5730\u770B\u5230\u5B83\u6240\u8C03\u7528\u7684 mutation \u662F\u4F55\u65F6\u88AB\u8BB0\u5F55\u4E0B\u6765\u7684\uFF0C\u5E76\u4E14\u53EF\u4EE5\u7ACB\u523B\u67E5\u770B\u5B83\u4EEC\u5BF9\u5E94\u7684\u72B6\u6001\u3002\u5176\u5B9E\u6211\u6709\u4E2A\u70B9\u5B50\u4E00\u76F4\u6CA1\u65F6\u95F4\u505A\uFF0C\u90A3\u5C31\u662F\u628A\u8BB0\u5F55\u4E0B\u6765\u7684 mutations \u505A\u6210\u7C7B\u4F3C rx-marble \u90A3\u6837\u7684\u65F6\u95F4\u7EBF\u56FE\uFF0C\u5BF9\u4E8E\u7406\u89E3\u5E94\u7528\u7684\u5F02\u6B65\u72B6\u6001\u53D8\u5316\u5F88\u6709\u5E2E\u52A9\u3002"),
  /* @__PURE__ */ createBaseVNode("p", null, "\u4F5C\u8005\uFF1A\u5C24\u96E8\u6EAA \u94FE\u63A5\uFF1Ahttps://www.zhihu.com/question/48759748/answer/112823337")
], -1);
const _hoisted_44 = /* @__PURE__ */ createBaseVNode("h3", {
  id: "_2-state-\u5185\u90E8\u652F\u6301\u6A21\u5757\u914D\u7F6E\u548C\u6A21\u5757\u5D4C\u5957-\u5982\u4F55\u5B9E\u73B0\u7684",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#_2-state-\u5185\u90E8\u652F\u6301\u6A21\u5757\u914D\u7F6E\u548C\u6A21\u5757\u5D4C\u5957-\u5982\u4F55\u5B9E\u73B0\u7684",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" 2. state \u5185\u90E8\u652F\u6301\u6A21\u5757\u914D\u7F6E\u548C\u6A21\u5757\u5D4C\u5957\uFF0C\u5982\u4F55\u5B9E\u73B0\u7684\uFF1F")
], -1);
const _hoisted_45 = /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createTextVNode("\u5728 store \u6784\u9020\u65B9\u6CD5\u4E2D\u6709 makeLocalContext \u65B9\u6CD5\uFF0C\u6240\u6709 module \u90FD\u4F1A\u6709\u4E00\u4E2A local context\uFF0C\u6839\u636E\u914D\u7F6E\u65F6\u7684 path \u8FDB\u884C\u5339\u914D\u3002\u6240\u4EE5\u6267\u884C\u5982 "),
  /* @__PURE__ */ createBaseVNode("code", null, "dispatch('submitOrder', payload)"),
  /* @__PURE__ */ createTextVNode(" \u8FD9\u7C7B action \u65F6\uFF0C\u9ED8\u8BA4\u7684\u62FF\u5230\u90FD\u662F module \u7684 local state\uFF0C\u5982\u679C\u8981\u8BBF\u95EE\u6700\u5916\u5C42\u6216\u8005\u662F\u5176\u4ED6 module \u7684 state\uFF0C\u53EA\u80FD\u4ECE rootState \u6309\u7167 path \u8DEF\u5F84\u9010\u6B65\u8FDB\u884C\u8BBF\u95EE\u3002")
], -1);
const _hoisted_46 = /* @__PURE__ */ createBaseVNode("blockquote", null, [
  /* @__PURE__ */ createBaseVNode("p", null, "https://tech.meituan.com/2017/04/27/vuex-code-analysis.html")
], -1);
const _hoisted_47 = /* @__PURE__ */ createBaseVNode("h2", {
  id: "defineproperty-\u4F55\u65F6\u6267\u884C",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#defineproperty-\u4F55\u65F6\u6267\u884C",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" defineProperty \u4F55\u65F6\u6267\u884C")
], -1);
const _hoisted_48 = /* @__PURE__ */ createBaseVNode("div", { class: "language-javascript ext-js" }, [
  /* @__PURE__ */ createBaseVNode("pre", { class: "language-javascript" }, [
    /* @__PURE__ */ createBaseVNode("code", null, [
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "function"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "Archiver"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "var"),
      /* @__PURE__ */ createTextVNode(" temperature "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "null"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "var"),
      /* @__PURE__ */ createTextVNode(" archive "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "["),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "]"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n\n  Object"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "defineProperty"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "this"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'temperature'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n    "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function-variable function" }, "get"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "function"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n      console"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "log"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'get1'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n      "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "return"),
      /* @__PURE__ */ createTextVNode(" temperature"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n    "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\n    "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function-variable function" }, "set"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "function"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token parameter" }, "value"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n      temperature "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(" value"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n      console"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "log"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'set1'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n      archive"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "push"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode(" val"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
      /* @__PURE__ */ createTextVNode(" temperature "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n    "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ","),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "this"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function-variable function" }, "getArchive"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "function"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
      /* @__PURE__ */ createTextVNode("\n    "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "return"),
      /* @__PURE__ */ createTextVNode(" archive"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n  "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
      /* @__PURE__ */ createTextVNode("\n\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "var"),
      /* @__PURE__ */ createTextVNode(" arc "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "new"),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token class-name" }, "Archiver"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\narc"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("temperature"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\nconsole"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "log"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'get2'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\narc"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("temperature "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token number" }, "11"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\nconsole"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "log"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'set2'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\narc"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createTextVNode("temperature "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token number" }, "13"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\nconsole"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "."),
      /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "log"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'set3'"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ";"),
      /* @__PURE__ */ createTextVNode("\n\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token comment" }, "// get1"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token comment" }, "// get2"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token comment" }, "// set1"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token comment" }, "// set2"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token comment" }, "// set1"),
      /* @__PURE__ */ createTextVNode("\n"),
      /* @__PURE__ */ createBaseVNode("span", { class: "token comment" }, "// set3"),
      /* @__PURE__ */ createTextVNode("\n")
    ])
  ])
], -1);
const _hoisted_49 = /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createTextVNode("vuex \u4F7F\u7528 "),
  /* @__PURE__ */ createBaseVNode("code", null, "this._committing"),
  /* @__PURE__ */ createTextVNode(" \u6765\u5224\u65AD\u662F\u5426\u662F\u7531 "),
  /* @__PURE__ */ createBaseVNode("code", null, "_withCommit"),
  /* @__PURE__ */ createTextVNode(" \u89E6\u53D1\u7684")
], -1);
function _sfc_render(_ctx, _cache) {
  const _component_RouterLink = resolveComponent("RouterLink");
  const _component_OutboundLink = resolveComponent("OutboundLink");
  return openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1,
    _hoisted_2,
    createBaseVNode("nav", _hoisted_3, [
      createBaseVNode("ul", null, [
        createBaseVNode("li", null, [
          createVNode(_component_RouterLink, { to: "#vuex-\u5173\u7CFB\u56FE" }, {
            default: withCtx(() => [
              _hoisted_4
            ]),
            _: 1
          })
        ]),
        createBaseVNode("li", null, [
          createVNode(_component_RouterLink, { to: "#\u793A\u4F8B" }, {
            default: withCtx(() => [
              _hoisted_5
            ]),
            _: 1
          })
        ]),
        createBaseVNode("li", null, [
          createVNode(_component_RouterLink, { to: "#form-\u8868\u5355\u95EE\u9898" }, {
            default: withCtx(() => [
              _hoisted_6
            ]),
            _: 1
          }),
          createBaseVNode("ul", null, [
            createBaseVNode("li", null, [
              createVNode(_component_RouterLink, { to: "#\u5B98\u65B9\u89E3\u51B3" }, {
                default: withCtx(() => [
                  _hoisted_7
                ]),
                _: 1
              })
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_RouterLink, { to: "#\u8BA1\u7B97\u5C5E\u6027-set\u3001get-\u65B9\u5F0F" }, {
                default: withCtx(() => [
                  _hoisted_8
                ]),
                _: 1
              })
            ])
          ])
        ]),
        createBaseVNode("li", null, [
          createVNode(_component_RouterLink, { to: "#vuex-\u6709\u5173\u7684\u95EE\u9898" }, {
            default: withCtx(() => [
              _hoisted_9
            ]),
            _: 1
          }),
          createBaseVNode("ul", null, [
            createBaseVNode("li", null, [
              createVNode(_component_RouterLink, { to: "#_1-vuex-\u4E2D\u4E3A\u4EC0\u4E48\u628A\u628A\u5F02\u6B65\u64CD\u4F5C\u5C01\u88C5\u5728-action-\u628A\u540C\u6B65\u64CD\u4F5C\u653E\u5728-mutations" }, {
                default: withCtx(() => [
                  _hoisted_10
                ]),
                _: 1
              })
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_RouterLink, { to: "#_2-state-\u5185\u90E8\u652F\u6301\u6A21\u5757\u914D\u7F6E\u548C\u6A21\u5757\u5D4C\u5957-\u5982\u4F55\u5B9E\u73B0\u7684" }, {
                default: withCtx(() => [
                  _hoisted_11
                ]),
                _: 1
              })
            ])
          ])
        ]),
        createBaseVNode("li", null, [
          createVNode(_component_RouterLink, { to: "#defineproperty-\u4F55\u65F6\u6267\u884C" }, {
            default: withCtx(() => [
              _hoisted_12
            ]),
            _: 1
          })
        ])
      ])
    ]),
    _hoisted_13,
    _hoisted_14,
    _hoisted_15,
    _hoisted_16,
    _hoisted_17,
    _hoisted_18,
    _hoisted_19,
    _hoisted_20,
    _hoisted_21,
    _hoisted_22,
    _hoisted_23,
    _hoisted_24,
    _hoisted_25,
    _hoisted_26,
    _hoisted_27,
    _hoisted_28,
    _hoisted_29,
    _hoisted_30,
    _hoisted_31,
    _hoisted_32,
    _hoisted_33,
    _hoisted_34,
    _hoisted_35,
    _hoisted_36,
    _hoisted_37,
    createBaseVNode("h3", _hoisted_38, [
      _hoisted_39,
      _hoisted_40,
      createBaseVNode("a", _hoisted_41, [
        _hoisted_42,
        createVNode(_component_OutboundLink)
      ])
    ]),
    _hoisted_43,
    _hoisted_44,
    _hoisted_45,
    _hoisted_46,
    _hoisted_47,
    _hoisted_48,
    _hoisted_49
  ], 64);
}
_sfc_main.render = _sfc_render;
export { _sfc_main as default };
