import { Text, Image, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Styles
import { drawerStyle } from "../styles";

const logout = async (navigation) => {
  await AsyncStorage.removeItem("fbID");
  navigation.navigate("Login");
};

const NavigationDrawerStructure = ({ user, navigation }) => {
  //Structure for the navigatin Drawer
  return (
    <View style={drawerStyle.dashboard}>
      {user ? (
        <>
          <Image source={{ uri: user.imageURL }} style={drawerStyle.image} />
          <Text style={drawerStyle.name}>{user.name}</Text>
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

export default NavigationDrawerStructure;
