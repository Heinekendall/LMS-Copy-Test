import { render, screen } from "@testing-library/react";

import { createAboutModalData } from "../AboutModal.testUtils.ts";
import CopyrightContainer from "./CopyrightContainer.tsx";

describe("CopyrightContainer component", () => {
  it("renders print and MindTap ISBN and copyright information", () => {
    const [bookInfo] = createAboutModalData().books;

    render(<CopyrightContainer bookInfo={bookInfo} />);

    expect(screen.getByText("Print Edition ISBN: 9780357757965")).toBeVisible();
    expect(screen.getByText("Copyright 2025 Cengage Learning")).toBeVisible();
    expect(screen.getByText("MindTap ISBN: 9798214120959")).toBeVisible();
    expect(screen.getByText("Copyright 2025 Cengage MindTap")).toBeVisible();
  });

  it("omits print copyright information when it is unavailable", () => {
    const [bookInfo] = createAboutModalData({
      books: [
        {
          ...createAboutModalData().books[0],
          copyrightInfo: "",
        },
      ],
    }).books;

    render(<CopyrightContainer bookInfo={bookInfo} />);

    expect(
      screen.queryByText("Copyright 2025 Cengage Learning"),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Copyright 2025 Cengage MindTap")).toBeVisible();
  });
});
