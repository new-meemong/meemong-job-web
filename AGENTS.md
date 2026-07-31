# AGENTS.md

<!-- meemong-common v1 start -->
## Meemong shared working agreements

- Keep changes scoped to the requested problem and preserve unrelated user-authored work.
- Apply technically valid, low-risk review feedback in the current change when it improves the touched area.
- After refactoring, verify that names still match the domain intent and actual reuse scope.
- Follow the repository's existing architecture and reuse established shared building blocks and utilities before adding new abstractions.
- Never commit credentials, tokens, production data, or user personal information.
- Run the relevant checks for the changed area and report any check that could not be run.
<!-- meemong-common v1 end -->

## Project overview

This is the Meemong jobs and resumes webview built with Next.js 14, React 18, TypeScript, Zustand, and Firebase. It includes job postings, resumes, matching, and job chat.

## Package manager and commands

Use npm and keep `package-lock.json` authoritative.

```bash
npm ci
npm run dev
npm run lint
npm run build
```

The repository currently has no automated test script. Add focused tests when introducing testable business logic instead of claiming a test run that does not exist.

## Code organization

- `src/app/` owns App Router pages and route-local components.
- `src/apis/` owns HTTP operations and webview login.
- `src/stores/` owns authentication, domain state, and Firestore chat subscriptions.
- `src/components/` contains reusable UI shared across job and resume routes.
- `src/types/` and `src/models/` own API, domain, and chat shapes.

## Webview and authentication

- Preserve the bridge boundary in `src/app/layout.tsx`: the Flutter host exposes native channel objects, and the layout installs browser-facing compatibility functions that forward to them.
- Do not infer native-host availability from a compatibility function installed by the layout. When changing bridge behavior, verify both the host-channel path and the browser path.
- Keep this guidance at the bridge-contract level instead of listing individual channel names that can drift as the host evolves.
- Routes launched by the app obtain `userId` from the query string and authenticate through the existing auth store and webview-login API. Do not duplicate login in individual components.

## Chat and state

- Keep Firestore collection paths and per-user channel metadata consistent across job-posting and model-matching chat stores.
- Clean up Firestore listeners when components unmount or subscription inputs change.
- Preserve unread-count, pin, block, and last-read behavior when refactoring chat stores.
- Follow the established local style in touched legacy code; avoid broad modernization unrelated to the requested change.

## Verification

- Run `npm run lint` for all code changes.
- Run `npm run build` for routing, bridge, authentication, Firebase, or production-facing changes.
- Manually verify app-source and browser-source behavior for changed webview or chat flows.
