
// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';
export function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Il Mio Profilo</Text>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Mario Rossi</Text>
        <Text style={styles.userEmail}>mario.rossi@example.com</Text>
      </View>
    </View>
  );
}
export default ProfileScreen;