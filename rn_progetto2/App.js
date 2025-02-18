import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';

const { width, height } = Dimensions.get('window');

function App () {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [position, setPosition] = useState({
    top: Math.random() * (height - 100),
    left: Math.random() * (width - 100),
  });

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.alert(`Game Over your final score is ${score}`);
    }
  }, [timeLeft]);

  const moveSquare = () => {
    setScore(score + 1);
    setPosition({
      top: Math.random() * (height - 100),
      left: Math.random() * (width - 100),
    });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.timerText}>Time Left: {timeLeft}s</Text>
      <TouchableOpacity
        style={[styles.square, { top: position.top, left: position.left }]}
        onPress={moveSquare}
        
        

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 20,
    marginBottom: 40,
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    position: 'absolute',
  },
});

export default App;

