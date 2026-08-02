# mobilewright-e2e-showcase

Sample Mobilewright test framework targeting the Sauce Labs "My Demo App" (Android, React Native build)
already installed on your emulator.

## Structure

```
mobilewright-e2e-showcase/
├── mobilewright.config.ts     # platform, bundleId, device target
├── locators.yaml               # every screen locator, grouped by screen
├── package.json
└── tests/
    ├── locators.ts             # loads locators.yaml and resolves entries against `screen`
    ├── 01-app-launch.test.ts   # catalog screen + nav sanity checks
    ├── 02-login.test.ts        # valid + invalid login flows
    └── 03-add-to-cart.test.ts  # add-to-cart + cart contents
```

## Setup

```bash
cd mobilewright-e2e-showcase
npm install
```

### Get the app

The APK is **not committed to this repo** — fetch it fresh from the official
[saucelabs/my-demo-app-android](https://github.com/saucelabs/my-demo-app-android) releases:

```bash
./scripts/fetch-apk.sh          # latest release
./scripts/fetch-apk.sh 2.2.0    # or a specific tagged version
```

This pulls the asset via the GitHub Releases API rather than a hardcoded filename, since asset
names change between versions. The APK is saved to `apks/` (gitignored). Install it on your
booted emulator:

```bash
adb install -r apks/<downloaded-file>.apk
```

> **Note:** this fetches the **native Android** build (`my-demo-app-android`), which is a
> different app from the React Native build (`my-demo-app-rn`) the tests below were originally
> written against. Package name and accessibility labels differ between the two — see the
> callout below before running the existing tests against this APK.

Confirm your emulator is visible before running anything:

```bash
npx mobilewright devices
```

## Run the tests

```bash
npm test
```

Or with an HTML report:

```bash
npm run test:report
npm run show-report
```

## Native Android app vs React Native app

The test files in this repo were originally written against `com.saucelabs.mydemoapp.android`
(the React Native build). If you use `fetch-apk.sh` to pull the **native Android** build
instead, its package name is different — find the actual one after installing:

```bash
adb shell pm list packages | grep saucelabs
```

Update `bundleId` in `mobilewright.config.ts` to match, then re-verify every locator with the
Inspector (native Espresso views and RN views often expose different accessibility labels for
the same-looking screen).

## Locators

Every element locator used by the tests lives in [`locators.yaml`](locators.yaml), grouped by
screen (`menu`, `login`, `catalog`, `cart`). Test files never hardcode a label/text/testId/role —
they call `find(screen, '<screen>', '<name>')` (from [`tests/locators.ts`](tests/locators.ts)),
which looks up the entry and resolves it against `screen.getByLabel` / `getByText` / `getByTestId`
/ `getByRole` as appropriate. `testId` entries may contain a `{bundleId}` placeholder, substituted
at runtime when you pass `bundleId` as `find`'s 4th argument; an optional `index` picks the nth
match for screens with no unique locator.

## Important: verify locators first

The values in `locators.yaml` are based on the app's typical structure but **may not match your
exact build/version exactly**. Before trusting these tests, open the Inspector against your
booted emulator and confirm the real locators:

```bash
npx mobilewright inspect
```

This opens a browser UI showing a live screenshot of the app next to every visible element and
its best-matching locator. Update the entries in `locators.yaml` (not the test files) to match
what you see there.

## Next step: adding the MCP server

Once these tests are running cleanly, configure `@mobilenext/mobile-mcp` in this project via
`.vscode/mcp.json` (or the Command Palette → "MCP: Add Server") so an agent can explore the app
interactively alongside these deterministic tests.
