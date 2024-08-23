import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as Updates from "expo-updates";

export default function App() {
  const {
    currentlyRunning,
    isChecking,
    isDownloading,
    lastCheckForUpdateTimeSinceRestart,
    isUpdatePending,
  } = Updates.useUpdates();

  let [loading, setLoading] = useState("");

  async function getUpdates() {
    try {
      setLoading("starting update check");
      const update = await Updates.checkForUpdateAsync();
      console.log(update);
      setLoading(`update check done ${update.isAvailable}`);
      if (update.isAvailable) {
        setLoading(`fetchUpdateAsync`);
        await Updates.fetchUpdateAsync(); // Download
        setLoading(`reloadAsync`);
        await Updates.reloadAsync(); // Relaunch
      } else {
        setLoading("no update");
      }
    } catch (error) {
      setLoading(`${error}`);
      // alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{loading}</Text>
      <Pressable onPress={getUpdates}>Load</Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
