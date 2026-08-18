import { suppressConsoleWarnings } from "./utilities/consoleUtils.ts";

const shouldUseMockData =
  import.meta.env.MODE === "development" ||
  import.meta.env.VITE_USE_MOCK_DATA === "true";
const canStartRootScopedMockWorker =
  import.meta.env.BASE_URL === "/" || import.meta.env.BASE_URL === "./";

if (shouldUseMockData && canStartRootScopedMockWorker) {
  const { worker } = await import("../mocks/browser.ts");
  await worker.start({
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  });
} else if (shouldUseMockData) {
  console.warn(
    "Mock data is enabled, but the prototype was not built from the root path. Build with `vite build --base=/` so the mock service worker can intercept Learning Path API calls.",
  );
}

if (import.meta.env.MODE === "development") {
  await import("./axe.ts");
}

if (shouldUseMockData && !document.location.search) {
  // using MTPPZ97NZB5D course from QA
  document.location.search =
    "?snapshotId=204465&id=43891916&eISBN=9798214027715";
}

if (import.meta.env.MODE === "development") {
  // suppress Emotion.js warnings that are not relevant in the slightest
  // https://github.com/storybookjs/storybook/issues/18103
  suppressConsoleWarnings("The pseudo class");
}
