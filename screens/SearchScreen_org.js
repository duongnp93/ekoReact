import React,{Component} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions,TextInput,Picker } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Checkbox from 'react-native-modest-checkbox'
import logo from '../images/a1765.png';
import dropDownLogo from '../images/a1491.png';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import { Linking } from 'expo';
import GLOBALS from '../Globals';
  var sWidth = Dimensions.get('window').width;
  var sHeight = Dimensions.get('window').height;
  var logoWidth = sWidth*80/100;
  var logoHeight = logoWidth*377/504;
  var logoTop = sHeight*7/100;
  var logoLeft = sWidth*12/100;
  var textLeft = sWidth*8/100;
  var textInputWidth = sWidth*84/100;
  var textInputWidthHalf = textInputWidth/2;
  var textInputWidthThird = textInputWidth/3;
  var toiawaseBot = sHeight*14/100-50;
  
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  
export default class SearchScreen extends Component {  

  constructor(props) {
    super(props)
    this.state = {
      filter_drug_name:"",
      filter_price_lower:"",
      filter_price_upper:"",
      filter_quantity_lower:"",
      filter_quantity_upper:"",
      filter_expiration_lower_y:"",
      filter_expiration_lower_m:"",
      filter_expiration_upper_y:"",
      filter_expiration_upper_m:"",
      
    };
  }

