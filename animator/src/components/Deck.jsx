import React, { useRef, useState } from 'react'
import { Animated, Dimensions, PanResponder, StyleSheet, View } from 'react-native';
import { Text} from 'react-native'
import { Button, Card, Image } from 'react-native-elements'
function Deck() {
  const DATA = [
    { id: 1, text: 'Card #1', uri: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 2, text: 'Card #2', uri: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 3, text: 'Card #3', uri: 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60'},
    { id: 4, text: 'Card #4', uri: 'https://images.unsplash.com/photo-1567336273898-ebbf9eb3c3bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60' },
    { id: 5, text: 'Card #5', uri: 'https://images.unsplash.com/photo-1523956468692-1e219561ea46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODJ8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60' },
    { id: 6, text: 'Card #6', uri: 'https://images.unsplash.com/photo-1534330786040-317bdb76ccff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60' },
    { id: 7, text: 'Card #7', uri: 'https://images.unsplash.com/photo-1534493872551-856c2bb2279f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60' },
    { id: 8, text: 'Card #8', uri: 'https://images.unsplash.com/photo-1612041720569-7e67f4061729?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60'},
  ];

  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
  const [ crCard, setCard] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder:()=> true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ],{useNativeDriver: false}
      ),
      onPanResponderTerminationRequest: (evt, gestureState) =>
      true,
      onPanResponderRelease: (evt, gestureState) => {
        if ( gestureState.dx  > SWIPE_THRESHOLD ){
          Animated.timing(pan,{
            toValue:{x:SCREEN_WIDTH * 1.25, y:0},
            duration: 1000,
            useNativeDriver:true
          }).start(()=>{
            pan.setValue({x:0,y:0});
            setCard(crCard => crCard + 1);
        });
        }else if ( gestureState.dx < -SWIPE_THRESHOLD){
          Animated.timing(pan,{
            toValue:{x:-SCREEN_WIDTH * 1.25, y:0},
            duration: 1000,
            useNativeDriver:true
          }).start(()=>{
            pan.setValue({x:0,y:0});
            setCard(crCard => crCard + 1);
          });          
        }else{
        Animated.spring( pan,{
          toValue: { x: 0, y: 0},
          useNativeDriver: true
        }).start();
      }
      }
    })
  ).current;
  const cardItem = (a)=>{
    return (<View key={a.id}>
          <Card 
          key={a.id}
          title={a.text}>
          <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: a.uri }}
            />
          <Text>Hi there</Text>
          <Button title={a.text}></Button></Card>      
    </View>)
  }

  const NoCards = ()=>{
    return (<View>
      <Card 
      title="No Cards">
      <Text>Hi there</Text>
      <Button title="No More Cards" onPress={()=>setCard(0)}></Button></Card>      
    </View>)  
  }

  if  ( crCard === DATA.length ){
    return <View styles={styles.noDeck}>{NoCards()}</View>
  }else{
    return (
    DATA.map((a,index)=>{
        if ( index < crCard ){
          return null;
        }

        return (
           index === crCard ? (
          <Animated.View 
            key={a.id}
            style={[styles.deck,{ 
              transform: [
                { translateX: pan.x }, 
                { translateY: pan.y }, 
                { rotate: pan.x.interpolate({inputRange:[-SCREEN_WIDTH,0,SCREEN_WIDTH],outputRange:['-120deg','0deg','120deg']})}]
            }]} 
            {...panResponder.panHandlers}
            updCard={(a)=>setCard(a)}>
            {cardItem(a)}
          </Animated.View> )
        : <Animated.View key={a.id} style={styles.deck}>
          {cardItem(a)}
        </Animated.View>
        )
    }).reverse()
  )}
}

const styles = StyleSheet.create({
  image:{
      width:300,
      height:500,
  },
    deck: {
      position: 'absolute',
      top:0,
      left:0
    },
    noDeck:{
      flex:1,
      alignItems:"center",
      width:100,
      backgroundColor:"green"
    }
})

export default Deck