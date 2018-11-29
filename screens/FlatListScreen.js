import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, TouchableOpacity, FlatList, StyleSheet,
        Text, View } from 'react-native';
//import flatListData from '../data/flatListData';


/*
class FlatListItem extends Component {

  componentDidMount() {
    console.log("FlatListItem componentDidMount")  
  };

  //_onPress=() => {
    //this.props.navigation.navigate('Analysis');
    //alert("_onPress");
  //}

  render() {
    //console.log("From FlatListItem: ", this.props.item.kolesterol);
    //console.log("From FlatListItem: ", this.props.item);
    return (
      <View style={{
        flex: 1,
        //backgroundColor: this.props.index % 2 == 0 ? '#fdfdfd' : '#990000'  
      }}>
          <View style={styles.rowsContainer}>
              <Text style={[styles.flatListItem, styles.analysis]}>
                {this.props.item.analysis}</Text>
              <Text style={[styles.flatListItem, styles.result]}>
                {this.props.item.result}</Text>
          </View>
      </View>
    );  
  }  
}
*/

class FlatListScreen extends Component {
  static navigationOptions = {
    header: null  
  }

  constructor(props) {
    super(props);
    this.state={
      isLoading: true,
      refreshing: false,
      dataSource: [] 
    }
  };

  componentDidMount() {
    console.log("FlatListScreen componentDidMount")  
    this._latestAnalysis();
  };

  _displayData = async() => {
    try {
        //alert("Button Pressed");
        const keys = await AsyncStorage.getAllKeys()
        if (keys.length<1) {
          console.log("keys empty");
        }
        console.log("getAllKeys: ", keys);
        let filtered = [];
        //const keyNrarray = [];
        let keysSorted = [];
        const kolesterol = [];
        const values = [];
        //const unparsedValues = [];
        const keyArray = [];
        const remove = ["nextKey", "nextId", "latestKey"]
        const history = [];

        filtered = keys.filter(
          function(value) {
            return this.indexOf(value) < 0;
          },
          remove
        );
        //console.log("filtered: ", filtered);

        keysSorted = filtered.sort(function(a, b){return a-b});
        //console.log("keysSorted: ", keysSorted);

        //keyNrArray = filtered.map(Number);
        //console.log("keyNrArray: ", keyNrArray);

        const items = await AsyncStorage.multiGet((keysSorted), (error, stores) => {
        stores.map((result, i, store) => {
          //console.log("stores: ", stores);
          //console.log("result", result);
          //console.log("i",i);
          //console.log("store", store);
          let key = store[i][0];
          //console.log("key: ", key);
          keyArray.push(key);
          let value = JSON.parse(store[i][1]);
          let obj = {"key": key, "analysis": value[1].analysis,
            "result": value[1].result, "analysis": value[0].analysis,
            "result": value[0].result};
          //console.log("obj: ", obj);
          //console.log("value: ", value);  
          //kolesterol.push(obj);
          values.push(value);
          //let unparsedValue = store[i][1];
          //unparsedValues.push(unparsedValue);
          //console.log("unparsedValue: ", unparsedValue);  
          //keyNrArray = keysSortedArray.map(Number);
          //console.log("keyNrArray: ", keyNrArray);
        });
        });
        //console.log("obj: ", kolesterol);
        //console.log("items: ", items);
        //console.log("items typeof: ", typeof(items));
        //const latestKey = keyNrArray.slice(-1)[0];

        //const items = await AsyncStorage.multiGet(keysSorted);
        //console.log("items [0][1]: ", items[0][1]);
        //console.log("items: ", items);
        //console.log("parsed items: ", JSON.parse(items)); Parse error

        const latestKey = await AsyncStorage.getItem('latestKey');
        //console.log("unparsedValues: ", unparsedValues);

        console.log("latestKey: ", latestKey);
        const latestValues = await AsyncStorage.getItem(latestKey.toString());
        //console.log("latest values: ", latestValues);
        //console.log("latest parsed values: ", JSON.parse(latestValues));

        const dataSource = JSON.parse(latestValues);
        //const dataSource = JSON.parse(items[1][1]);
        for(var i = 0; i < values.length; i++) {
          //console.log(values[i][0]);
          let date = values[i][0];
          let parameter = values[i][1];
          //let date = {values[i][0].analysis: values[i][0].result};
          console.log("date: ", date);
          history.push(date, parameter);
          //history.push(parameter);
          console.log("history: ", history);
        }
        console.log("dataSource: ", dataSource);
        console.log("values: ", values);
        console.log("values[2][1].kolesterol: ", values[2][1].analysis);
        console.log("values[2][1].kolesterol: ", values[2][1].result);
        this.setState ({
          isLoading: false,
          dataSource: dataSource,  
        });
    }

    catch(error) {
      console.log("error _displayData: ", error);  
    }
  }

  _onPress=() => {
    this.props.navigation.navigate('Analysis');
  };

  _latestAnalysis = async() => {
    try {
        const latestKey = await AsyncStorage.getItem('latestKey');
        const latestValues = await AsyncStorage.getItem(latestKey.toString());
        const dataSource = JSON.parse(latestValues);
        this.setState ({
          isLoading: false,
          refreshing: false,
          dataSource: dataSource,  
        });
    }

    catch(error) {
      console.log("error _latestAnalysis: ", error);  
    }
  };

