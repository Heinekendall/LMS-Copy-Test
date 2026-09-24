# Course Copy Prototype — Developer Handoff

This folder is the production-built static prototype. It includes the latest Canvas LMS course-copy flow, date shifting, break and holiday selection, date-management behavior, and Learning Path updates.

## Open locally

Serve this folder from a local web server, then open:

`/?snapshotId=204465&id=43891916&eISBN=9798214027715`

The flow starts in Canvas LMS. Select **Integrate with Cengage**, choose the MindTap course link, and continue through the copy and date-management steps.

Do not open `index.html` directly from the filesystem; the prototype expects to run from an HTTP server.

## Upload to Vercel

- Framework Preset: **Other**
- Install Command: leave blank
- Build Command: leave blank
- Output Directory: `.`

`vercel.json` provides the single-page-app rewrite and the service-worker headers required by the mock API layer.

## Contents

- `index.html`: application entry point
- `assets/`: compiled JavaScript and image assets
- `mockServiceWorker.js`: local mock service worker
- `vercel.json`: hosting configuration

This package contains compiled output only. Make future code changes in the source repository and rebuild the package rather than editing the hashed files in `assets/`.
