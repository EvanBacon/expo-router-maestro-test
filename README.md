# Expo Router Maestro test

This is an example of using Expo Router + Expo Go + Maestro to do some quick E2E testing.

- Setup [Maestro](https://maestro.mobile.dev/getting-started/installing-maestro) (a couple global commands).
- Maestro works on normal apps that are already built on a device. This means we can skip the slow native builds by using Expo Go with `npx expo start --ios`.
- The test launches URLs with a custom parameter `_TEST_URL=1`. This parameter adds a component that alerts the URL (joined segments) so the test can check if the URL is correct. I used the alert because showing a normal text element wouldn't work with modals since it became a hidden accessibility element (Maestro uses the accessibility tree to find elements).
- The test depends on Expo CLI's dev server running and using port 8081.
- Running `maestro test launch-test.yaml` opens Expo Go, launches some URLs for Expo Go, and checks if the Expo Router URL state is expected. This can easily be extended to check other things like the UI, but I wanted to keep it simple and scalable.

## Further work

It could be cool to wrap Expo CLI and automatically provide the dev server URL.

You could also use `npx expo run:ios --configuration Release` to build and install the app without needing the dev server, it's just a lot slower.
