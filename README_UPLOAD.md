# Course Preview Prototype Handoff

This folder contains the lightweight source handoff for the Canvas Cengage course-copy Date Management preview prototype. It intentionally excludes `node_modules`, `dist`, `.git`, and other generated/local project folders.

Use this folder when the development team wants to inspect or run the source code.

Use `course-preview-github-web-upload/` when someone only needs the already-built static prototype for GitHub browser upload or Vercel static hosting.

## Vercel Settings For Source Deploys

If this folder is uploaded as the root of the GitHub repository:

- Root Directory: leave blank
- Framework Preset: `Vite`
- Build Command: use the default from `vercel.json`
- Output Directory: use the default from `vercel.json`

If this folder is inside a larger GitHub repository:

- Root Directory: `course-preview`
- Framework Preset: `Vite`
- Build Command: use the default from `vercel.json`
- Output Directory: use the default from `vercel.json`

The included `.env.production` sets `VITE_USE_MOCK_DATA=true`, so the deployed prototype uses the bundled mock responses instead of trying to call private backend services.

This upload copy disables the module-federation Vite plugin in `vite.config.ts` so Vercel can build the standalone prototype with bundled mock data.

## Prototype Entry

Locally or on Vercel, open:

`http://127.0.0.1:5175/?snapshotId=204465&id=43891916&eISBN=9798214027715`

The flow starts in Canvas on the Cengage tool page. The user selects the Cengage course format, selects a title, chooses **Copy an existing course**, selects the source course to copy from, confirms the new course title/start/end details, finishes the Canvas integration, clicks **Select Content**, then uses the MindTap course link to open the Schedule & Breaks date-management prompt before the Learning Path preview.

Avoid opening `/learning-path` directly on a basic static file server. That route is handled by React Router, so the server must rewrite deep links to `index.html`. The included `vercel.json` handles that on Vercel.

## What Is Included

- Canvas Cengage course copy prototype files.
- Learning Path course-entry preview mode files.
- Break/no-class and shifted due-date preview logic.
- Supporting app routing/chrome updates.
- Supporting workflow reducer updates.
- Focused tests for the changed behavior.
- Mock fixture updates needed to show the prototype course data locally.

## What Is Not Included

- `node_modules`
- `dist`
- `.git`
- generated build output
- dependency caches

Those should not be uploaded to GitHub.

## Validation

- `tsc -b`
- `vitest run src/pages/learning-path/LearningPath.spec.tsx`
- `vitest run src/pages/instructor-center/InstructorCenterFlow.spec.tsx`
- `vite build`

The build passes with existing bundle-size and dynamic-import warnings inherited from the prototype app.
