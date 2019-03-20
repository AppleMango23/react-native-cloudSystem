import {createStackNavigator,createAppContainer} from 'react-navigation';
import Login from './src/pages/Login';
import Succeed from './src/pages/Succeed';
import ShowDoc from './src/pages/ShowDoc';
import ShowSearch from './src/pages/ShowSearch';
import {
  Platform,
  StyleSheet,
  Text,
  View, TouchableOpacity
} from 'react-native';
import React, { Component } from 'react';

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Succeed:  {
      screen: Succeed,
      navigationOptions: ({navigation}) => ({
        title: "Main",
        headerLeft:(<TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
                      <Text>press me</Text>
                    </TouchableOpacity>
        ),
        headerStyle: { paddingRight: 10, paddingLeft: 15 }
      })
    },
    ShowDoc:ShowDoc,
    ShowSearch:ShowSearch,
    
  },
  {
    initialRouteName: "Login"
  }
);
export default createAppContainer(AppNavigator);






