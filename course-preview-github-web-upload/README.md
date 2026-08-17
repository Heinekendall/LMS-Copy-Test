# Course Preview Prototype

This folder is the built static web-upload version of the Date Management preview prototype.

Upload the contents of this folder to GitHub when you need the smallest shareable prototype package. It contains the built static site only, so it avoids GitHub's browser upload limit for folders with more than 100 files.

For Vercel:

- Framework Preset: Other
- Root Directory: leave blank if these files are at the repository root
- Build Command: leave blank
- Output Directory: `.`

The prototype starts in Canvas on the Cengage tool page and uses local mock data. The flow is: select the Cengage format, select a title, choose **Copy an existing course**, select the source course, confirm the new course title/start/end details, finish the Canvas integration, click **Select Content**, then use the MindTap course link to open Schedule & Breaks before the Learning Path preview.

If this folder is uploaded as a folder inside the repository instead of uploading
its contents, set Vercel's Root Directory to `course-preview-github-web-upload`.

Open the root URL first:

`/?snapshotId=204465&id=43891916&eISBN=9798214027715`

Deep links such as `/learning-path?...` require the included `vercel.json`
rewrite to serve `index.html`.

For source-code handoff, use the separate `course-preview/` folder instead of
this built output.
