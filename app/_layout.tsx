import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, usePathname, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useURL } from "expo-linking";
import { Text, Alert, View } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  console.log("Pathname>", usePathname());
  console.log("URL>", useURL());

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </ThemeProvider>
      <EnableURLBar />
    </>
  );
}

const EnableURLBar = __DEV__
  ? () => {
      if (useURL()?.match(/[?&]_TEST_URL=/)) {
        return <TestURLBar />;
      }
      return null;
    }
  : () => null;

// import { Screen } from "react-native-screens";

function TestURLBar() {
  const segments = useSegments();

  useEffect(() => {
    Alert.alert("URL:" + segments.join("/"), undefined, [
      { text: "DISMISS_URL" },
    ]);
  }, [segments]);

  return (
    // <Screen accessible enabled>
    <Text
      selectable={false}
      style={{
        pointerEvents: "none",
        position: "absolute",
        zIndex: 9999,
        top: 0,
        left: 8,
        right: 8,
      }}
      testID="EXPO_ROUTER_URL"
    >
      {segments.join("/")}
    </Text>
    // </Screen>
  );
}
