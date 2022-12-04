import "react-native-gesture-handler";
import { useEffect } from "react";
import { Button, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ResponseType } from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";

// Hooks
import { checkFbCredentials } from "../hooks/auth.hook";

// Styles
import { loginStyles } from "../styles";

WebBrowser.maybeCompleteAuthSession();

const FB_APP_ID = "1474879553039409";

const Login = ({ navigation }) => {
  // Request
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: FB_APP_ID,
    responseType: ResponseType.Token,
  });

  // Check if token exists in storage and navigate to drawer navigator
  useEffect(() => {
    const checkToken = async () => {
      const fbID = await AsyncStorage.getItem("fbID");
      if (fbID) {
        navigation.navigate("DrawerNavigator");
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large),birthday`
        );
        const userInfo = await userInfoResponse.json();
        const token = await checkFbCredentials(userInfo.id);
        console.log("token", token);
        if (token) {
          console.log("Logging in...");
          await AsyncStorage.setItem("fbID", userInfo.id);
          navigation.navigate("DrawerNavigator", {
            fbID: userInfo.id,
          });
        } else {
          console.log("User does not exist, signing up...");
          navigation.navigate("Signup", { userInfo });
        }
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
    <View style={loginStyles.container}>
      <Button
        disabled={!request}
        title="Login/Signup"
        onPress={handlePressAsync}
      />
    </View>
  );
};

export default Login;
