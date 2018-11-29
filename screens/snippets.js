          <TouchableOpacity
            style={styles.btn}
            onPress={this._displayData}>
            <Text>Display stored data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={this._onPress}>
            <Text>AnalysisScreen</Text>
          </TouchableOpacity>

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
