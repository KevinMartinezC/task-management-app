import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/presentation/theme/hooks/useColorScheme";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/core/api/ApolloClient";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { SCREENS } from "@/constants/Screens";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");
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
    <GestureHandlerRootView
      style={{ backgroundColor: backgroundColor, flex: 1 }}
    >
      <ApolloProvider client={apolloClient}>
        <PaperProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name={SCREENS.TASK.name}
                options={{
                  title: SCREENS.TASK.title,
                  headerBackTitle: SCREENS.TASK.headerBackTitle,
                }}
              />
              <Stack.Screen
                name={SCREENS.PROFILE.name}
                options={{
                  title: SCREENS.PROFILE.title,
                  headerBackTitle: SCREENS.PROFILE.headerBackTitle,
                }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </PaperProvider>
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}
