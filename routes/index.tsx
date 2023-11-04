import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Home, SignIn, SignUp } from '../screens';

const Stack = createNativeStackNavigator();

const AuthorizedRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const UnauthorizedRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      {false ? <AuthorizedRoutes /> : <UnauthorizedRoutes />}
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});
