<<<<<<< HEAD
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Stack, useRouter, Tabs } from 'expo-router'
import { COLORS, icons, images, SIZES } from '../constants'
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../components'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Button, Icon, Pressable, Badge, HStack, Flex, Spacer } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Home = () => {
    const router = useRouter()
    return (
      <>
      <View  style={styles.topContainer}>
      <Button variant="solid" colorScheme="green" m="2" p="2">
        多次記賬
      </Button>
      <Button variant="solid" colorScheme="green" m="2" p="2" onPress={() => router.push('/Single')}>
        快速記賬
      </Button>
    </View>

    
    <SafeAreaView style={styles.container}>

    <View style={styles.data}>
    <Text style={styles.text}>交通</Text>
    <Text style={styles.text}>$300</Text>     
    </View>
    <View style={styles.data}>
    <Text style={styles.text}>餐飲</Text>
    <Text style={styles.text}>$2300</Text>     
    </View>
    <View style={styles.data}>
    <Text style={styles.text}>衣飾</Text>
    <Text style={styles.text}>$1200</Text>     
    </View>
    <View style={styles.data}>
    <Text style={styles.text}>娛樂</Text>
    <Text style={styles.text}>$1300</Text>     
    </View>
    <View style={styles.data}>
    <Text style={styles.text}>繳費</Text>
    <Text style={styles.text}>$5000</Text>     
    </View>
    <View style={styles.data}>
    <Text style={styles.text}>其他</Text>
    <Text style={styles.text}>$130</Text>     
    </View>
    
   </SafeAreaView>

   </>      
    )
}

const styles = StyleSheet.create({
    topContainer:{
      display:'flex',
      flexDirection: 'row-reverse',

    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    data: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '80%',
      marginBottom: '1.75%'
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
    },
});
export default Home 
=======
import { useEffect, useState } from "react";
import {
  Button,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useAuth } from "../context/authContext";
import {
  Redirect,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
// import { useAuth } from "../context/auth";

export default function Index() {
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const { authState } = useAuth();

  useEffect(() => {
    if (!navigationState?.key) return;
    const inAuthGroup = segments[0] === "(auth)";
    if (!authState.authenticated && !inAuthGroup) {
      console.log("Is in authGroup?", inAuthGroup);
      console.log(segments);

      router.replace("/login");
      console.log("ok");

      // Redirect({ href: "/home" });
    } else if (authState.authenticated) {
      router.replace("/home");
    }
  }, [authState, navigationState?.key, segments]);

  return <View>{!navigationState?.key ? <Text>LOADING...</Text> : <></>}</View>;
}
>>>>>>> 60bf1596e5ee2cb77f0b3e64a493302dfc00a496
