import { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, Text, Image, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import Dashboard from "../screens/dashboard";

// Hooks
import { getSelf } from "../hooks/user.hook";

const Drawer = createDrawerNavigator();

const logout = async (navigation) => {
  await AsyncStorage.removeItem("fbID");
  navigation.navigate("Login");
};

const NavigationDrawerStructure = ({ navigation }) => {
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

  //Structure for the navigatin Drawer
  return (
    <View style={styles.dashboard}>
      {user ? (
        <>
          <Image source={{ uri: user.imageURL }} style={styles.image} />
          <Text style={styles.name}>{user.name}</Text>
          <Text>ID: {user.facebookId}</Text>
          <Button
            title="Logout"
            onPress={async () => {
              await logout(navigation);
            }}
          />
        </>
      ) : null}
    </View>
  );
};

function DrawerNavigator({ route, navigation }) {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => (
        <NavigationDrawerStructure {...props} navigation={navigation} />
      )}
    >
      <Drawer.Screen
        name="Dashboard"
        initialParams={{ params: route.params }}
        component={Dashboard}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dashboard: {
    marginTop: 70,
    alignItems: "flex-start",
    marginLeft: 20,
  },
  name: {
    fontSize: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default DrawerNavigator;
