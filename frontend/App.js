import "react-native-gesture-handler";

import { LogBox, AppRegistry } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Components
import Login from "./src/screens/login";
import Signup from "./src/screens/signup";
import DrawerNavigator from "./src/components/drawerNav";

const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs();

// Apollo Client Setup
// Using the 10.0.2.2 as we are using an emulator, replace with your IP address if you are using a physical device
const client = new ApolloClient({
  uri: `http://192.168.1.2:3000/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("nadeeraV3", () => App);