  render(){
  const { navigate } = this.props.navigation;
  
  return (
    <View style={styles.container}>
{/*
      <Text style={styles.loginID}>薬品名</Text> 
      <TextInput id="loginId" editable={true} style={styles.textInput}
      ></TextInput> 

*/}
      <Text style={styles.loginID}>薬品名</Text> 
      <TextInput id="loginId" editable={true} style={styles.textInput}
        onChangeText = {(value)=> this.setState({filter_drug_name:value})}
      >{this.state.filter_drug_name}</TextInput> 
         
      <Text style={styles.loginPwd}>販売価格</Text> 
      <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
        <TextInput id="loginId" editable={true} style={styles.textInputHalfLeft} keyboardType='numeric' textAlign='right'
          onChangeText = {(value)=> this.setState({filter_price_lower:value})}
        >{this.state.filter_price_lower}</TextInput> 
        
        <Text style={styles.textOneString}>～</Text> 
        
        <TextInput id="loginId" editable={true} style={styles.textInputHalfRight} keyboardType='numeric' textAlign='right'
          onChangeText = {(value)=> this.setState({filter_price_upper:value})}
        >{this.state.filter_price_upper}</TextInput> 
        
        <Text style={styles.textOneString}>円</Text> 
      
      </View>
      
      <Text style={styles.loginPwd}>個数</Text> 
      <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
        <TextInput id="loginId" editable={true} style={styles.textInputHalfLeft} keyboardType='numeric' textAlign='right'
          onChangeText = {(value)=> this.setState({filter_quantity_lower:value})}
        >{this.state.filter_quantity_lower}</TextInput> 
        
        <Text style={styles.textOneString}>～</Text> 
        <TextInput id="loginId" editable={true} style={styles.textInputHalfRight} keyboardType='numeric' textAlign='right'
          onChangeText = {(value)=> this.setState({filter_quantity_upper:value})}
        >{this.state.filter_quantity_upper}</TextInput> 
        
        <Text style={styles.textOneString}>個</Text> 
      </View>      
      
      <Text style={styles.loginPwd}>使用期限</Text> 
      <View style={{ flexDirection: 'row'}}>
        {/*
        <TextInput id="loginId" editable={true} style={styles.textInputOneThird} keyboardType='numeric' textAlign='right' maxLength={4}
          onChangeText = {(value)=> this.setState({filter_expiration_lower_y:value})}
        >{this.state.filter_expiration_lower_y}</TextInput> 
        */}
          <View 
            style={{ flexDirection: 'row'}}
            //style = {styles.dropDownStyleYear}
          >
          <Picker
            style={styles.dropDownStyleYear}
            itemStyle={{ color: 'blue' }}
            selectedValue={this.state.filter_expiration_lower_y}
            mode="dropdown"
            onValueChange={(value) => {
              this.setState({ filter_expiration_lower_y: value });
            }}
          >
            <Picker.Item label={ (year).toString() } value={ year } />
            <Picker.Item label={ (year+1).toString() } value={ year+1 } />
            <Picker.Item label={ (year+2).toString() } value={ year+2 } />
            <Picker.Item label={ (year+3).toString() } value={ year+3 } />
            <Picker.Item label={ (year+4).toString() } value={ year+4 } />
          </Picker>
        </View>
        <Image source = {dropDownLogo} style={styles.dropDownLogoStyleYear}/>  
        <Text style={styles.textOneString}>年</Text> 
        
        {/*
        <TextInput id="loginId" editable={true} style={styles.textInputTwoThirds} keyboardType='numeric' textAlign='right' maxLength={2}
          onChangeText = {(value)=> this.setState({filter_expiration_lower_m:value})}
        >{this.state.filter_expiration_lower_m}</TextInput> 
        */}
          <View 
            style={{ flexDirection: 'row'}}
            //style = {styles.dropDownStyleMonth}
          >
          <Picker
            style={styles.dropDownStyleMonth}
            itemStyle={styles.dropDownItemStyle}
            selectedValue={this.state.filter_expiration_lower_m}
            mode="dropdown"
            onValueChange={(value) => {
              this.setState({ filter_expiration_lower_m: value });
            }}
          >
            <Picker.Item label= "  1" value={ 1 } />
            <Picker.Item label= "  2" value={ 2 } />
            <Picker.Item label= "  3" value={ 3 } />
            <Picker.Item label= "  4" value={ 4 } />
            <Picker.Item label= "  5" value={ 5 } />
            <Picker.Item label= "  6" value={ 6 } />
            <Picker.Item label= "  7" value={ 7 } />
            <Picker.Item label= "  8" value={ 8 } />
            <Picker.Item label= "  9" value={ 9 } />
            <Picker.Item label= " 10" value={ 10 } />
            <Picker.Item label= " 11" value={ 11 } />
            <Picker.Item label= " 12" value={ 12 } />

          </Picker>
        </View>
        <Image source = {dropDownLogo} style={styles.dropDownLogoStyleMonth}/> 
        <Text style={styles.textOneString}>月</Text> 
        
      </View>
      
      <Text style={styles.loginPwd}>～</Text> 
      
      <View style={{ flexDirection: 'row'}}>
        {/*
        <TextInput id="loginId" editable={true} style={styles.textInputOneThird} keyboardType='numeric' textAlign='right' maxLength={4}
          onChangeText = {(value)=> this.setState({filter_expiration_upper_y:value})}
        >{this.state.filter_expiration_upper_y}</TextInput> 
        */}
          <View 
            style={{ flexDirection: 'row'}}
            //style = {styles.dropDownStyleYear}
          >
          <Picker
            style={styles.dropDownStyleYear}
            itemStyle={{ color: 'blue' }}
            selectedValue={this.state.filter_expiration_upper_y}
            mode="dropdown"
            onValueChange={(value) => {
              this.setState({ filter_expiration_upper_y: value });
            }}
          >
            <Picker.Item label={ (year).toString() } value={ year } />
            <Picker.Item label={ (year+1).toString() } value={ year+1 } />
            <Picker.Item label={ (year+2).toString() } value={ year+2 } />
            <Picker.Item label={ (year+3).toString() } value={ year+3 } />
            <Picker.Item label={ (year+4).toString() } value={ year+4 } />
          </Picker>
        </View>
        
        <Image source = {dropDownLogo} style={styles.dropDownLogoStyleYear}/>   
        <Text style={styles.textOneString}>年</Text> 
        
        {/*
        <TextInput id="loginId" editable={true} style={styles.textInputTwoThirds} keyboardType='numeric' textAlign='right' maxLength={2}
          onChangeText = {(value)=> this.setState({filter_expiration_upper_m:value})}
        >{this.state.filter_expiration_upper_m}</TextInput>
        */}
        
          <View 
            style={{ flexDirection: 'row'}}
            //style = {styles.dropDownStyleMonth}
          >
          <Picker
            style={styles.dropDownStyleMonth}
            itemStyle={styles.dropDownItemStyle}
            selectedValue={this.state.filter_expiration_upper_m}
            mode="dropdown"
            onValueChange={(value) => {
              this.setState({ filter_expiration_upper_m: value });
            }}
          >
            <Picker.Item label= "  1" value={ 1 } />
            <Picker.Item label= "  2" value={ 2 } />
            <Picker.Item label= "  3" value={ 3 } />
            <Picker.Item label= "  4" value={ 4 } />
            <Picker.Item label= "  5" value={ 5 } />
            <Picker.Item label= "  6" value={ 6 } />
            <Picker.Item label= "  7" value={ 7 } />
            <Picker.Item label= "  8" value={ 8 } />
            <Picker.Item label= "  9" value={ 9 } />
            <Picker.Item label= " 10" value={ 10 } />
            <Picker.Item label= " 11" value={ 11 } />
            <Picker.Item label= " 12" value={ 12 } />

          </Picker>
        </View>
        
        <Image source = {dropDownLogo} style={styles.dropDownLogoStyleMonth}/> 
        
        <Text style={styles.textOneString}>月</Text>  
         
      </View>
      
      <TouchableOpacity  
        onPress = {()=> navigate('SearchList',{filter:this.state})}      
        style={styles.loginButton}>
        <Text style={styles.loginBtnText}>検索する</Text>
      </TouchableOpacity>                             
    </View>
  );
  }
  
