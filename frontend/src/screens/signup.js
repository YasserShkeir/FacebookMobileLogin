import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";

// Hooks
import { register } from "../hooks/auth.hook";

// Styles
import { signupStyles } from "../styles";

const Signup = ({ route, navigation }) => {
  const userInfo = route.params.userInfo;
  const [name, setName] = useState(userInfo.name);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [imageURL, setImageURL] = useState(userInfo.picture.data.url);

  return (
    <View style={signupStyles.signup}>
      <Text style={signupStyles.signupFormLabel}>
        Facebook ID: {userInfo.id}
      </Text>
      <View style={signupStyles.signupForm}>
        <View style={signupStyles.signupFormRow}>
          <Text style={signupStyles.signupFormLabel}>Name</Text>
          <TextInput
            style={signupStyles.signupFormInput}
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={signupStyles.signupFormRow}>
          <Text style={signupStyles.signupFormLabel}>Date of birth</Text>
          <TextInput
            style={signupStyles.signupFormInput}
            placeholder="Enter your date of birth"
            value={dateOfBirth}
            onChangeText={(text) => setDateOfBirth(text)}
          />
        </View>

        <View style={signupStyles.signupFormRow}>
          <Text style={signupStyles.signupFormLabel}>Image URL</Text>
          <TextInput
            style={signupStyles.signupFormInput}
            placeholder="Enter your image URL"
            value={imageURL}
            onChangeText={(text) => setImageURL(text)}
          />
        </View>

        <View style={signupStyles.signupFormRow}>
          <TouchableOpacity
            style={signupStyles.signupFormButton}
            onPress={() => {
              register(userInfo.id, name, dateOfBirth, imageURL).then(
                async () => {
                  await AsyncStorage.setItem("fbID", userInfo.id);
                  navigation.navigate("DrawerNavigator");
                }
              );
            }}
          >
            <Text style={signupStyles.signupFormButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;
