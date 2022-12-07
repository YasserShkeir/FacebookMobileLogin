import "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { SafeAreaView, Button, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ResponseType } from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";

import { useQuery } from "@apollo/client";

// Styles
import { loginStyles } from "../styles";

// Queries
import { SIGN_IN } from "../gqlQueries/user.queries";

WebBrowser.maybeCompleteAuthSession();

const FB_APP_ID = "1474879553039409";

const Login = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const { loading, data } = useQuery(SIGN_IN, {
    variables: { facebookId: userInfo?.id },
  });
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
        setUserInfo(userInfo);
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

  // Check if we received a token
  useEffect(() => {
    if (userInfo) {
      (async () => {
        // Approve token data that checks if user exists
        const token = data;
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
  }, [userInfo]);

  return (
    <SafeAreaView style={loginStyles.container}>
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <Button
          title="Login with Facebook"
          onPress={handlePressAsync}
          disabled={!request}
        />
      )}
    </SafeAreaView>
  );
};

export default Login;
