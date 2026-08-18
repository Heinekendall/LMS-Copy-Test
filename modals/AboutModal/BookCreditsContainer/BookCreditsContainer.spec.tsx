import { render, screen } from "@testing-library/react";

import BookCreditsContainer from "./BookCreditsContainer.tsx";

describe("BookCreditsContainer component", () => {
  it("renders featuring text, sanitized book title, and author names", () => {
    render(
      <BookCreditsContainer
        title={"General <strong>Chemistry</strong><script>alert(1)</script>"}
        authorNames="Jane Author, and John Writer"
      />,
    );

    expect(screen.getByText("Featuring")).toBeVisible();
    expect(screen.getByText("General", { exact: false })).toHaveTextContent(
      "General Chemistry",
    );
    expect(screen.queryByText("alert(1)")).not.toBeInTheDocument();
    expect(screen.getByText("Jane Author, and John Writer")).toBeVisible();
  });
});
