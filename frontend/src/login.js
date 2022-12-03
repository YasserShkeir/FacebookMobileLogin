import "react-native-gesture-handler";
import { useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ResponseType } from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const FB_APP_ID = "1474879553039409";

const Login = ({ navigation }) => {
  // Request
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: FB_APP_ID,
    responseType: ResponseType.Token,
  });

  if (request) {
    console.log(
      "You need to add this url to your authorized redirect urls on your Facebook app: " +
        request.redirectUri
    );
  }

  // Check if token exists in storage and navigate to drawer navigator
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");

      if (token && user) {
        navigation.navigate("DrawerNavigator", { user: JSON.parse(user) });
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        AsyncStorage.setItem(
          "token",
          JSON.stringify(response.authentication.accessToken)
        );
        AsyncStorage.setItem("user", JSON.stringify(userInfo));
        navigation.navigate("DrawerNavigator", { user: userInfo });
      })();
    }
  }, [response]);

  const handlePressAsync = async () => {
    const result = await promptAsync();
    if (result.type !== "success") {
      alert("Uh oh, something went wrong");
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Button
        disabled={!request}
        title="Open FB Auth"
        onPress={handlePressAsync}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
