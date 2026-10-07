# AGENTS.md

Rules for AI agents working in this repo.

## 1. Docs

- Every commit must leave `README.md` (and any `docs/` files) correct for the code in that commit. Docs describe the current state only: no history, no plans.
- Check each fact you write against the code.

## 2. How to work

- Read the code you will change, and run `git status` first. Never overwrite or revert the user's uncommitted work.
- Keep changes small and focused. Ask before you add dependencies or change behaviour beyond the request.
- Game code imports the engine only as `shoeboxtheatre`. Engine changes belong in the [Shoebox Theatre repo](https://github.com/jackcannon/shoebox-theatre), not here.
- The `GameConfig` passed to `<Shoebox>` must be a stable, module-level constant.

## 3. Checks before "done"

- Run `yarn test && yarn build && yarn lint`. All tests must pass, the build must exit 0, and lint must show 0 errors.
- Check anything visual or interactive in the browser with `yarn dev`. Stop the dev server afterwards.

## 4. Code style

- TypeScript strict, with `verbatimModuleSyntax` (`import type { X }`) and `erasableSyntaxOnly` (no `enum` or `namespace`).
- No semicolons, single quotes, 2-space indent, trailing commas in multi-line literals.
- Comments only state a constraint that the code can't show.

## 5. Naming and content

- Describe the engine's style as "2D sprites in real 3D worlds".
- Never name a commercial game, company or brand, and use no content from one. All names, art, text and music must be original or clearly licensed.

## 6. Commands and environment

- The package manager is yarn 4, pinned by `packageManager` and run through corepack. Never run `npm install` or `npm ci`: a second lockfile makes the Dokku build fail.
- Don't add, remove or upgrade dependencies without asking.

## 7. Git and deploys

- Don't commit, push, branch, reset or rewrite history unless the user asks.
- Never deploy (a push to a Dokku remote) without the user's approval, and never run commands on the Dokku server.
- Never commit `node_modules/`, `dist/`, secrets or large binaries.
