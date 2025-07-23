import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeTabs } from './HomeTabs';
import { AllTransactions } from '../screens/AllTransactions';
import { HomeStackParamList } from './types';
import { HomeStackScreens } from './navigation.constants';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={HomeStackScreens.HomeTabs}
      screenOptions={{
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name={HomeStackScreens.HomeTabs}
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HomeStackScreens.AllTransactions}
        component={AllTransactions}
        options={{ presentation: 'modal', title: 'All Transactions' }} // Modal presentation for this screen
      />
    </Stack.Navigator>
  );
};
