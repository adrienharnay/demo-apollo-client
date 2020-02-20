import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import CocktailsScreen from '../screens/cocktails-screen/CocktailsScreen';
import DetailsScreen from '../screens/details-screen/DetailsScreen';

export const createNavigation = () => {
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
          options={{ header: null }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({
            navigation: {
              state: {
                params: { name },
              },
            },
          }) => ({
            title: name,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
