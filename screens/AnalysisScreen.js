import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class AnalysisScreen extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text>AnalysisScreen</Text>
      </View>
    );  
  }  
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },  
});

export default AnalysisScreen;
