import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import FlatListScreen from "./screens/FlatListScreen";
import TextInputScreen from "./screens/TextInputScreen";
import HomeScreen from "./screens/HomeScreen";
import AnalysisScreen from "./screens/AnalysisScreen";
import HistoryScreen from "./screens/HistoryScreen";
import FactsScreen from "./screens/FactsScreen";

const FlatListStack = createStackNavigator ({
  FlatList: {
    screen: FlatListScreen, 
  },
  Analysis: {
    screen: AnalysisScreen, 
  },
  History: {
    screen: HistoryScreen,
  },
  Facts: {
    screen: FactsScreen,
  }
});

const AppNavigator = createMaterialTopTabNavigator ({
  Home: {
    screen: HomeScreen
  },
  Data: {
    screen: FlatListStack
  },
  Inputs: {
    screen: TextInputScreen,
    navigationOptions: {
      tabBarLabel: 'Inputs',
      tabBarIcon: ({tintColor}) => (
        <Icon name="" color={tintcolor} size={24} />
      )
    }
  }
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'orange',  
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: '#f2f2f2',  
      },
      indicatorStyle: {
        height: 0  
      },
      showIcon: false
    }
  });

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />  
  }  
}
