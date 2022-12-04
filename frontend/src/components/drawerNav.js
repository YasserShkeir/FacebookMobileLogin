import { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@apollo/client";
import { Text } from "react-native";

// Components
import Dashboard from "../screens/dashboard";
import NavigationDrawerStructure from "../components/drawerContent";

// Queries
import { GET_SELF } from "../gqlQueries/user.queries";

const Drawer = createDrawerNavigator();

function DrawerNavigator({ navigation }) {
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
  }, []);

  return (
    <>
      {loading ? (
        <Text>loading...</Text>
      ) : (
        <Drawer.Navigator
          initialRouteName="Dashboard"
          drawerContent={(props) => (
            <NavigationDrawerStructure
              {...props}
              user={data.user}
              navigation={navigation}
            />
          )}
        >
          <Drawer.Screen name="Dashboard" component={Dashboard} />
        </Drawer.Navigator>
      )}
    </>
  );
}

export default DrawerNavigator;
