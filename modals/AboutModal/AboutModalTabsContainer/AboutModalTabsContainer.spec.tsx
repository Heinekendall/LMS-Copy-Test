import { fireEvent, render, screen } from "@testing-library/react";

import AboutModalTabsContainer from "./AboutModalTabsContainer.tsx";

const aboutContent = [
  {
    title: "About the Authors",
    body: "<p><strong>Author bio</strong><script>alert(1)</script></p>",
  },
  {
    title: "About MindTap",
    body: "<p>MindTap platform body.</p>",
    copyRight: "Copyright text",
  },
  {
    title: "Book Cover",
    body: <img src="/cover.jpg" alt="Book cover" />,
  },
];

describe("AboutModalTabsContainer component", () => {
  it("renders tabs with sanitized panels", () => {
    const { container } = render(
      <AboutModalTabsContainer
        aboutContent={aboutContent}
        numberOfTabs={aboutContent.length}
      />,
    );

    expect(
      screen.getByRole("tab", { name: "About the Authors" }),
    ).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "About MindTap" })).toBeVisible();
    expect(screen.getByRole("tab", { name: "Book Cover" })).toBeVisible();
    expect(screen.getByText(/Author bio/)).toBeInTheDocument();
    expect(container.querySelector("script")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "About MindTap" }));

    expect(screen.getByText("Copyright text")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Book Cover" }));

    expect(screen.getByAltText("Book cover")).toBeInTheDocument();
  });

  it("changes active tab with pointer and keyboard interactions", () => {
    render(
      <AboutModalTabsContainer
        aboutContent={aboutContent}
        numberOfTabs={aboutContent.length}
      />,
    );

    fireEvent.click(screen.getByRole("tab", { name: "About MindTap" }));

    expect(screen.getByRole("tab", { name: "About MindTap" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    fireEvent.keyDown(screen.getByRole("tablist"), { code: "ArrowDown" });

    expect(screen.getByRole("tab", { name: "Book Cover" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});
