import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { fetchAboutModalData } from "../../services/aboutDataService.ts";
import focusManager from "../../services/focusManager.ts";
import { setMediaQueryMatches } from "../../utilities/testUtils.tsx";
import { LOADING_ABOUT_DATA } from "./AboutModal.constants.ts";
import {
  createAboutModalData,
  createAboutModalSnapshot,
} from "./AboutModal.testUtils.ts";
import AboutModal from "./AboutModal.tsx";

vi.mock("../../services/aboutDataService.ts", () => ({
  fetchAboutModalData: vi.fn(),
}));

const fetchAboutModalDataMock = vi.mocked(fetchAboutModalData);

function renderAboutModal({ onClose = vi.fn(), ssoToken = "sso-token" } = {}) {
  const snapshot = createAboutModalSnapshot();

  render(<AboutModal data={{ snapshot, ssoToken }} onClose={onClose} />);

  return { onClose, snapshot };
}

describe("AboutModal component", () => {
  beforeEach(() => {
    setMediaQueryMatches(false);
    fetchAboutModalDataMock.mockReset();
  });

  it("shows loading state until about data is fetched", async () => {
    fetchAboutModalDataMock.mockResolvedValue(createAboutModalData());
    const { snapshot } = renderAboutModal();

    expect(screen.getByText(LOADING_ABOUT_DATA)).toBeVisible();
    expect(fetchAboutModalDataMock).toHaveBeenCalledWith(
      snapshot.id,
      snapshot.coreTextISBN,
    );

    expect(await screen.findByText("Chemistry 101")).toBeVisible();
    expect(screen.queryByText(LOADING_ABOUT_DATA)).not.toBeInTheDocument();
  });

  it("shows an error message when about data cannot be fetched", async () => {
    fetchAboutModalDataMock.mockRejectedValue(new Error("Network failed"));

    renderAboutModal();

    expect(await screen.findByText("Failed to load about data")).toBeVisible();
    expect(screen.queryByText(LOADING_ABOUT_DATA)).not.toBeInTheDocument();
    expect(screen.queryByText("Chemistry 101")).not.toBeInTheDocument();
  });

  it("closes the modal and restores focus to the about trigger", async () => {
    const restoreSpy = vi.spyOn(focusManager, "restore");
    fetchAboutModalDataMock.mockResolvedValue(createAboutModalData());
    const { onClose } = renderAboutModal();

    fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));

    await waitFor(() => expect(onClose).toHaveBeenCalledOnce());
    expect(restoreSpy).toHaveBeenCalledWith("about-modal");
  });
});
