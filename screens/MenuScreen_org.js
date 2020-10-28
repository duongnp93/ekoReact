import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions,TextInput } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Checkbox from 'react-native-modest-checkbox'
import logo from '../images/a1765.png';
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
export default function MenuScreen() {
  
    state = {
    inputValue: "You can change me!",
    inputValue2: "変更できるとおもっただろう"
  };
  


  _handleTextChange = inputValue => {
    this.setState({ inputValue2 });
  };
  
  
  return (

    <View style={styles.container}>      
      <Text id="testword" style={styles.loginPwd}>こちらはメニュー画面</Text>
      <Text style={styles.loginPwd}>HELP!HELP!HELP!HELP!</Text>
      <Text style={styles.loginPwd}>{GLOBALS.ID}</Text>
      <Text style={styles.loginPwd}>{GLOBALS.PW}</Text>
      
      <TextInput
       defaultValue={this.state.inputValue}
       onCahngeText={this._handleTextChange}
       style={styles.textInput}
       editable={true}
      />
      
      {/* 
      <Text style={styles.loginId}>document.getElementById("loginId").value </Text>
      <Text style={styles.loginPwd}>document.getElementById("loginPw").value</Text>
      */}
    </View>
  );
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
