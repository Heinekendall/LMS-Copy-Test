import { fireEvent, render, screen } from "@testing-library/react";

import AboutModalAccordion from "./AboutModalAccordion.tsx";

const aboutContent = [
  {
    title: "About the Authors",
    body: "<p><strong>Author bio</strong><script>alert(1)</script></p>",
  },
  {
    title: "About MindTap",
    body: <img src="/mindtap.png" alt="MindTap screenshot" />,
    copyRight: "Copyright text",
  },
];

describe("AboutModalAccordion component", () => {
  it("renders accordion sections with sanitized string and React content", () => {
    const { container } = render(
      <AboutModalAccordion aboutContent={aboutContent} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "About the Authors" }));

    expect(screen.getByText(/Author bio/)).toBeInTheDocument();
    expect(container.querySelector("script")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "About MindTap" }));

    expect(screen.getByAltText("MindTap screenshot")).toBeInTheDocument();
    expect(screen.getByText("Copyright text")).toBeInTheDocument();
  });
});
