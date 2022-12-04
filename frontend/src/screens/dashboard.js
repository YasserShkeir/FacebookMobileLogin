import { useState, useEffect } from "react";
import { Alert, BackHandler, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@apollo/client";

// Components
import TaskCard from "../components/taskCard";

// Styles
import { dashStyles } from "../styles";

// Queries
import { GET_SELF } from "../gqlQueries/user.queries";

const Dashboard = ({}) => {
  const [facebookID, setFacebookID] = useState(null);
  const { loading, data } = useQuery(GET_SELF, {
    variables: { facebookId: facebookID },
  });

  useEffect(() => {
    const getID = async () => {
      const fbID = await AsyncStorage.getItem("fbID");
      setFacebookID(fbID);
    };
    getID();
  }, [loading]);

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
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {data.user &&
            data.user.tasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
        </>
      )}
    </View>
  );
};

export default Dashboard;
