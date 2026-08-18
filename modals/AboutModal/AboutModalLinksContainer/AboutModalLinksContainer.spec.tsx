import { render, screen } from "@testing-library/react";

import { LINKS } from "../AboutModal.constants.ts";
import { createAboutModalSnapshot } from "../AboutModal.testUtils.ts";
import AboutModalLinksContainer from "./AboutModalLinksContainer.tsx";

describe("AboutModalLinksContainer component", () => {
  it("renders all about modal links with generated support parameters", () => {
    render(
      <AboutModalLinksContainer
        snapshot={createAboutModalSnapshot()}
        ssoToken="sso-token"
      />,
    );

    const linkNames = [
      LINKS.ABOUT_CENGAGE_LINK,
      LINKS.CUSTOMER_SUPPORT,
      LINKS.FEEDBACK,
      LINKS.ACCESSIBILITY,
      LINKS.PRIVACY,
      LINKS.TERMS_OF_USE,
      LINKS.PIRACY,
    ];

    expect(screen.getAllByRole("link")).toHaveLength(linkNames.length);
    linkNames.forEach((linkName) => {
      expect(screen.getByRole("link", { name: linkName })).toBeVisible();
    });

    expect(
      screen.getByRole("link", { name: LINKS.CUSTOMER_SUPPORT }),
    ).toHaveAttribute("href", expect.stringContaining("token=sso-token"));
    expect(
      screen.getByRole("link", { name: LINKS.CUSTOMER_SUPPORT }),
    ).toHaveAttribute(
      "href",
      expect.stringContaining("cmcoursename=Chemistry%20101"),
    );
    expect(
      screen.getByRole("link", { name: LINKS.CUSTOMER_SUPPORT }),
    ).toHaveAttribute(
      "href",
      expect.stringContaining("cmcoursekey=COURSE-KEY"),
    );
    expect(
      screen.getByRole("link", { name: LINKS.FEEDBACK }),
    ).not.toHaveAttribute("target");
  });
});
