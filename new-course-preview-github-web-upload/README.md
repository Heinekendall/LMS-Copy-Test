# Course Preview Prototype

This folder is the built static web-upload version of the Date Management preview prototype.

Upload this folder to GitHub when you need the smallest shareable prototype package. It contains the built static site only, so it avoids uploading source files, `node_modules`, or other development-only files.

For Vercel:

- Framework Preset: Other
- Root Directory: `course-preview-github-web-upload` if this folder is inside the repository
- Root Directory: leave blank only if these files are at the repository root
- Build Command: leave blank
- Output Directory: `.`

Do not set an Install Command or Build Command for this folder. Vercel should serve these files as an already-built static site.

After deployment, check these URLs:

- `/` should open the Canvas Cengage copy flow
- `/mockServiceWorker.js` should open a JavaScript file, not a 404
- `/learning-path?snapshotId=204465&id=43891916&eISBN=9798214027715&courseEntrySetup=preview&courseStartDate=08%2F03%2F2026&courseEndDate=12%2F18%2F2026&courseTimeZone=America%2FDenver&courseEntryPreviewView=week` should open the Date Management Preview

If the course opens but stays on a loading screen, Vercel is usually serving an older build, the Root Directory is pointed at the wrong folder, or `mockServiceWorker.js` is not being served from the site root. Redeploy after clearing the Vercel build cache, then confirm `/mockServiceWorker.js` loads.

The prototype starts in Canvas on the Cengage tool page and uses local mock data. The flow is: select the Cengage format, select a title, choose **Copy an existing course**, select the source course, confirm the new course title/start/end details, finish the Canvas integration, click **Select Content**, then use the MindTap course link to open Schedule & Breaks before the Learning Path preview.

If this folder is uploaded as a folder inside the repository instead of uploading
its contents, set Vercel's Root Directory to `course-preview-github-web-upload`.

Open the root URL first:

`/?snapshotId=204465&id=43891916&eISBN=9798214027715`

Deep links such as `/learning-path?...` require the included `vercel.json`
rewrite to serve `index.html`.

For source-code handoff, use the separate `course-preview/` folder instead of
this built output.
