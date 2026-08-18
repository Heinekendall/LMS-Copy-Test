import { render } from "@testing-library/react";

import { getHelpers } from "../../utilities/testUtils.tsx";
import Gradebook from "./Gradebook.tsx";

describe("Gradebook tab", () => {
  it("should render GradebookFrame component", () => {
    const { wrapper } = getHelpers();
    render(<Gradebook />, { wrapper });
    expect(document.querySelector("iframe")).toBeVisible();
    expect(document.querySelector("iframe")).toHaveAttribute(
      "src",
      "/static/progress/client/CDNLoader.html#/init?appName=Cengage.Progress&snapshotId=204465",
    );
  });
});
