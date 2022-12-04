import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { useMutation } from "@apollo/client";

// Styles
import { signupStyles } from "../styles";

// Queries
import { SIGN_UP } from "../gqlQueries/user.queries";

const Signup = ({ route, navigation }) => {
  const userInfo = route.params.userInfo;

  const [name, setName] = useState(userInfo.name);
  const [dateOfBirth, setDateOfBirth] = useState(userInfo.birthday);
  const [imageURL, setImageURL] = useState(userInfo.picture.data.url);

  const [createUser] = useMutation(SIGN_UP);

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
              createUser({
                variables: {
                  facebookId: userInfo.id,
                  name: name,
                  dateOfBirth: dateOfBirth,
                  imageURL: imageURL,
                },
              }).then((res) => {
                AsyncStorage.setItem("fbID", userInfo.id);
                navigation.navigate("DrawerNavigator");
              });
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
