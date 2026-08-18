import { http, HttpResponse, type JsonBodyType } from "msw";
import { renderToString } from "react-dom/server";
import * as React from "react";
import { ImageNotSupportedIcon } from "react-magma-icons";

import * as APIPaths from "../src/constants/APIPaths.ts";
import { ONETRUST_SRC_URL } from "../src/services/oneTrust.ts";
import { parseFormBody } from "../src/utilities/httpUtils.ts";
import bookCoverImageUrl from "./__fixtures__/book_cover_image.png?url";
import * as modifiers from "./devSettings.ts";

const provideFile = (file: Promise<{ default: unknown }>, type: string) => () =>
  file
    .then((module) => module.default as string)
    .then((rawContent) => new HttpResponse(new Blob([rawContent], { type })));
const a2sEntryFixtures = import.meta.glob("./__fixtures__/a2s/*.js", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;
const a2sAssetFixtures = import.meta.glob("./__fixtures__/a2s/assets/*.js", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;
const provideRawFixture = (
  fixtures: Record<string, string>,
  filePath: string,
  type: string,
) => {
  const rawContent = fixtures[filePath];

  return rawContent
    ? new HttpResponse(new Blob([rawContent], { type }))
    : new HttpResponse(null, { status: 404 });
};
const json =
  (
    file: Promise<{ default: unknown }>,
    ...modifiers: ((json: unknown) => JsonBodyType)[]
  ) =>
  () =>
    file
      .then((module) => module.default)
      .then((json) =>
        HttpResponse.json(
          modifiers.reduce(
            (json, modifier) => modifier(json),
            json,
          ) as JsonBodyType,
        ),
      );

export const handlers = [
  http.get(
    "/assessment-ui/remoteEntryHash.json",
    provideFile(
      import("./__fixtures__/a2s/remoteEntryHash.json?raw"),
      "application/json",
    ),
  ),
  http.get("/assessment-ui/assets/*", (req) =>
    provideRawFixture(
      a2sAssetFixtures,
      `./__fixtures__/a2s/assets/${(req.params[0] as string).replace(/\.js$/, "")}.js`,
      "text/javascript",
    ),
  ),
  http.get("/assessment-ui/*", (req) =>
    provideRawFixture(
      a2sEntryFixtures,
      `./__fixtures__/a2s/${(req.params[0] as string).replace(/\.js$/, "")}.js`,
      "text/javascript",
    ),
  ),

  http.get(
    "/static/**/*.png",
    () =>
      new HttpResponse(
        renderToString(React.createElement(ImageNotSupportedIcon)),
        {
          headers: { "Content-Type": "image/svg+xml" },
        },
      ),
  ),

  // TODO [msw@>=3.0] MSW 3.0 should handle navigate requests, but it's not
  //  possible at the moment https://github.com/mswjs/msw/pull/2721
  // http.get(
  //   "/static/progress/client/CDNLoader.html",
  //   provideFile(import("./__fixtures__/CDNLoader.html?raw"), "text/html"),
  // ),

  http.post(`${APIPaths.A2S_PREFLIGHT}/*`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  http.get(
    APIPaths.ACTIVITY_OUTCOME + "/attempt/activity/:activityId",
    json(
      import("./__fixtures__/nb.service.activityOutcome.attempt.activity+id.json"),
    ),
  ),

  http.get(APIPaths.ACTIVITY_TYPES, ({ request }) => {
    const url = new URL(request.url);

    return url.searchParams.get("placementType") === "distinct"
      ? json(
          import("./__fixtures__/nb.service.appActivity.findAddibleAndEditable+distinct.json"),
        )()
      : json(
          import("./__fixtures__/nb.service.appActivity.findAddibleAndEditable+inline.json"),
        )();
  }),

  http.get(
    APIPaths.ADDITIONAL_FEATURES_FLAGS,
    json(
      import("./__fixtures__/nb.service.settings.cgiFeatureFlags.json"),
      modifiers.setHasSkillsTagging,
    ),
  ),

  http.get(
    APIPaths.ANNOUNCEMENTS + "/active",
    json(
      import("./__fixtures__/announcement.service.announcement.active.json"),
    ),
  ),

  http.post(APIPaths.ANNOUNCEMENTS + "/dismiss", () => HttpResponse.json()),

  http.get(
    APIPaths.CAP_CLIENT_CONFIG,
    json(import("./__fixtures__/nb.service.globalCapClientConfig.json")),
  ),

  http.get(
    APIPaths.CAP_CLIENT_CONFIG_NONGLOBAL,
    json(import("./__fixtures__/nb.service.capClientConfig.json")),
  ),

  http.get(
    APIPaths.CATEGORY_WEIGHTING + "/:id/countsTowardsGrade",
    json(
      import("./__fixtures__/progressapp.service+id.countsTowardsGrade.json"),
    ),
  ),

  http.get(
    APIPaths.COMPETENCY_TAGS_BY_ISBN_AND_CGI + "/isbn/:isbn/cgi/:cgi",
    json(
      import("./__fixtures__/competencyService.isbn+isbn.cgi+cgi.generated.json"),
    ),
  ),

  http.get(
    APIPaths.COURSE_ACTIVITIES_PLANK_DATA + "/:id",
    json(import("./__fixtures__/nb.service.metadata+id.json")),
  ),

  http.get(
    APIPaths.COURSE_FOR_SNAPSHOT + "/:id",
    json(
      import("./__fixtures__/nb.service.course.findCourseForSnapshot+id.json"),
    ),
  ),

  http.get(
    APIPaths.COURSE_DATA + "/:id",
    json(
      import("./__fixtures__/nb.service.snapshot+id.json"),
      modifiers.setIsMaster,
    ),
  ),

  http.get(
    APIPaths.COURSE_SERVICES + "/:cgi/metadata",
    json(import("./__fixtures__/services.courseservices+cgi.metadata.json")),
  ),

  http.get(
    APIPaths.COURSE_SERVICES + "/:cgi",
    json(import("./__fixtures__/services.courseservices+cgi.json")),
  ),

  http.get(
    APIPaths.COURSE_SERVICES + "/:cgi/uxFeatures",
    json(import("./__fixtures__/services.courseservices+cgi.uxFeatures.json")),
  ),

  http.get(
    APIPaths.COURSE_SETTINGS + "/:id",
    json(import("./__fixtures__/nb.service.courseSettings.snapshot+id.json")),
  ),

  http.get(
    APIPaths.COURSE_SETTINGS_USERS_PERMISSIONS + "/:orgId/:id",
    json(
      import("./__fixtures__/nb.service.userCapability.instructorCapabilities+orgId+id.json"),
    ),
  ),

  http.get(APIPaths.CSRF_DATA, () =>
    HttpResponse.text(
      "9GAB-83C8-NYXT-KTWT-SWWG-X4IG-ISBJ-R822-0SQP-IURB-IRQU-2JGR-RU",
    ),
  ),

  http.get(
    APIPaths.FEATURE_FLAGS,
    json(import("./__fixtures__/nb.service.settings.flags.json")),
  ),

  http.get(
    APIPaths.FIND_DOCK_ACTIONS,
    json(import("./__fixtures__/nb.service.appAction.findDockActions.json")),
  ),

  http.get(
    APIPaths.FIND_DOCK_CATEGORIES,
    json(import("./__fixtures__/nb.service.appCategory.findCategories.json")),
  ),

  http.post(
    APIPaths.GOPHER + "/query",
    json(import("./__fixtures__/services.gopher.query+learningPath.json")),
  ),

  http.get(
    APIPaths.GRADEBOOK_SETTINGS + "/:id",
    json(import("./__fixtures__/progressapp.service.gradebook+id.json")),
  ),

  http.get(
    APIPaths.GTM_JS,
    async () =>
      new HttpResponse("void 0;", {
        headers: {
          "Content-Type": "text/javascript",
        },
      }),
  ),

  http.get(
    APIPaths.INSIGHT_ASSISTANT + "/metadata/:id",
    json(import("./__fixtures__/nb.service.insightAssistant.metadata+id.json")),
  ),

  http.get(APIPaths.KEEP_SESSION_ALIVE, () => HttpResponse.text("")),

  http.get(
    APIPaths.LTI_LAUNCH_DATA + "/:cgi/notification/:appId",
    json(
      import("./__fixtures__/nb.service.lti+snapshotId.notification+appUid.json"),
    ),
  ),

  http.get(
    APIPaths.MASTER + "/:id",
    json(import("./__fixtures__/nb.service.master+id.json")),
  ),

  http.get(
    APIPaths.MASTER_SETTINGS + "/:isbn",
    json(import("./__fixtures__/nb.service.masterSettings.ssoisbn+isbn.json")),
  ),

  http.get(
    APIPaths.NODES + "/:id/nodes",
    json(
      import("./__fixtures__/nb.service.nextbook+id.nodes.json"),
      modifiers.setHasDueDateActivityToday,
      modifiers.setHasDueDateActivityTomorrow,
    ),
  ),

  http.put(APIPaths.MOVE_ACTIVITY, async ({ request }) => {
    const body = await request.text();
    const activity = parseFormBody(body);

    if (activity.id == null) {
      return HttpResponse.json(
        { message: "Activity id is required" },
        { status: 400 },
      );
    }

    return HttpResponse.json(activity);
  }),

  http.put(APIPaths.ACTIVITY, async ({ request }) => {
    const body = await request.text();
    const activity = parseFormBody(body);

    if (activity.id == null) {
      return HttpResponse.json(
        { message: "Activity id is required" },
        { status: 400 },
      );
    }

    return HttpResponse.json(activity);
  }),

  http.get(
    APIPaths.NOTEBOOK_LM_SETTINGS + "/:id",
    json(import("./__fixtures__/nb.service.notebooklm.settings+id.json")),
  ),

  http.get(
    ONETRUST_SRC_URL,
    async () =>
      new HttpResponse("void 0;", {
        headers: {
          "Content-Type": "text/javascript",
        },
      }),
  ),

  http.get(
    APIPaths.PROGRESSAPP_COURSE_INFO + "/:id",
    json(import("./__fixtures__/progressapp.service.courseinfo+id.json")),
  ),

  http.get(
    APIPaths.SEARCH + "/:snapshotId",
    json(import("./__fixtures__/nb.service.search.snapshot+id.json")),
  ),

  http.get(
    APIPaths.SNAPSHOT_MINDAPPS + "/:id/apps",
    json(import("./__fixtures__/nb.service.appAction.snapshot+id.apps.json")),
  ),

  http.post(
    APIPaths.COURSE_DATA + "/:id/reindex",
    json(import("./__fixtures__/nb.service.snapshot+id.reindex.json")),
  ),

  http.get(
    APIPaths.SPLASH + "/:snapshotId",
    json(import("./__fixtures__/nb.service.splash+id.json")),
  ),

  http.get(
    APIPaths.SPLASH_CONTENT + "/:isbn/splashContent",
    json(
      import("./__fixtures__/nbreader.service.Contents+isbn.splashContent.json"),
    ),
  ),

  http.get(
    APIPaths.SPLASH_CONTENT + "/:isbn/coverImage/isbn13.jpg",
    async () => {
      const response = await fetch(bookCoverImageUrl);
      const image = await response.blob();

      return new HttpResponse(image, {
        headers: {
          "Content-Type": "image/png",
        },
      });
    },
  ),

  http.get(
    APIPaths.PRODUCT_SPLASH_CONTENT,
    json(import("./__fixtures__/nb.service.platformArtifacts.productInfo.json")),
  ),

  http.get(
    APIPaths.COMPANY_SPLASH_CONTENT,
    json(import("./__fixtures__/nb.service.platformArtifacts.companyInfo.json")),
  ),

  http.post(APIPaths.SPLASH + "/snapshot/:id/visit", () => {
    return new HttpResponse(null, { status: 204 });
  }),

  http.get(
    APIPaths.SPLASH + "/snapshot/:id",
    json(import("./__fixtures__/nb.service.splash.snapshot+id.json")),
  ),

  http.get(
    APIPaths.SSO_TOKEN,
    json(import("./__fixtures__/nb.service.userOrgProfile.ssoToken.json")),
  ),

  http.post(
    APIPaths.STUDENT_ASSISTANT_SETTINGS + "/:id/fetch",
    json(import("./__fixtures__/nb.service.studentAssistant.settings+id.json")),
  ),

  http.get(
    APIPaths.USER_COURSE_SETTINGS,
    json(import("./__fixtures__/nb.service.user-course-settings.json")),
  ),

  http.get(
    APIPaths.USER_LOGOUT,
    json(import("./__fixtures__/nb.service.system.logout.json")),
  ),

  http.get(
    APIPaths.USER_PROFILE_DATA,
    json(import("./__fixtures__/nb.service.userOrgProfile.current.json")),
  ),
];