  _historyAnalysis = async() => {
    try {
        const keys = await AsyncStorage.getAllKeys()
        if (keys.length<1) {
          console.log("keys empty");
        }
        console.log("getAllKeys: ", keys);
        let filtered = [];
        //const keyNrarray = [];
        let keysSorted = [];
        const kolesterol = [];
        const values = [];
        //const unparsedValues = [];
        const keyArray = [];
        const remove = ["nextKey", "nextId", "latestKey"]
        const history = [];

        filtered = keys.filter(
          function(value) {
            return this.indexOf(value) < 0;
          },
          remove
        );
        //console.log("filtered: ", filtered);

        keysSorted = filtered.sort(function(a, b){return a-b});
        //console.log("keysSorted: ", keysSorted);

        //keyNrArray = filtered.map(Number);
        //console.log("keyNrArray: ", keyNrArray);

        const items = await AsyncStorage.multiGet((keysSorted), (error, stores) => {
        stores.map((result, i, store) => {
          //console.log("stores: ", stores);
          //console.log("result", result);
          //console.log("i",i);
          //console.log("store", store);
          let key = store[i][0];
          //console.log("key: ", key);
          keyArray.push(key);
          let value = JSON.parse(store[i][1]);
          let obj = {"key": key, "analysis": value[1].analysis,
            "result": value[1].result, "analysis": value[0].analysis,
            "result": value[0].result};
          //console.log("obj: ", obj);
          //console.log("value: ", value);  
          //kolesterol.push(obj);
          values.push(value);
          //let unparsedValue = store[i][1];
          //unparsedValues.push(unparsedValue);
          //console.log("unparsedValue: ", unparsedValue);  
          //keyNrArray = keysSortedArray.map(Number);
          //console.log("keyNrArray: ", keyNrArray);
        });
        });
        //console.log("obj: ", kolesterol);
        //console.log("items: ", items);
        //console.log("items typeof: ", typeof(items));
        //const latestKey = keyNrArray.slice(-1)[0];

        //const items = await AsyncStorage.multiGet(keysSorted);
        //console.log("items [0][1]: ", items[0][1]);
        //console.log("items: ", items);
        //console.log("parsed items: ", JSON.parse(items)); Parse error

        const latestKey = await AsyncStorage.getItem('latestKey');
        //console.log("unparsedValues: ", unparsedValues);

        console.log("latestKey: ", latestKey);
        const latestValues = await AsyncStorage.getItem(latestKey.toString());
        //console.log("latest values: ", latestValues);
        //console.log("latest parsed values: ", JSON.parse(latestValues));

        const dataSource = JSON.parse(latestValues);
        //const dataSource = JSON.parse(items[1][1]);
        for(var i = 0; i < values.length; i++) {
          //console.log(values[i][0]);
          let date = values[i][0];
          let parameter = values[i][1];
          //let date = {values[i][0].analysis: values[i][0].result};
          console.log("date: ", date);
          history.push(date, parameter);
          //history.push(parameter);
          console.log("history: ", history);
        }
        console.log("dataSource: ", dataSource);
        console.log("values: ", values);
        console.log("values[2][1].kolesterol: ", values[2][1].analysis);
        console.log("values[2][1].kolesterol: ", values[2][1].result);
        this.setState ({
          isLoading: false,
          dataSource: dataSource,  
        });
    }

    catch(error) {
      console.log("error _displayData: ", error);  
    }
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true,  
    },
    () => {
      this._latestAnalysis();  
    });  
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "90%",  
          backgroundColor: "#ced0ce",
          marginLeft: "5%",
        }}
      />
    );  
  };

  render() {
    if(this.state.isLoading) {
      return(
        <View style={{flex: 1, padding: 50}}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={this.state.dataSource}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            renderItem={({item}) => 
            <TouchableOpacity onPress={this._onPress}>
              <View style={{
                flex: 1,
                //backgroundColor: this.props.index % 2 == 0 ? '#fdfdfd' : '#990000'  
              }}>
                <View style={styles.rowsContainer}>
                  <Text style={[styles.flatListItem, styles.analysis]}>
                    {item.analysis}</Text>
                  <Text style={[styles.flatListItem, styles.result]}>
                    {item.result}</Text>
                </View>
              </View>
            </TouchableOpacity>
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fdfdfd',
    alignItems: 'stretch',
    //justifyContent: 'flex-end',
  },
  rows: {
    flex: 1,
    //backgroundColor: this.props.index % 2 == 0 ? 'green' : 'grey'  
  },
  topContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    //borderBottomWidth: 2,
    //borderBottomColor: 'black',
  },
  flatListContainer: {
    flex: 4,
    justifyContent: 'flex-start',
  },
  flatListItem: {
    //color: "white",
    padding: 15,
    //fontSize: 16  
  },
  rowsContainer: {
    flex: 1,
    flexDirection: "row", 
  },
  analysis: {
    flex: 3,
    textAlign: "left",
    alignItems: "center",
    fontSize: 18,
  },
  result: {
    flex: 2,
    textAlign: "left",  
    alignItems: "center",
    fontSize: 20,
  },
  btn: {
    //flex: 1,
    alignSelf: 'center',
    //backgroundColor: '#01c853',  
    backgroundColor: '#008000',  
    padding: 10,
    alignItems: 'center',
    marginBottom: 30,
    width: 200,
    borderRadius: 10,
  },
});

export default FlatListScreen;
