# My Game

A game made with [Shoebox Theatre](https://github.com/jackcannon/shoebox-theatre), an engine for 2D sprites in real 3D worlds. The engine comes from npm as [`shoeboxtheatre`](https://www.npmjs.com/package/shoeboxtheatre).

## Start a new game from this template

1. On GitHub, select **Use this template**, then **Create a new repository**.
2. Clone the new repo.
3. Change `name` in `package.json`, the `<title>` in `index.html`, `title` in `src/config.ts` and `name` in `src/maps/start.ts`.
4. Change the heading of this README to the game's name.
5. Add a licence if you want one.

## Run it

Requires Node 20.19+ or 22.12+. The repo pins its yarn version (yarn 4), so enable corepack once with `corepack enable`.

```bash
yarn install
yarn dev       # http://localhost:5173
yarn test      # map integrity tests (vitest)
yarn build     # type check, then a production build into dist/
yarn lint      # oxlint
yarn preview   # serve the production build
```

`yarn build` prints a Vite advisory that the JS chunk is larger than 500 kB. Most of it is three.js; the build still succeeds.

## What is in it

| File | Contents |
|---|---|
| `src/main.tsx`, `src/App.tsx` | Mount `<Shoebox config={gameConfig} debug={import.meta.env.DEV} />`. In `yarn dev`, `window.__shoebox` is the running game, for the browser console. |
| `src/config.ts` | `gameConfig`: title, start position, the player sprite, the maps and a `hero` character |
| `src/maps/start.ts` | `start`: a 7 × 7 grass clearing ringed by trees |
| `src/maps/maps.test.ts` | Checks every map in `gameConfig`: ids, row widths, warps, NPC tiles and the start tile |
| `vite.config.ts` | The React plugin and the Vitest settings. Vitest processes `shoeboxtheatre` through Vite (`server.deps.inline`), because the package is built for bundlers: Node alone can't load its CSS imports. |
| `.yarnrc.yml` | `nodeLinker: node-modules`, and `npmPreapprovedPackages: [shoeboxtheatre]`: yarn installs only package versions that are at least 1 day old, except the engine, so a new engine release is usable at once. |

The engine's documentation is in the [Shoebox Theatre repo](https://github.com/jackcannon/shoebox-theatre/tree/master/docs): maps and collision in `world.md`, dialogue and scripts in `scripting.md`, and how to add content in `extending.md`.

## Update the engine

1. Read the release notes of the new `shoeboxtheatre` version on GitHub.
2. Run `yarn up shoeboxtheatre`.
3. Run `yarn test && yarn build && yarn lint`, and check the game in the browser.

To try unreleased engine changes, see "Games in their own repos" in the engine repo's `docs/deployment.md`.

## Deploy to Dokku

The game deploys as a static site, built on the server with buildpacks:

- `.buildpacks`: the env, Node and nginx buildpacks, in that order.
- `.dokku.env`: `NGINX_ROOT='dist'`, so nginx serves the build.
- `.static`: an empty file that turns on the nginx buildpack.

The Node buildpack installs yarn 4 through corepack, runs `yarn install --immutable` and `yarn run build`. To deploy:

1. Create the app on the server: `dokku apps:create <app>`.
2. Add the remote: `git remote add dokku dokku@ssh.cannonbury.co.uk:<app>`.
3. Push: `git push --force dokku master`.
