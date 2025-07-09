import * as React from 'react';
import { HomeScreen, ProfileScreen, TransactionsScreen } from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '../common/components';

const Tab = createBottomTabNavigator();

export const HomeStack = () => {
  return (
    <Tab.Navigator screenOptions={{ headerTitle: 'Quick Kode' }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="Home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          tabBarLabel: 'Transactions',
          tabBarIcon: ({ color, size }) => (
            <Icon name="Swap" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="AccountOutline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
