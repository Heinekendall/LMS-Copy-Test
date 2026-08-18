import { render, screen } from "@testing-library/react";

import {
  createAboutModalData,
  createAboutModalSnapshot,
} from "../AboutModal.testUtils.ts";
import SnapshotInfoContainer from "./SnapshotInfoContainer.tsx";

describe("SnapshotInfoContainer component", () => {
  it("renders course name, section, and course dates for regular snapshots", () => {
    render(
      <SnapshotInfoContainer
        snapshot={createAboutModalSnapshot()}
        aboutData={createAboutModalData()}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "About Chemistry 101" }),
    ).toBeVisible();
    expect(screen.getByText("Section A")).toBeVisible();
    expect(screen.getByText(/UTC/)).toBeVisible();
  });

  it("renders fallback course name and incomplete dates when details are missing", () => {
    render(
      <SnapshotInfoContainer
        snapshot={createAboutModalSnapshot()}
        aboutData={createAboutModalData({
          courseName: "",
          sectionName: undefined,
          startDate: 0,
          endDate: 0,
          timeZoneCode: "",
        })}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "About Course name" }),
    ).toBeVisible();
    expect(screen.getByText("* course date info incomplete")).toBeVisible();
    expect(screen.queryByText("Section A")).not.toBeInTheDocument();
  });

  it("does not render snapshot info for master or reader-only snapshots", () => {
    const { rerender } = render(
      <SnapshotInfoContainer
        snapshot={createAboutModalSnapshot({ isMaster: true })}
        aboutData={createAboutModalData()}
      />,
    );

    expect(screen.queryByText("Chemistry 101")).not.toBeInTheDocument();

    rerender(
      <SnapshotInfoContainer
        snapshot={createAboutModalSnapshot({ isReaderOnly: true })}
        aboutData={createAboutModalData()}
      />,
    );

    expect(screen.queryByText("Chemistry 101")).not.toBeInTheDocument();
  });
});
