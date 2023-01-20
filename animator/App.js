import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Deck from './src/components/Deck' 
export default function App() {
  return (
    <View style={styles.container}>
      <Deck/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
    position: 'absolute',
    top:0,
    left:0
  },
  circle:{
    backgroundColor:'red',
    width:50,
    height:50,
    borderRadius:50
  }
});
