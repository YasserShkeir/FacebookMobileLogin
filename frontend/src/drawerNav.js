import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, Text, Image, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import Profile from "./profile";

const Drawer = createDrawerNavigator();

const logout = async (navigation) => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
  navigation.navigate("Login");
};

const NavigationDrawerStructure = ({ params, navigation }) => {
  const user = params.user;

  //Structure for the navigatin Drawer
  return (
    <View style={styles.profile}>
      <Image source={{ uri: user.picture.data.url }} style={styles.image} />
      <Text style={styles.name}>{user.name}</Text>
      <Text>ID: {user.id}</Text>
      <Button
        title="Logout"
        onPress={async () => {
          await logout(navigation);
        }}
      />
    </View>
  );
};

function DrawerNavigator({ route, navigation }) {
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      drawerContent={(props) => (
        <NavigationDrawerStructure
          {...props}
          params={route.params}
          navigation={navigation}
        />
      )}
    >
      <Drawer.Screen
        name="Profile"
        initialParams={{ params: route.params }}
        component={Profile}
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
  profile: {
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
