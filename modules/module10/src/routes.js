import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  headerBackTitleVisible: false,
  headerBackTitle: false,
  headerTitleAlign: 'center',
  headerTintColor: '#FFF',
  headerStyle: {
    backgroundColor: '#7159c1',
  },
};

function AppRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dasboard" component={Dashboard} />
    </Tab.Navigator>
  );
}

function SignInRoutes() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default function Routes({ signedIn }) {
  console.tron.log('Routes -> Signed: ', signedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {signedIn ? (
          <Stack.Screen name="App" component={AppRoutes} />
        ) : (
          <Stack.Screen name="Sign" component={SignInRoutes} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