  onPressLogin(){
  	
  	
  	
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#FFF8E8',   
  },
  loginLogo: {
    marginTop:logoTop,
    marginLeft:logoLeft,
    width:logoWidth,
    height:logoHeight
  },
  loginID: {
    marginLeft:textLeft,
    marginTop:30,
  },
  loginPwd: {
    marginLeft:textLeft,
    marginTop:10,
  },
  textInput: {
    marginTop:5,
    marginLeft:textLeft,
    paddingLeft:10,
    paddingRight:10,
    width:textInputWidth,
    height:40,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',    
  },
  textInputHalfLeft: {
    marginTop:5,
    marginLeft:0,
    paddingLeft:10,
    paddingRight:10,
    width:textInputWidthHalf - 30,
    height:40,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',    
  },
  textInputHalfRight: {
    marginTop:5,
    marginLeft:0,
    paddingLeft:10,
    paddingRight:10,
    width:textInputWidthHalf - 30,
    height:40,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',    
  },
  textInputOneThird:{
    marginTop:5,
    marginLeft:0,
    paddingLeft:10,
    paddingRight:10,
    width:textInputWidthThird + 10,
    height:40,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',    
  },
  textInputTwoThirds:{
    marginTop:5,
    marginLeft:15,
    paddingLeft:10,
    paddingRight:10,
    width:textInputWidthThird - 20,
    height:40,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',    
  },
  textInputThreeThirds:{
    marginTop:5,
    marginLeft:15,
    paddingLeft:10,
    paddingRight:10,
    width:textInputWidthThird - 20,
    height:40,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',    
  },
  
  
  loginButton: {
    marginTop: 20,
    marginLeft: textLeft,
    borderRadius:5,
    backgroundColor: '#00AD52',
    width:textInputWidth,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 20,
  },
  checkbox: {
    width: 25,
    height: 25,    
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width:sWidth,    
    justifyContent: 'center',
  },
  toiawaseBtn:{
    marginTop:toiawaseBot,
    justifyContent: 'center',
    width:sWidth, 
    alignItems: 'center',
    flexDirection: 'row',    
  },
  toiawaseText: {
    color: '#000',
    fontSize: 17,
  },
  textOneString: {
  	color: '#000',
  	marginTop:15,
  	marginLeft:10,
  	width: 20,
    alignItems: 'center',
  },
  dropDownStyleYear:{
    marginTop:5,
    marginLeft:textLeft,
    paddingLeft:0,
    paddingRight:0,
    //paddingBottom:10,
    width:textInputWidthThird,
    height:40,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',
    justifyContent: 'center',

  },
  dropDownStyleMonth:{
    marginTop:5,
    marginLeft:0,
    paddingLeft:0,
    paddingRight:0,
    //paddingBottom:10,
    width:textInputWidthThird - 20,
    height:40,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',
    justifyContent: 'center',

  },
  dropDownLogoStyleYear:{
    height:15,
    width:8,
    transform: [{ rotate: '90deg' }],
    backgroundColor: '#fff',
    position: "absolute",
    marginTop:17,
    left: textLeft + textInputWidthThird - 20,
  },
  dropDownLogoStyleMonth:{
    height:15,
    width:8,
    transform: [{ rotate: '90deg' }],
    backgroundColor: '#fff',
    position: "absolute",
    marginTop:17,
    left: textLeft + textInputWidthThird + 30 + textInputWidthThird - 20 - 20,
  },

});
