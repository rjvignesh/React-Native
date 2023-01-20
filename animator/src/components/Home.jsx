import React, { useRef } from "react";
import {Text, StyleSheet, View, Button, Animated} from 'react-native';

const Home = ()=>{
    const fadAnim = useRef(new Animated.Value(0)).current;
    const fadIn = ()=>{
        Animated.timing(fadAnim,
            { toValue: 5000,
            useNativeDriver:true,
            duration: 5000}).start();
            console.log("fading in")
}
    const fadOut = ()=>{
        Animated.timing(fadAnim,
            { toValue: 0,
            useNativeDriver:true,
            duration: 3000}).start();
        console.log("fading out")
    }

    return (
    <View>
    <Animated.View style={[styles.circle,{opacity: fadAnim}]}></Animated.View>
    <View>
    <Button title="Click Me" onPress={fadIn}></Button>
    <Button title="fade Out" onPress={fadOut}></Button>
    </View>
    </View>
)
}
const styles = StyleSheet.create({
    circle:{
        backgroundColor:'green',
        width:50,
        height:50,
        borderRadius:50
      }
  });
export default Home