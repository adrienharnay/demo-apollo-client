import { createAppContainer, createStackNavigator } from 'react-navigation';

import CocktailsScreen from '../screens/cocktails-screen/CocktailsScreen';
import DetailsScreen from '../screens/details-screen/DetailsScreen';

export const createNavigation = () =>
  createAppContainer(
    createStackNavigator(
      {
        Home: CocktailsScreen,
        Details: DetailsScreen,
      },
      {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: '#ffff',
          },
          headerBackTitle: null,
        },
      },
    ),
  );
