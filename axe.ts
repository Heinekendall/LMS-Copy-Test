import axe from "axe-core";
import debounce from "lodash/debounce.js";

let running: Promise<unknown> = Promise.resolve();
const onMutation = debounce(async () => {
  await running;
  running = axe.run().then((results) => {
    if (results.violations.length) {
      console.groupCollapsed(
        `%c⚠️ [Axe] Found ${results.violations.length} accessibility violations ⚠️`,
        "color:orangered;font-weight:bold;",
      );
      for (const violation of results.violations) {
        console.log(violation.description + "\n", violation);
      }
      console.groupEnd();
    }
  });
}, 200);
const observer = new MutationObserver(onMutation);
observer.observe(document.body, { childList: true, subtree: true });
