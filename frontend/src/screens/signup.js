import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

// Hooks
import { register } from "../hooks/auth.hook";

const Signup = ({ route, navigation }) => {
  const userInfo = route.params.userInfo;
  const [name, setName] = useState(userInfo.name);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [imageURL, setImageURL] = useState(userInfo.picture.data.url);

  return (
    <View style={styles.signup}>
      <Text style={styles.signupFormLabel}>Facebook ID: {userInfo.id}</Text>
      <View style={styles.signupForm}>
        <View style={styles.signupFormRow}>
          <Text style={styles.signupFormLabel}>Name</Text>
          <TextInput
            style={styles.signupFormInput}
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.signupFormRow}>
          <Text style={styles.signupFormLabel}>Date of birth</Text>
          <TextInput
            style={styles.signupFormInput}
            placeholder="Enter your date of birth"
            value={dateOfBirth}
            onChangeText={(text) => setDateOfBirth(text)}
          />
        </View>

        <View style={styles.signupFormRow}>
          <Text style={styles.signupFormLabel}>Image URL</Text>
          <TextInput
            style={styles.signupFormInput}
            placeholder="Enter your image URL"
            value={imageURL}
            onChangeText={(text) => setImageURL(text)}
          />
        </View>

        <View style={styles.signupFormRow}>
          <TouchableOpacity
            style={styles.signupFormButton}
            onPress={() => {
              register(userInfo.id, name, dateOfBirth, imageURL).then(
                async (response) => {
                  console.log("response", response);
                  await AsyncStorage.setItem("fbID", userInfo.id);
                  navigation.navigate("DrawerNavigator", {
                    fbID: userInfo.id,
                  });
                }
              );
            }}
          >
            <Text style={styles.signupFormButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signup: {
    marginTop: 50,
    alignItems: "center",
  },
  signupForm: {
    width: "80%",
    marginTop: 40,
  },
  signupFormRow: {
    marginBottom: 20,
  },
  signupFormLabel: {
    marginBottom: 5,
  },
  signupFormInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  signupFormButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
  },
  signupFormButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default Signup;
