import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const signupStyles = StyleSheet.create({
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

export const dashStyles = StyleSheet.create({
  dashboard: {
    marginTop: 10,
    alignItems: "center",
  },
});

export const taskCardStyles = StyleSheet.create({
  taskCard: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: "90%",
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 16,
  },
  taskDate: {
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
});

export const drawerStyle = StyleSheet.create({
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
