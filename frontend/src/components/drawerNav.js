import { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import Dashboard from "../screens/dashboard";
import NavigationDrawerStructure from "../components/drawerContent";

// Hooks
import { getSelf } from "../hooks/user.hook";

const Drawer = createDrawerNavigator();

function DrawerNavigator({ navigation }) {
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

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => (
        <NavigationDrawerStructure
          {...props}
          user={user}
          navigation={navigation}
        />
      )}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
