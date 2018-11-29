import React from 'react'
import { ScrollView, KeyboardAvoidingView, Keyboard, Alert, AsyncStorage,
   TouchableOpacity, TextInput, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      key: null,
      id: null,
      date: "",
      kolesterol: "",
      LDL_kolesterol: "",
      HDL_kolesterol: "",
      triglycerider: "",
      apolipoproteiner: "",
      bloodpressure: "",
      HbA1c_bloodsugar: "",
      waist: "",
    }

    this.focusNextField = this.focusNextField.bind(this); 
    this.inputs = {};

  }

  focusNextField(field) {
    this.inputs[field].focus();  
  }

  componentDidMount() {
    console.log("TextInputScreen componentDidMount");
    this._initialState().done();
  }

  componentDidUpdate() {
    console.log("TextInputScreen componentDidUpdate");
  }

  _initialState = async() =>{
    try {
      const nextKey = await AsyncStorage.getItem('nextKey');
      if (!nextKey) {
        await AsyncStorage.multiSet([['nextKey', JSON.stringify(0)],
          ['nextId', JSON.stringify(0)]])
        .then(() =>  
          this.setState ({
            id: 0,
            key: 0,
          }));
      console.log("key and id set to: ", this.state.key, this.state.id);
      }
    }
    catch(error) {
      console.log("error _initialState: ", error);  
    }  
  }

  _saveInputs = async(key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    }
    catch(error) {
      console.log("error _saveInputs: ", error);  
    }  
  }

  _saveNextKey = async(nextKey) => {
    try {
      await AsyncStorage.setItem('nextKey', JSON.stringify(nextKey));  
    }
    catch(error) {
      console.log("error _saveNextKey: ", error);  
    }
  }

  _saveNextId = async(nextId) => {
    try {
      await AsyncStorage.setItem('nextId', JSON.stringify(nextId));  
    }
    catch(error) {
      console.log("error _saveNextId: ", error);  
    }
  }

  _getNextKey = async() => {
    try {
      const key = await AsyncStorage.getItem('nextKey')
      .then((key) =>
      this.setState({'key': JSON.parse(key)})) 
    }
    catch(error) {
      console.log("error _getNextKey: ", error);  
    }
  }

  _getNextId = async() => {
    try {
      const id = await AsyncStorage.getItem('nextId')
      .then((id) =>
      this.setState({'id': JSON.parse(id)})) 
    }
    catch(error) {
      console.log("error _getNextId: ", error);  
    }
  }

  _saveLatestKey = async() => {
    try {
      await AsyncStorage.setItem('latestKey', JSON.stringify(this.state.key));
    }
    catch(error) {
      console.log("error _saveLatestKey: ", error);
    }  
  }

  _submit = async() => {
    try {

      await this._getNextKey();
      await this._getNextId();
      console.log("1 this.state.key, id: ", this.state.key, this.state.id);

      const inputs = [
        {"id": this.state.id, "analysis": "date", "result": this.state.date},
        {"id": this.state.id+1, "analysis": "kolesterol",
        "result": this.state.kolesterol},
        {"id": this.state.id+2, "analysis": "LDL_kolesterol",
        "result": this.state.LDL_kolesterol},
        {"id": this.state.id+3, "analysis": "HDL_kolesterol",
        "result": this.state.HDL_kolesterol},
        {"id": this.state.id+4, "analysis": "triglycerider",
        "result": this.state.triglycerider},
        {"id": this.state.id+5, "analysis": "apolipoproteiner",
        "result": this.state.apolipoproteiner},
        {"id": this.state.id+6, "analysis": "bloodpressure",
        "result": this.state.bloodpressure},
        {"id": this.state.id+7, "analysis": "HbA1c_bloodsugar",
        "result": this.state.HbA1c_bloodsugar},
        {"id": this.state.id+8, "analysis": "waist", "result": this.state.waist}
      ]
        console.log("2 inputs: ", inputs);
        console.log("3 key and id: ", this.state.key, this.state.id);

      await this._saveInputs(this.state.key.toString(), JSON.stringify(inputs));
      await this._saveLatestKey();

      const nextKey = (this.state.key + 1);
      console.log("4 nextKey: ", nextKey);
      const nextId = (this.state.id += 9);
      console.log("4 nextId: ", nextId);
      await this._saveNextKey(nextKey)
      await this._saveNextId(nextId)
      .then(() =>
        this.setState({
          key: null,
          id: null,
          date: "",
          kolesterol: "",
          LDL_kolesterol: "",
          HDL_kolesterol: "",
          triglycerider: "",
          apolipoproteiner: "",
          bloodpressure: "",
          HbA1c_bloodsugar: "",
          waist: "",
        }));
      console.log("5 key and id: ", this.state.key, this.state.id);
    } catch(error) {
        console.log("error _submit: ", error);  
    }
  }

  _displayData = async() => {
    try {
        const keys = await AsyncStorage.getAllKeys()
        if (keys.length<1) {
          console.log("keys empty");
        }
        let filtered = [];
        const keyNrarray = [];
        let keysSorted = [];
        const values = [];
        const keyArray = [];
        const remove = ["nextKey", "latestKey"]

        filtered = keys.filter(
          function(value) {
            return this.indexOf(value) < 0;
          },
          remove
        );

        //filtered = keys.filter(function(value) {
          //return value != "nextKey";  
        //});
        console.log("filtered: ", filtered);

        keysSorted = filtered.sort(function(a, b){return a-b});
        console.log("keysSorted: ", keysSorted);

        keyNrArray = filtered.map(Number);
        console.log("keyNrArray: ", keyNrArray);

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
          values.push(value);
          //console.log("value: ", value);  
          //keyNrArray = keysSortedArray.map(Number);
          //console.log("keyNrArray: ", keyNrArray);
        });
        });
        //const latestKey = keyNrArray.slice(-1)[0];
        const latestKey = await AsyncStorage.getItem('latestKey');
        console.log("latestKey: ", latestKey);
        console.log("values: ", values);

        const latestValues = await AsyncStorage.getItem(latestKey.toString());
        //console.log("latest values: ", latestValues);
        console.log("latest parsed values: ", JSON.parse(latestValues));

        const dataSource = [JSON.parse(latestValues)];
        console.log("dataSource: ", dataSource);
        //console.log("values[5]: ", values[5].kolesterol);
    }

    catch(error) {
      console.log("error _displayData: ", error);  
    }
  }

  _removeData = async() => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      if (keys.length === 0) {
        console.log("Keys to remove empty");  
      }
      console.log("Keys to remove: ", keys);
      await AsyncStorage.multiRemove(keys);
    }
    catch(error) {
      alert(error);
    } 
  }

  render() {
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.header}>-Input values-</Text>
            <Text style = {{fontSize: 16, fontWeight: 'bold', color: '#fff',
              marginBottom: 30}}>
              Swipe up to see all inputfields
            </Text>
          </View>
          <View style={styles.middleContainer}>
            <TextInput
              style={styles.textInput}
              placeholder='yyyymmdd'
              placeholderTextColor='#ced0ce'
              value={this.state.date}
              //onEndEditing={this._submit}
              returnKeyType='next'
              underlineColorAndroid='#ced0ce'
              blurOnSubmit={ false }
              onSubmitEditing={
                () => this.focusNextField('kolesterol')}
              onChangeText={
                (date) => this.setState({date})}
              ref={
               (input) => this.inputs['yyyymmdd'] = input}
            />

            <TextInput
              style={styles.textInput}
              placeholder='kolesterol'
              placeholderTextColor='#ced0ce'
              value={this.state.kolesterol}
              //onEndEditing={this._submit}
              returnKeyType='next'
              //underlineColorAndroid='transparent'
              underlineColorAndroid='#ced0ce'
              blurOnSubmit={ false }
              onSubmitEditing={
                () => this.focusNextField('LDL-kolesterol')}
              onChangeText={
                (kolesterol) => this.setState({kolesterol})}
              ref={
                (input) => this.inputs['kolesterol'] = input}
            />

            <TextInput
              style={styles.textInput}
              placeholder='LDL-kolesterol'
              placeholderTextColor='#ced0ce'
              value={this.state.LDL_kolesterol}
              //onEndEditing={this._submit}
              returnKeyType='next'
              //underlineColorAndroid='transparent'
              underlineColorAndroid='#ced0ce'
              blurOnSubmit={ false }
              onSubmitEditing={
                () => this.focusNextField('HDL-kolesterol')}
              onChangeText={
                (LDL_kolesterol) => this.setState({LDL_kolesterol})}
              ref={
                (input) => this.inputs['LDL-kolesterol'] = input}
            />

            <TextInput
              style={styles.textInput}
              placeholder='HDL-kolesterol'
              placeholderTextColor='#ced0ce'
              value={this.state.HDL_kolesterol}
              //onEndEditing={this._submit}
              returnKeyType='next'
              //underlineColorAndroid='transparent'
              underlineColorAndroid='#ced0ce'
              blurOnSubmit={ false }
              onSubmitEditing={
                () => this.focusNextField('triglycerider')}
              onChangeText={
                (HDL_kolesterol) => this.setState({HDL_kolesterol})}
              ref={
                (input) => this.inputs['HDL-kolesterol'] = input}
            />

            <TextInput
              style={styles.textInput}
              placeholder='triglycerider'
              placeholderTextColor='#ced0ce'
              value={this.state.triglycerider}
              //onEndEditing={this._submit}
              returnKeyType='next'
              //underlineColorAndroid='transparent'
              underlineColorAndroid='#ced0ce'
              blurOnSubmit={ false }
              onSubmitEditing={
                () => this.focusNextField('apolipoproteiner')}
              onChangeText={
                (triglycerider) => this.setState({triglycerider})}
              ref={
                (input) => this.inputs['triglycerider'] = input}
            />

            <TextInput
              style={styles.textInput}
              placeholder='apolipoproteiner'
              placeholderTextColor='#ced0ce'
              value={this.state.apolipoproteiner}
              //onEndEditing={this._submit}
              returnKeyType='next'
              //underlineColorAndroid='transparent'
              underlineColorAndroid='#ced0ce'
              blurOnSubmit={ false }
              onSubmitEditing={
                () => this.focusNextField('bloodpressure')}
              onChangeText={
                (apolipoproteiner) => this.setState({apolipoproteiner})}
              ref={
                (input) => this.inputs['apolipoproteiner'] = input}
            />

            <TextInput
              style={styles.textInput}
              placeholder='bloodpressure'
              placeholderTextColor='#ced0ce'
              value={this.state.bloodpressure}
              //onEndEditing={this._submit}
              returnKeyType='next'
              //underlineColorAndroid='transparent'
              underlineColorAndroid='#ced0ce'
              blurOnSubmit={ false }
              onSubmitEditing={
                () => this.focusNextField('HbA1c-bloodsugar')}
              onChangeText={
                (bloodpressure) => this.setState({bloodpressure})}
              ref={
                (input) => this.inputs['bloodpressure'] = input}
            />

            <TextInput
              style={styles.textInput}
              placeholder='HbA1c-bloodsugar'
              placeholderTextColor='#ced0ce'
              value={this.state.HbA1c_bloodsugar}
              //onEndEditing={this._submit}
              returnKeyType='next'
              //underlineColorAndroid='transparent'
              underlineColorAndroid='#ced0ce'
              blurOnSubmit={ false }
              onSubmitEditing={
                () => this.focusNextField('waist')}
              onChangeText={
                (HbA1c_bloodsugar) => this.setState({HbA1c_bloodsugar})}
              ref={
                (input) => this.inputs['HbA1c-bloodsugar'] = input}
            />

            <TextInput
              style={styles.textInput}
              placeholder='waist'
              placeholderTextColor='#ced0ce'
              value={this.state.waist}
              //onEndEditing={this._submit}
              returnKeyType='done'
              //underlineColorAndroid='transparent'
              underlineColorAndroid='#ced0ce'
              blurOnSubmit={ true }
              onChangeText={
                (waist) => this.setState({waist})}
              ref={
                (input) => this.inputs['waist'] = input}
            />

            <TouchableOpacity
              style={styles.btn}
              onPress={this._submit}>
              <Text>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={this._displayData}>
              <Text>Display stored data</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={this._removeData}>
              <Text>Remove stored data</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 30,
    //alignItems: 'stretch',
    //backgroundColor: '#fdfdfd',
  },
  contentContainer: {
    //flex: 1,
    //paddingVertical: 20,
    alignItems: 'stretch',
    //justifyContent: 'center',
    //backgroundColor: '#2896d3',
    //backgroundColor: '#990000',
    backgroundColor: '#fdfdfd',
    //paddingLeft: 40,
    //paddingRight: 40,    
  },
  topContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    //marginBottom: 20,
    //borderBottomWidth: 1,
    //borderBottomColor: '#990000',
  },
  middleContainer: {
    flex:4,  
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    color: '#fdfdfd',
    fontWeight: 'bold',    
  },
  textInput: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: '#fdfdfd',
    //width: 200,
    //borderRadius: 10,
  },
  textInputTest: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fdfdfd',
    //width: 200,
    //borderRadius: 10,
  },
  btn: {
    flex: 1,
    //alignSelf: 'stretch',
    //backgroundColor: '#01c853',  
    backgroundColor: '#008000',  
    padding: 10,
    alignItems: 'center',
    marginBottom: 30,
    width: 200,
    borderRadius: 10,
  },
});
