import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/authContext';

const Home = () => {
  const { authContext } = useAuth();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          authContext.signOut();
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#d90202',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
