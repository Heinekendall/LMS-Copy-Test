import { render, screen } from "@testing-library/react";

import { setMediaQueryMatches } from "../../../utilities/testUtils.tsx";
import {
  createAboutModalData,
  createAboutModalSnapshot,
} from "../AboutModal.testUtils.ts";
import AboutModalContent from "./AboutModalContent.tsx";

function renderAboutModalContent(isResponsive = false) {
  setMediaQueryMatches(isResponsive);

  render(
    <AboutModalContent
      snapshot={createAboutModalSnapshot()}
      aboutData={createAboutModalData()}
      ssoToken="sso-token"
    />,
  );
}

describe("AboutModalContent component", () => {
  it("renders desktop content with tabs and footer links", () => {
    renderAboutModalContent(false);

    expect(screen.getByText("Chemistry 101")).toBeVisible();
    expect(screen.getByText("Section A")).toBeVisible();
    expect(screen.getByText("Chemical Principles, 1st Edition")).toBeVisible();
    expect(screen.getByText("Jane Author, and John Writer")).toBeVisible();
    expect(screen.getByRole("tab", { name: "Book Cover" })).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "Book Cover" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About Cengage" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Feedback" })).toBeVisible();
  });

  it("renders responsive content with accordion instead of tabs", () => {
    renderAboutModalContent(true);

    expect(screen.getByText("Chemistry 101")).toBeVisible();
    expect(screen.getByRole("button", { name: "Book Cover" })).toBeVisible();
    expect(
      screen.queryByRole("tab", { name: "Book Cover" }),
    ).not.toBeInTheDocument();
  });
});
