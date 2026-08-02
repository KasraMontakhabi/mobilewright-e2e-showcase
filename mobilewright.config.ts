import { defineConfig } from 'mobilewright';

export default defineConfig({
  // Android target — switch to 'ios' + a simulator deviceName to run against iOS instead
  platform: 'android',

  // Package name for Sauce Labs "My Demo App" (native Android build)
  bundleId: 'com.saucelabs.mydemoapp.android',

  // No deviceName filter needed: with one booted device, mobilewright picks the only
  // online android emulator/simulator automatically. If you run multiple AVDs at once,
  // add e.g. deviceName: /Medium Phone/ — this matches the AVD's *name* (see
  // `npx mobilewright devices`), not the adb serial (emulator-5554).

  // App is already installed via `adb install`, so no installApps path needed.
  // Uncomment and point at the APK if you want Mobilewright to (re)install it on every run:
  // installApps: './apks/mda-2.2.0-25.apk',

  timeout: 10_000,
});
