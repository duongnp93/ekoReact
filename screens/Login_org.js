import React,{Component} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions,TextInput } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Checkbox from 'react-native-modest-checkbox'
import logo from '../images/a1765.png';

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
  var toiawaseBot = sHeight*14/100-50;
  
var SEASONS = {
        SPRING : 1,
        SUMMER : 2,
        AUTUMN : 3,
        WINTER : 4
    };
    var season;
    season = SEASONS.SUMMER;
  
  
export default class LoginScreen extends Component {  
  render(){
  const { navigate } = this.props.navigation;
  
  return (
    <View style={styles.container}>
      <Image source = {logo} style={styles.loginLogo}/>    
      <Text style={styles.loginID}>ログインID</Text> 
      <TextInput id="loginId" editable={true} maxLength={10} style={styles.textInput}>{season}</TextInput> 
      <Text style={styles.loginPwd}>パスワード</Text> 
      <TextInput id="loginPw" editable={true} style={styles.textInput}></TextInput> 
      <TouchableOpacity  
        onPress = {()=> navigate('Home')}
        style={styles.loginButton}>
        <Text style={styles.loginBtnText}>ログイン</Text>
      </TouchableOpacity>   
      <Checkbox
          label='パスワードを保存する'
          checkboxStyle={styles.checkbox}
          containerStyle = {styles.checkboxContainer}         
          checkedImage={require('../images/a1766.png')} 
          uncheckedImage={require('../images/a2534.png')}
          onChange={(checked) => console.log(checked)}
        />   
      <TouchableOpacity  
        onPress = {()=>Linking.openURL('https://rasis-soft.co.jp/')}
        style={styles.toiawaseBtn}>
        <Text style={styles.toiawaseText}>お問い合わせはこちら</Text>
        <Image style={{width:10,height:18,marginLeft: 5}} source = {require('../images/a1491.png')}/>
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
});
