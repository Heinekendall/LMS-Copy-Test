import "./virtual_mf-REMOTE_ENTRY_ID___mfe_internal__AssessmentUI__remoteEntry_js-47HJ8Vzv.js";

import { t as e } from "./preload-helper-zJ_50EbN.js";

var t = {
    react: async () =>
      await e(
        () =>
          import(
            `./_virtual_mf___mfe_internal__AssessmentUI__loadShare__react__loadShare__.mjs-R5oSoQPu.js`
          ).then((e) => (e.o(), e.a)),
        [],
      ),
    "react-dom": async () =>
      await e(
        () =>
          import(
            `./_virtual_mf___mfe_internal__AssessmentUI__loadShare__react_mf_2_dom__loadShare__.mjs-CM_uVg1-.js`
          ).then((e) => e.r),
        [],
      ),
    "react/jsx-runtime": async () =>
      await e(
        () =>
          import(
            `./_virtual_mf___mfe_internal__AssessmentUI__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.mjs-B-JRz9o9.js`
          ).then((e) => e.i),
        [],
      ),
  },
  n = {
    react: {
      name: `react`,
      version: `17.0.2`,
      scope: [`default`],
      loaded: !1,
      from: `__mfe_internal__AssessmentUI`,
      async get() {
        n.react.loaded = !0;
        let { react: e } = t,
          r = { ...(await e()) };
        return (
          Object.defineProperty(r, "__esModule", { value: !0, enumerable: !1 }),
          function () {
            return r;
          }
        );
      },
      shareConfig: { singleton: !0, requiredVersion: `^17.0.2` },
    },
    "react-dom": {
      name: `react-dom`,
      version: `17.0.2`,
      scope: [`default`],
      loaded: !1,
      from: `__mfe_internal__AssessmentUI`,
      async get() {
        n[`react-dom`].loaded = !0;
        let { "react-dom": e } = t,
          r = { ...(await e()) };
        return (
          Object.defineProperty(r, "__esModule", { value: !0, enumerable: !1 }),
          function () {
            return r;
          }
        );
      },
      shareConfig: { singleton: !0, requiredVersion: `^17.0.2` },
    },
    "react/jsx-runtime": {
      name: `react/jsx-runtime`,
      version: `17.0.2`,
      scope: [`default`],
      loaded: !1,
      from: `__mfe_internal__AssessmentUI`,
      async get() {
        n[`react/jsx-runtime`].loaded = !0;
        let { "react/jsx-runtime": e } = t,
          r = { ...(await e()) };
        return (
          Object.defineProperty(r, "__esModule", { value: !0, enumerable: !1 }),
          function () {
            return r;
          }
        );
      },
      shareConfig: { singleton: !0, requiredVersion: `^17.0.2` },
    },
  },
  r = [];
export { r as usedRemotes, n as usedShared };
