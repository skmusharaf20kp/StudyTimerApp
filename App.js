import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome Aspirants! Reach you goal using this App</Text>
      <Text>We are here to help you</Text>
      <TouchableOpacity style={styles.button} onPress={() => alert('Congrats✨(❁´◡`❁)')}>
      <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
      <Text>Click the button to proceed</Text>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
