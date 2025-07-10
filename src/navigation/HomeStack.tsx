import * as React from 'react';
import { HomeScreen, ProfileScreen, HistoryScreen } from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '../common/components';
import { ThemeSpacings } from '../config/theme';

const Tab = createBottomTabNavigator();

export const HomeStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          marginVertical: ThemeSpacings.sm,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          headerTitle: 'Quick Kode',
          tabBarIcon: ({ color, size }) => (
            <Icon name="Home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'History',
          headerTitle: 'USSD History',
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
          headerTitle: 'My Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="AccountOutline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
