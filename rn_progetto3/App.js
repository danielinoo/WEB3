// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';  // Assicurati che il percorso sia corretto
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { ProductDetailsScreen } from './screens/ProductDetailsScreen';
import { Ionicons } from '@expo/vector-icons';

import { StyleSheet } from 'react-native';
// Creazione degli stack e del Tab Navigator
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Funzione del Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="MainTabs" 
          component={TabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ProductDetails" 
          component={ProductDetailsScreen} 
          options={{ title: 'Dettagli Prodotto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// styles.js
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    productList: {
      padding: 10,
    },
    productCard: {
      padding: 15,
      marginBottom: 10,
      backgroundColor: '#f8f8f8',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    productName: {
      fontSize: 18,
      fontWeight: '500',
    },
    productPrice: {
      fontSize: 16,
      color: '#666',
      marginTop: 5,
    },
    userInfo: {
      padding: 15,
      backgroundColor: '#f8f8f8',
      borderRadius: 8,
    },
    userName: {
      fontSize: 20,
      fontWeight: '500',
      marginBottom: 5,
    },
    userEmail: {
      fontSize: 16,
      color: '#666',
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#f8f8f8',
      borderRadius: 8,
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      color: '#666',
    },
  });



export default App;
