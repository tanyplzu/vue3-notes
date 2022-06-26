var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { f as defineComponent, i as useRoute, j as toRefs, k as computed, l as isLinkHttp, m as isLinkMailto, n as isLinkTel, r as resolveComponent, h as unref, o as openBlock, p as createBlock, w as withCtx, q as renderSlot, d as createTextVNode, t as toDisplayString, s as mergeProps, c as createElementBlock, v as createCommentVNode, x as useSiteData, y as usePageFrontmatter, z as useSiteLocaleData, A as withBase, B as isArray, a as createBaseVNode, F as Fragment, C as renderList, D as normalizeClass, b as createVNode, E as removeLeadingSlash, G as removeEndingSlash, T as Transition, H as ref, I as watch, J as withDirectives, K as vShow, L as useRouter, u as useRouteLocale, g as useThemeLocaleData, M as isString, N as useNavLink, O as useDarkMode, e as createStaticVNode, P as onMounted, Q as normalizeStyle, R as usePageData, S as useSidebarItems, U as isPlainObject, V as h, W as onUnmounted, X as useScrollPromise } from "./app.11f00557.js";
const _hoisted_1$a = ["href", "rel", "target", "aria-label"];
const __default__ = defineComponent({
  inheritAttrs: false
});
function setup(__props) {
  const props = __props;
  const route = useRoute();
  const site = useSiteData();
  const { item } = toRefs(props);
  const hasHttpProtocol = computed(() => isLinkHttp(item.value.link));
  const hasNonHttpProtocal = computed(() => isLinkMailto(item.value.link) || isLinkTel(item.value.link));
  const linkTarget = computed(() => {
    if (hasNonHttpProtocal.value)
      return void 0;
    if (item.value.target)
      return item.value.target;
    if (hasHttpProtocol.value)
      return "_blank";
    return void 0;
  });
  const isBlankTarget = computed(() => linkTarget.value === "_blank");
  const isRouterLink = computed(() => !hasHttpProtocol.value && !hasNonHttpProtocal.value && !isBlankTarget.value);
  const linkRel = computed(() => {
    if (hasNonHttpProtocal.value)
      return void 0;
    if (item.value.rel)
      return item.value.rel;
    if (isBlankTarget.value)
      return "noopener noreferrer";
    return void 0;
  });
  const linkAriaLabel = computed(() => item.value.ariaLabel || item.value.text);
  const shouldBeActiveInSubpath = computed(() => {
    const localeKeys = Object.keys(site.value.locales);
    if (localeKeys.length) {
      return !localeKeys.some((key) => key === item.value.link);
    }
    return item.value.link !== "/";
  });
  const isActiveInSubpath = computed(() => {
    if (!shouldBeActiveInSubpath.value) {
      return false;
    }
    return route.path.startsWith(item.value.link);
  });
  const isActive = computed(() => {
    if (!isRouterLink.value) {
      return false;
    }
    if (item.value.activeMatch) {
      return new RegExp(item.value.activeMatch).test(route.path);
    }
    return isActiveInSubpath.value;
  });
  return (_ctx, _cache) => {
    const _component_RouterLink = resolveComponent("RouterLink");
    const _component_OutboundLink = resolveComponent("OutboundLink");
    return unref(isRouterLink) ? (openBlock(), createBlock(_component_RouterLink, mergeProps({
      key: 0,
      class: ["nav-link", { "router-link-active": unref(isActive) }],
      to: unref(item).link,
      "aria-label": unref(linkAriaLabel)
    }, _ctx.$attrs), {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "before"),
        createTextVNode(" " + toDisplayString(unref(item).text) + " ", 1),
        renderSlot(_ctx.$slots, "after")
      ]),
      _: 3
    }, 16, ["class", "to", "aria-label"])) : (openBlock(), createElementBlock("a", mergeProps({
      key: 1,
      class: "nav-link external",
      href: unref(item).link,
      rel: unref(linkRel),
      target: unref(linkTarget),
      "aria-label": unref(linkAriaLabel)
    }, _ctx.$attrs), [
      renderSlot(_ctx.$slots, "before"),
      createTextVNode(" " + toDisplayString(unref(item).text) + " ", 1),
      unref(isBlankTarget) ? (openBlock(), createBlock(_component_OutboundLink, { key: 0 })) : createCommentVNode("", true),
      renderSlot(_ctx.$slots, "after")
    ], 16, _hoisted_1$a));
  };
}
var _sfc_main$c = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__), {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup
}));
const _hoisted_1$9 = ["aria-labelledby"];
const _hoisted_2$7 = { class: "hero" };
const _hoisted_3$5 = ["src", "alt"];
const _hoisted_4$3 = {
  key: 1,
  id: "main-title"
};
const _hoisted_5$3 = {
  key: 2,
  class: "description"
};
const _hoisted_6$3 = {
  key: 3,
  class: "actions"
};
const _hoisted_7$2 = {
  key: 0,
  class: "features"
};
const _hoisted_8$2 = { class: "theme-default-content custom" };
const _hoisted_9$2 = ["innerHTML"];
const _hoisted_10$1 = ["textContent"];
var _sfc_main$b = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const frontmatter = usePageFrontmatter();
    const siteLocale = useSiteLocaleData();
    const heroImage = computed(() => {
      if (!frontmatter.value.heroImage) {
        return null;
      }
      return withBase(frontmatter.value.heroImage);
    });
    const heroText = computed(() => {
      if (frontmatter.value.heroText === null) {
        return null;
      }
      return frontmatter.value.heroText || siteLocale.value.title || "Hello";
    });
    const heroAlt = computed(() => frontmatter.value.heroAlt || heroText.value || "hero");
    const tagline = computed(() => {
      if (frontmatter.value.tagline === null) {
        return null;
      }
      return frontmatter.value.tagline || siteLocale.value.description || "Welcome to your VuePress site";
    });
    const actions = computed(() => {
      if (!isArray(frontmatter.value.actions)) {
        return [];
      }
      return frontmatter.value.actions.map(({ text, link, type = "primary" }) => ({
        text,
        link,
        type
      }));
    });
    const features = computed(() => {
      if (isArray(frontmatter.value.features)) {
        return frontmatter.value.features;
      }
      return [];
    });
    const footer = computed(() => frontmatter.value.footer);
    const footerHtml = computed(() => frontmatter.value.footerHtml);
    return (_ctx, _cache) => {
      const _component_Content = resolveComponent("Content");
      return openBlock(), createElementBlock("main", {
        class: "home",
        "aria-labelledby": unref(heroText) ? "main-title" : void 0
      }, [
        createBaseVNode("header", _hoisted_2$7, [
          unref(heroImage) ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: unref(heroImage),
            alt: unref(heroAlt)
          }, null, 8, _hoisted_3$5)) : createCommentVNode("", true),
          unref(heroText) ? (openBlock(), createElementBlock("h1", _hoisted_4$3, toDisplayString(unref(heroText)), 1)) : createCommentVNode("", true),
          unref(tagline) ? (openBlock(), createElementBlock("p", _hoisted_5$3, toDisplayString(unref(tagline)), 1)) : createCommentVNode("", true),
          unref(actions).length ? (openBlock(), createElementBlock("p", _hoisted_6$3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(actions), (action) => {
              return openBlock(), createBlock(_sfc_main$c, {
                key: action.text,
                class: normalizeClass(["action-button", [action.type]]),
                item: action
              }, null, 8, ["class", "item"]);
            }), 128))
          ])) : createCommentVNode("", true)
        ]),
        unref(features).length ? (openBlock(), createElementBlock("div", _hoisted_7$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(features), (feature) => {
            return openBlock(), createElementBlock("div", {
              key: feature.title,
              class: "feature"
            }, [
              createBaseVNode("h2", null, toDisplayString(feature.title), 1),
              createBaseVNode("p", null, toDisplayString(feature.details), 1)
            ]);
          }), 128))
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_8$2, [
          createVNode(_component_Content)
        ]),
        unref(footer) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          unref(footerHtml) ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "footer",
            innerHTML: unref(footer)
          }, null, 8, _hoisted_9$2)) : (openBlock(), createElementBlock("div", {
            key: 1,
            class: "footer",
            textContent: toDisplayString(unref(footer))
          }, null, 8, _hoisted_10$1))
        ], 64)) : createCommentVNode("", true)
      ], 8, _hoisted_1$9);
    };
  }
});
const resolveRepoType = (repo) => {
  if (!isLinkHttp(repo) || /github\.com/.test(repo))
    return "GitHub";
  if (/bitbucket\.org/.test(repo))
    return "Bitbucket";
  if (/gitlab\.com/.test(repo))
    return "GitLab";
  if (/gitee\.com/.test(repo))
    return "Gitee";
  return null;
};
const editLinkPatterns = {
  GitHub: ":repo/edit/:branch/:path",
  GitLab: ":repo/-/edit/:branch/:path",
  Gitee: ":repo/edit/:branch/:path",
  Bitbucket: ":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"
};
const resolveEditLink = ({ docsRepo, docsBranch, docsDir, filePathRelative, editLinkPattern }) => {
  const repoType = resolveRepoType(docsRepo);
  let pattern;
  if (editLinkPattern) {
    pattern = editLinkPattern;
  } else if (repoType !== null) {
    pattern = editLinkPatterns[repoType];
  }
  if (!pattern)
    return null;
  return pattern.replace(/:repo/, isLinkHttp(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`).replace(/:branch/, docsBranch).replace(/:path/, removeLeadingSlash(`${removeEndingSlash(docsDir)}/${filePathRelative}`));
};
var _sfc_main$a = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const setHeight = (items) => {
      items.style.height = items.scrollHeight + "px";
    };
    const unsetHeight = (items) => {
      items.style.height = "";
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: "dropdown",
        onEnter: setHeight,
        onAfterEnter: unsetHeight,
        onBeforeLeave: setHeight
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      });
    };
  }
});
const _hoisted_1$8 = ["aria-label"];
const _hoisted_2$6 = { class: "title" };
const _hoisted_3$4 = /* @__PURE__ */ createBaseVNode("span", { class: "arrow down" }, null, -1);
const _hoisted_4$2 = ["aria-label"];
const _hoisted_5$2 = { class: "title" };
const _hoisted_6$2 = { class: "nav-dropdown" };
const _hoisted_7$1 = { class: "dropdown-subtitle" };
const _hoisted_8$1 = { key: 1 };
const _hoisted_9$1 = { class: "dropdown-subitem-wrapper" };
var _sfc_main$9 = /* @__PURE__ */ defineComponent({
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const { item } = toRefs(props);
    const dropdownAriaLabel = computed(() => item.value.ariaLabel || item.value.text);
    const open = ref(false);
    const route = useRoute();
    watch(() => route.path, () => {
      open.value = false;
    });
    const handleDropdown = (e) => {
      const isTriggerByTab = e.detail === 0;
      if (isTriggerByTab) {
        open.value = !open.value;
      } else {
        open.value = false;
      }
    };
    const isLastItemOfArray = (item2, arr) => arr[arr.length - 1] === item2;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["dropdown-wrapper", { open: open.value }])
      }, [
        createBaseVNode("button", {
          class: "dropdown-title",
          type: "button",
          "aria-label": unref(dropdownAriaLabel),
          onClick: handleDropdown
        }, [
          createBaseVNode("span", _hoisted_2$6, toDisplayString(unref(item).text), 1),
          _hoisted_3$4
        ], 8, _hoisted_1$8),
        createBaseVNode("button", {
          class: "mobile-dropdown-title",
          type: "button",
          "aria-label": unref(dropdownAriaLabel),
          onClick: _cache[0] || (_cache[0] = ($event) => open.value = !open.value)
        }, [
          createBaseVNode("span", _hoisted_5$2, toDisplayString(unref(item).text), 1),
          createBaseVNode("span", {
            class: normalizeClass(["arrow", open.value ? "down" : "right"])
          }, null, 2)
        ], 8, _hoisted_4$2),
        createVNode(_sfc_main$a, null, {
          default: withCtx(() => [
            withDirectives(createBaseVNode("ul", _hoisted_6$2, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(item).children, (child, index) => {
                return openBlock(), createElementBlock("li", {
                  key: child.link || index,
                  class: "dropdown-item"
                }, [
                  child.children ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createBaseVNode("h4", _hoisted_7$1, [
                      child.link ? (openBlock(), createBlock(_sfc_main$c, {
                        key: 0,
                        item: child,
                        onFocusout: ($event) => isLastItemOfArray(child, unref(item).children) && child.children.length === 0 && (open.value = false)
                      }, null, 8, ["item", "onFocusout"])) : (openBlock(), createElementBlock("span", _hoisted_8$1, toDisplayString(child.text), 1))
                    ]),
                    createBaseVNode("ul", _hoisted_9$1, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(child.children, (grandchild) => {
                        return openBlock(), createElementBlock("li", {
                          key: grandchild.link,
                          class: "dropdown-subitem"
                        }, [
                          createVNode(_sfc_main$c, {
                            item: grandchild,
                            onFocusout: ($event) => isLastItemOfArray(grandchild, child.children) && isLastItemOfArray(child, unref(item).children) && (open.value = false)
                          }, null, 8, ["item", "onFocusout"])
                        ]);
                      }), 128))
                    ])
                  ], 64)) : (openBlock(), createBlock(_sfc_main$c, {
                    key: 1,
                    item: child,
                    onFocusout: ($event) => isLastItemOfArray(child, unref(item).children) && (open.value = false)
                  }, null, 8, ["item", "onFocusout"]))
                ]);
              }), 128))
            ], 512), [
              [vShow, open.value]
            ])
          ]),
          _: 1
        })
      ], 2);
    };
  }
});
const _hoisted_1$7 = {
  key: 0,
  class: "navbar-links"
};
var _sfc_main$8 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const useNavbarSelectLanguage = () => {
      const router = useRouter();
      const routeLocale = useRouteLocale();
      const siteLocale = useSiteLocaleData();
      const themeLocale = useThemeLocaleData();
      return computed(() => {
        var _a, _b;
        const localePaths = Object.keys(siteLocale.value.locales);
        if (localePaths.length < 2) {
          return [];
        }
        const currentPath = router.currentRoute.value.path;
        const currentFullPath = router.currentRoute.value.fullPath;
        const languageDropdown = {
          text: (_a = themeLocale.value.selectLanguageText) != null ? _a : "unkown language",
          ariaLabel: (_b = themeLocale.value.selectLanguageAriaLabel) != null ? _b : "unkown language",
          children: localePaths.map((targetLocalePath) => {
            var _a2, _b2, _c, _d, _e, _f;
            const targetSiteLocale = (_b2 = (_a2 = siteLocale.value.locales) == null ? void 0 : _a2[targetLocalePath]) != null ? _b2 : {};
            const targetThemeLocale = (_d = (_c = themeLocale.value.locales) == null ? void 0 : _c[targetLocalePath]) != null ? _d : {};
            const targetLang = `${targetSiteLocale.lang}`;
            const text = (_e = targetThemeLocale.selectLanguageName) != null ? _e : targetLang;
            let link;
            if (targetLang === siteLocale.value.lang) {
              link = currentFullPath;
            } else {
              const targetLocalePage = currentPath.replace(routeLocale.value, targetLocalePath);
              if (router.getRoutes().some((item) => item.path === targetLocalePage)) {
                link = targetLocalePage;
              } else {
                link = (_f = targetThemeLocale.home) != null ? _f : targetLocalePath;
              }
            }
            return {
              text,
              link
            };
          })
        };
        return [languageDropdown];
      });
    };
    const useNavbarRepo = () => {
      const themeLocale = useThemeLocaleData();
      const repo = computed(() => themeLocale.value.repo);
      const repoType = computed(() => repo.value ? resolveRepoType(repo.value) : null);
      const repoLink = computed(() => {
        if (repo.value && !isLinkHttp(repo.value)) {
          return `https://github.com/${repo.value}`;
        }
        return repo.value;
      });
      const repoLabel = computed(() => {
        if (!repoLink.value)
          return null;
        if (themeLocale.value.repoLabel)
          return themeLocale.value.repoLabel;
        if (repoType.value === null)
          return "Source";
        return repoType.value;
      });
      return computed(() => {
        if (!repoLink.value || !repoLabel.value) {
          return [];
        }
        return [
          {
            text: repoLabel.value,
            link: repoLink.value
          }
        ];
      });
    };
    const resolveNavbarItem = (item) => {
      if (isString(item)) {
        return useNavLink(item);
      }
      if (item.children) {
        return __spreadProps(__spreadValues({}, item), {
          children: item.children.map(resolveNavbarItem)
        });
      }
      return item;
    };
    const useNavbarConfig = () => {
      const themeLocale = useThemeLocaleData();
      return computed(() => (themeLocale.value.navbar || []).map(resolveNavbarItem));
    };
    const navbarConfig = useNavbarConfig();
    const navbarSelectLanguage = useNavbarSelectLanguage();
    const navbarRepo = useNavbarRepo();
    const navbarLinks = computed(() => [
      ...navbarConfig.value,
      ...navbarSelectLanguage.value,
      ...navbarRepo.value
    ]);
    return (_ctx, _cache) => {
      return unref(navbarLinks).length ? (openBlock(), createElementBlock("nav", _hoisted_1$7, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(navbarLinks), (item) => {
          return openBlock(), createElementBlock("div", {
            key: item.text,
            class: "navbar-links-item"
          }, [
            item.children ? (openBlock(), createBlock(_sfc_main$9, {
              key: 0,
              item
            }, null, 8, ["item"])) : (openBlock(), createBlock(_sfc_main$c, {
              key: 1,
              item
            }, null, 8, ["item"]))
          ]);
        }), 128))
      ])) : createCommentVNode("", true);
    };
  }
});
const _hoisted_1$6 = ["title"];
const _hoisted_2$5 = {
  class: "icon",
  focusable: "false",
  viewBox: "0 0 32 32"
};
const _hoisted_3$3 = /* @__PURE__ */ createStaticVNode('<path d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path><path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"></path><path d="M2 15.005h5v2H2z" fill="currentColor"></path><path d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 25.005h2v5h-2z" fill="currentColor"></path><path d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z" fill="currentColor"></path><path d="M25 15.005h5v2h-5z" fill="currentColor"></path><path d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 2.005h2v5h-2z" fill="currentColor"></path>', 9);
const _hoisted_12 = [
  _hoisted_3$3
];
const _hoisted_13 = {
  class: "icon",
  focusable: "false",
  viewBox: "0 0 32 32"
};
const _hoisted_14 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z",
  fill: "currentColor"
}, null, -1);
const _hoisted_15 = [
  _hoisted_14
];
var _sfc_main$7 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const themeLocale = useThemeLocaleData();
    const isDarkMode = useDarkMode();
    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        class: "toggle-dark-button",
        title: unref(themeLocale).toggleDarkMode,
        onClick: toggleDarkMode
      }, [
        withDirectives((openBlock(), createElementBlock("svg", _hoisted_2$5, _hoisted_12, 512)), [
          [vShow, !unref(isDarkMode)]
        ]),
        withDirectives((openBlock(), createElementBlock("svg", _hoisted_13, _hoisted_15, 512)), [
          [vShow, unref(isDarkMode)]
        ])
      ], 8, _hoisted_1$6);
    };
  }
});
const _hoisted_1$5 = ["title"];
const _hoisted_2$4 = /* @__PURE__ */ createBaseVNode("div", {
  class: "icon",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ createBaseVNode("span"),
  /* @__PURE__ */ createBaseVNode("span"),
  /* @__PURE__ */ createBaseVNode("span")
], -1);
const _hoisted_3$2 = [
  _hoisted_2$4
];
var _sfc_main$6 = /* @__PURE__ */ defineComponent({
  emits: ["toggle"],
  setup(__props) {
    const themeLocale = useThemeLocaleData();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "toggle-sidebar-button",
        title: unref(themeLocale).toggleSidebar,
        "aria-expanded": "false",
        role: "button",
        tabindex: "0",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("toggle"))
      }, _hoisted_3$2, 8, _hoisted_1$5);
    };
  }
});
const _hoisted_1$4 = ["src", "alt"];
var _sfc_main$5 = /* @__PURE__ */ defineComponent({
  emits: ["toggle-sidebar"],
  setup(__props) {
    const routeLocale = useRouteLocale();
    const siteLocale = useSiteLocaleData();
    const themeLocale = useThemeLocaleData();
    const isDarkMode = useDarkMode();
    const navbar = ref(null);
    const siteBrand = ref(null);
    const siteBrandLink = computed(() => themeLocale.value.home || routeLocale.value);
    const siteBrandLogo = computed(() => {
      if (isDarkMode.value && themeLocale.value.logoDark !== void 0) {
        return themeLocale.value.logoDark;
      }
      return themeLocale.value.logo;
    });
    const siteBrandTitle = computed(() => siteLocale.value.title);
    const linksWrapperMaxWidth = ref(0);
    const linksWrapperStyle = computed(() => {
      if (!linksWrapperMaxWidth.value) {
        return {};
      }
      return {
        maxWidth: linksWrapperMaxWidth.value + "px"
      };
    });
    const enableDarkMode = computed(() => themeLocale.value.darkMode);
    onMounted(() => {
      const MOBILE_DESKTOP_BREAKPOINT = 719;
      const navbarHorizontalPadding = getCssValue(navbar.value, "paddingLeft") + getCssValue(navbar.value, "paddingRight");
      const handleLinksWrapWidth = () => {
        var _a;
        if (window.innerWidth <= MOBILE_DESKTOP_BREAKPOINT) {
          linksWrapperMaxWidth.value = 0;
        } else {
          linksWrapperMaxWidth.value = navbar.value.offsetWidth - navbarHorizontalPadding - (((_a = siteBrand.value) == null ? void 0 : _a.offsetWidth) || 0);
        }
      };
      handleLinksWrapWidth();
      window.addEventListener("resize", handleLinksWrapWidth, false);
      window.addEventListener("orientationchange", handleLinksWrapWidth, false);
    });
    function getCssValue(el, property) {
      var _a, _b, _c;
      const val = (_c = (_b = (_a = el == null ? void 0 : el.ownerDocument) == null ? void 0 : _a.defaultView) == null ? void 0 : _b.getComputedStyle(el, null)) == null ? void 0 : _c[property];
      const num = Number.parseInt(val, 10);
      return Number.isNaN(num) ? 0 : num;
    }
    return (_ctx, _cache) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      const _component_NavbarSearch = resolveComponent("NavbarSearch");
      return openBlock(), createElementBlock("header", {
        ref: (_value, _refs) => {
          _refs["navbar"] = _value;
          navbar.value = _value;
        },
        class: "navbar"
      }, [
        createVNode(_sfc_main$6, {
          onToggle: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("toggle-sidebar"))
        }),
        createBaseVNode("span", {
          ref: (_value, _refs) => {
            _refs["siteBrand"] = _value;
            siteBrand.value = _value;
          }
        }, [
          createVNode(_component_RouterLink, { to: unref(siteBrandLink) }, {
            default: withCtx(() => [
              unref(siteBrandLogo) ? (openBlock(), createElementBlock("img", {
                key: 0,
                class: "logo",
                src: unref(withBase)(unref(siteBrandLogo)),
                alt: unref(siteBrandTitle)
              }, null, 8, _hoisted_1$4)) : createCommentVNode("", true),
              unref(siteBrandTitle) ? (openBlock(), createElementBlock("span", {
                key: 1,
                class: normalizeClass(["site-name", { "can-hide": unref(siteBrandLogo) }])
              }, toDisplayString(unref(siteBrandTitle)), 3)) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["to"])
        ], 512),
        createBaseVNode("div", {
          class: "navbar-links-wrapper",
          style: normalizeStyle(unref(linksWrapperStyle))
        }, [
          renderSlot(_ctx.$slots, "before"),
          createVNode(_sfc_main$8, { class: "can-hide" }),
          renderSlot(_ctx.$slots, "after"),
          unref(enableDarkMode) ? (openBlock(), createBlock(_sfc_main$7, { key: 0 })) : createCommentVNode("", true),
          createVNode(_component_NavbarSearch)
        ], 4)
      ], 512);
    };
  }
});
const _hoisted_1$3 = { class: "page-meta" };
const _hoisted_2$3 = {
  key: 0,
  class: "meta-item edit-link"
};
const _hoisted_3$1 = {
  key: 1,
  class: "meta-item last-updated"
};
const _hoisted_4$1 = { class: "meta-item-label" };
const _hoisted_5$1 = { class: "meta-item-info" };
const _hoisted_6$1 = {
  key: 2,
  class: "meta-item contributors"
};
const _hoisted_7 = { class: "meta-item-label" };
const _hoisted_8 = { class: "meta-item-info" };
const _hoisted_9 = ["title"];
const _hoisted_10 = /* @__PURE__ */ createTextVNode(", ");
var _sfc_main$4 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const useEditNavLink = () => {
      const themeLocale2 = useThemeLocaleData();
      const page = usePageData();
      const frontmatter = usePageFrontmatter();
      return computed(() => {
        var _a, _b;
        const showEditLink = (_b = (_a = frontmatter.value.editLink) != null ? _a : themeLocale2.value.editLink) != null ? _b : true;
        if (!showEditLink) {
          return null;
        }
        const {
          repo,
          docsRepo = repo,
          docsBranch = "main",
          docsDir = "",
          editLinkText
        } = themeLocale2.value;
        if (!docsRepo)
          return null;
        const editLink = resolveEditLink({
          docsRepo,
          docsBranch,
          docsDir,
          filePathRelative: page.value.filePathRelative,
          editLinkPattern: themeLocale2.value.editLinkPattern
        });
        if (!editLink)
          return null;
        return {
          text: editLinkText != null ? editLinkText : "Edit this page",
          link: editLink
        };
      });
    };
    const useLastUpdated = () => {
      const siteLocale = useSiteLocaleData();
      const themeLocale2 = useThemeLocaleData();
      const page = usePageData();
      const frontmatter = usePageFrontmatter();
      return computed(() => {
        var _a, _b, _c, _d;
        const showLastUpdated = (_b = (_a = frontmatter.value.lastUpdated) != null ? _a : themeLocale2.value.lastUpdated) != null ? _b : true;
        if (!showLastUpdated)
          return null;
        if (!((_c = page.value.git) == null ? void 0 : _c.updatedTime))
          return null;
        const updatedDate = new Date((_d = page.value.git) == null ? void 0 : _d.updatedTime);
        return updatedDate.toLocaleString(siteLocale.value.lang);
      });
    };
    const useContributors = () => {
      const themeLocale2 = useThemeLocaleData();
      const page = usePageData();
      const frontmatter = usePageFrontmatter();
      return computed(() => {
        var _a, _b, _c, _d;
        const showContributors = (_b = (_a = frontmatter.value.contributors) != null ? _a : themeLocale2.value.contributors) != null ? _b : true;
        if (!showContributors)
          return null;
        return (_d = (_c = page.value.git) == null ? void 0 : _c.contributors) != null ? _d : null;
      });
    };
    const themeLocale = useThemeLocaleData();
    const editNavLink = useEditNavLink();
    const lastUpdated = useLastUpdated();
    const contributors = useContributors();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("footer", _hoisted_1$3, [
        unref(editNavLink) ? (openBlock(), createElementBlock("div", _hoisted_2$3, [
          createVNode(_sfc_main$c, {
            class: "meta-item-label",
            item: unref(editNavLink)
          }, null, 8, ["item"])
        ])) : createCommentVNode("", true),
        unref(lastUpdated) ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
          createBaseVNode("span", _hoisted_4$1, toDisplayString(unref(themeLocale).lastUpdatedText) + ": ", 1),
          createBaseVNode("span", _hoisted_5$1, toDisplayString(unref(lastUpdated)), 1)
        ])) : createCommentVNode("", true),
        unref(contributors) && unref(contributors).length ? (openBlock(), createElementBlock("div", _hoisted_6$1, [
          createBaseVNode("span", _hoisted_7, toDisplayString(unref(themeLocale).contributorsText) + ": ", 1),
          createBaseVNode("span", _hoisted_8, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(contributors), (contributor, index) => {
              return openBlock(), createElementBlock(Fragment, { key: index }, [
                createBaseVNode("span", {
                  class: "contributor",
                  title: `email: ${contributor.email}`
                }, toDisplayString(contributor.name), 9, _hoisted_9),
                index !== unref(contributors).length - 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  _hoisted_10
                ], 64)) : createCommentVNode("", true)
              ], 64);
            }), 128))
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const _hoisted_1$2 = {
  key: 0,
  class: "page-nav"
};
const _hoisted_2$2 = { class: "inner" };
const _hoisted_3 = {
  key: 0,
  class: "prev"
};
const _hoisted_4 = /* @__PURE__ */ createTextVNode(" \u2190 ");
const _hoisted_5 = {
  key: 1,
  class: "next"
};
const _hoisted_6 = /* @__PURE__ */ createTextVNode(" \u2192 ");
var _sfc_main$3 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const resolveFromFrontmatterConfig = (conf) => {
      if (conf === false) {
        return null;
      }
      if (isString(conf)) {
        return useNavLink(conf);
      }
      if (isPlainObject(conf)) {
        return conf;
      }
      return false;
    };
    const resolveFromSidebarItems = (sidebarItems2, currentPath, offset) => {
      const index = sidebarItems2.findIndex((item) => item.link === currentPath);
      if (index !== -1) {
        const targetItem = sidebarItems2[index + offset];
        if (!(targetItem == null ? void 0 : targetItem.link)) {
          return null;
        }
        return targetItem;
      }
      for (const item of sidebarItems2) {
        if (item.children) {
          const childResult = resolveFromSidebarItems(item.children, currentPath, offset);
          if (childResult) {
            return childResult;
          }
        }
      }
      return null;
    };
    const frontmatter = usePageFrontmatter();
    const sidebarItems = useSidebarItems();
    const route = useRoute();
    const prevNavLink = computed(() => {
      const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev);
      if (prevConfig !== false) {
        return prevConfig;
      }
      return resolveFromSidebarItems(sidebarItems.value, route.path, -1);
    });
    const nextNavLink = computed(() => {
      const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next);
      if (nextConfig !== false) {
        return nextConfig;
      }
      return resolveFromSidebarItems(sidebarItems.value, route.path, 1);
    });
    return (_ctx, _cache) => {
      return unref(prevNavLink) || unref(nextNavLink) ? (openBlock(), createElementBlock("nav", _hoisted_1$2, [
        createBaseVNode("p", _hoisted_2$2, [
          unref(prevNavLink) ? (openBlock(), createElementBlock("span", _hoisted_3, [
            _hoisted_4,
            createVNode(_sfc_main$c, { item: unref(prevNavLink) }, null, 8, ["item"])
          ])) : createCommentVNode("", true),
          unref(nextNavLink) ? (openBlock(), createElementBlock("span", _hoisted_5, [
            createVNode(_sfc_main$c, { item: unref(nextNavLink) }, null, 8, ["item"]),
            _hoisted_6
          ])) : createCommentVNode("", true)
        ])
      ])) : createCommentVNode("", true);
    };
  }
});
const _hoisted_1$1 = { class: "page" };
const _hoisted_2$1 = { class: "theme-default-content" };
var _sfc_main$2 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Content = resolveComponent("Content");
      return openBlock(), createElementBlock("main", _hoisted_1$1, [
        renderSlot(_ctx.$slots, "top"),
        createBaseVNode("div", _hoisted_2$1, [
          createVNode(_component_Content)
        ]),
        createVNode(_sfc_main$4),
        createVNode(_sfc_main$3),
        renderSlot(_ctx.$slots, "bottom")
      ]);
    };
  }
});
const normalizePath = (path) => decodeURI(path).replace(/#.*$/, "").replace(/(index)?\.(md|html)$/, "");
const isActiveLink = (route, link) => {
  if (link === void 0) {
    return false;
  }
  if (route.hash === link) {
    return true;
  }
  const currentPath = normalizePath(route.path);
  const targetPath = normalizePath(link);
  return currentPath === targetPath;
};
const isActiveItem = (route, item) => {
  if (isActiveLink(route, item.link)) {
    return true;
  }
  if (item.children) {
    return item.children.some((child) => isActiveItem(route, child));
  }
  return false;
};
const renderItem = (item, props) => {
  if (item.link) {
    return h(_sfc_main$c, __spreadProps(__spreadValues({}, props), {
      item
    }));
  }
  return h("p", props, item.text);
};
const renderChildren = (item, depth) => {
  var _a;
  if (!((_a = item.children) === null || _a === void 0 ? void 0 : _a.length)) {
    return null;
  }
  return h("ul", {
    class: {
      "sidebar-sub-items": depth > 0
    }
  }, item.children.map((child) => h("li", h(SidebarChild, {
    item: child,
    depth: depth + 1
  }))));
};
const SidebarChild = ({ item, depth = 0 }) => {
  const route = useRoute();
  const active = isActiveItem(route, item);
  return [
    renderItem(item, {
      class: {
        "sidebar-heading": depth === 0,
        "sidebar-item": true,
        active
      }
    }),
    renderChildren(item, depth)
  ];
};
SidebarChild.displayName = "SidebarChild";
SidebarChild.props = {
  item: {
    type: Object,
    required: true
  },
  depth: {
    type: Number,
    required: false
  }
};
const _hoisted_1 = { class: "sidebar" };
const _hoisted_2 = { class: "sidebar-links" };
var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const sidebarItems = useSidebarItems();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("aside", _hoisted_1, [
        createVNode(_sfc_main$8),
        renderSlot(_ctx.$slots, "top"),
        createBaseVNode("ul", _hoisted_2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(sidebarItems), (item) => {
            return openBlock(), createBlock(unref(SidebarChild), {
              key: item.link || item.text,
              item
            }, null, 8, ["item"]);
          }), 128))
        ]),
        renderSlot(_ctx.$slots, "bottom")
      ]);
    };
  }
});
var _sfc_main = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const page = usePageData();
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const shouldShowNavbar = computed(() => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false);
    const sidebarItems = useSidebarItems();
    const isSidebarOpen = ref(false);
    const toggleSidebar = (to) => {
      isSidebarOpen.value = typeof to === "boolean" ? to : !isSidebarOpen.value;
    };
    const touchStart = { x: 0, y: 0 };
    const onTouchStart = (e) => {
      touchStart.x = e.changedTouches[0].clientX;
      touchStart.y = e.changedTouches[0].clientY;
    };
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - touchStart.x;
      const dy = e.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && touchStart.x <= 80) {
          toggleSidebar(true);
        } else {
          toggleSidebar(false);
        }
      }
    };
    const containerClass = computed(() => [
      {
        "no-navbar": !shouldShowNavbar.value,
        "no-sidebar": !sidebarItems.value.length,
        "sidebar-open": isSidebarOpen.value
      },
      frontmatter.value.pageClass
    ]);
    let unregisterRouterHook;
    onMounted(() => {
      const router = useRouter();
      unregisterRouterHook = router.afterEach(() => {
        toggleSidebar(false);
      });
    });
    onUnmounted(() => {
      unregisterRouterHook();
    });
    const scrollPromise = useScrollPromise();
    const onBeforeEnter = scrollPromise.resolve;
    const onBeforeLeave = scrollPromise.pending;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["theme-container", unref(containerClass)]),
        onTouchstart: onTouchStart,
        onTouchend: onTouchEnd
      }, [
        unref(shouldShowNavbar) ? (openBlock(), createBlock(_sfc_main$5, {
          key: 0,
          onToggleSidebar: toggleSidebar
        }, {
          before: withCtx(() => [
            renderSlot(_ctx.$slots, "navbar-before")
          ]),
          after: withCtx(() => [
            renderSlot(_ctx.$slots, "navbar-after")
          ]),
          _: 3
        })) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: "sidebar-mask",
          onClick: _cache[0] || (_cache[0] = ($event) => toggleSidebar(false))
        }),
        createVNode(_sfc_main$1, null, {
          top: withCtx(() => [
            renderSlot(_ctx.$slots, "sidebar-top")
          ]),
          bottom: withCtx(() => [
            renderSlot(_ctx.$slots, "sidebar-bottom")
          ]),
          _: 3
        }),
        renderSlot(_ctx.$slots, "page", {}, () => [
          unref(frontmatter).home ? (openBlock(), createBlock(_sfc_main$b, { key: 0 })) : (openBlock(), createBlock(Transition, {
            key: 1,
            name: "fade-slide-y",
            mode: "out-in",
            onBeforeEnter: unref(onBeforeEnter),
            onBeforeLeave: unref(onBeforeLeave)
          }, {
            default: withCtx(() => [
              createVNode(_sfc_main$2, {
                key: unref(page).path
              }, {
                top: withCtx(() => [
                  renderSlot(_ctx.$slots, "page-top")
                ]),
                bottom: withCtx(() => [
                  renderSlot(_ctx.$slots, "page-bottom")
                ]),
                _: 3
              })
            ]),
            _: 3
          }, 8, ["onBeforeEnter", "onBeforeLeave"]))
        ])
      ], 34);
    };
  }
});
export { _sfc_main as default };
