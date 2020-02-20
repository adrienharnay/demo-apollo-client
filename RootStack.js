import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import CocktailsScreen from './src/screens/cocktails-screen/CocktailsScreen';
import DetailsScreen from './src/screens/details-screen/DetailsScreen';

const RootStack = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ffff',
          },
          headerBackTitle: null,
        }}
      >
        <Stack.Screen
          name="Home"
          component={CocktailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({
            route: {
              params: { name },
            },
          }) => ({
            title: name,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
