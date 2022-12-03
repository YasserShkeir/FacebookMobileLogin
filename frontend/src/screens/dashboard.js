import { useState, useEffect } from "react";
import { Alert, BackHandler, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import TaskCard from "../components/taskCard";

// Hooks
import { getSelf } from "../hooks/user.hook";

// Styles
import { dashStyles } from "../styles";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const fbID = await AsyncStorage.getItem("fbID");
      await getSelf(fbID).then((response) => {
        if (response) {
          setUser(response);
        } else {
          console.log("No user found");
          navigation.navigate("Login");
        }
      });
    };
    getUser();
  }, []);

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

  return (
    <View style={dashStyles.dashboard}>
      {user ? user.tasks.map((task) => <TaskCard task={task} />) : null}
    </View>
  );
};

export default Dashboard;
