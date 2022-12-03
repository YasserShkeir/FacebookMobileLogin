import { useEffect } from "react";
import { Alert, BackHandler, StyleSheet, View } from "react-native";

const Profile = ({}) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return <View style={styles.dashboard}></View>;
};

const styles = StyleSheet.create({
  dashboard: {
    marginTop: 50,
    alignItems: "center",
  },
});

export default Profile;
