// □ホーム画面
import React,{Component} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions,TextInput ,BackHandler} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Checkbox from 'react-native-modest-checkbox'
import logo from '../images/a1765.png';

import {createSwitchNavigator, createAppContainer,NavigationEvents} from 'react-navigation';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import { Linking } from 'expo';
//import GLOBALS from '../Globals';
  var sWidth = Dimensions.get('window').width;
  var sHeight = Dimensions.get('window').height;
  var logoWidth = sWidth*80/100;
  var logoHeight = logoWidth*377/504;
  var logoTop = sHeight*7/100;
  var logoLeft = sWidth*12/100;
  var textLeft = sWidth*8/100;
  var textInputWidth = sWidth*84/100;
  var toiawaseBot = sHeight*14/100-50;

  
export default class HomeScreen extends Component { 

  constructor(props){
    super(props)
    this.state = {
      login_info: this.props.navigation.state.params.login_info,
    };
  }
  
  componentDidMount(){
  }


  
  render(){
  const { navigate } = this.props.navigation;
  
  return (
    <View style={styles.container}>
      {/* 画面遷移した時にcomponentDidMount()を踏ませる */}
      <NavigationEvents
        onDidFocus={payload => this.componentDidMount()}
      />
            
      <Text style={styles.textMenu}>メニューからお選びください</Text> 
      <TouchableOpacity  
        onPress = {()=> navigate('Search',{login_info:this.state.login_info})}      
        style={styles.menuButton}>
        <Text style={styles.loginBtnText}>検索</Text>
      </TouchableOpacity>
      <TouchableOpacity  
        // onPress = {()=> navigate('EntryDrug')}      
        // ↓画面遷移用のフラグ
        onPress = {()=> navigate('EntryDrug',{registration_type:0,login_info:this.state.login_info})}      
        style={styles.menuButton}>
        <Text style={styles.loginBtnText}>登録</Text>
      </TouchableOpacity>   
      <TouchableOpacity  
        //onPress = {()=> navigate('MyPage')}
        onPress = {()=> navigate('MyPageList', {login_info:this.state.login_info})}      
        style={styles.menuButton}>
        <Text style={styles.loginBtnText}>マイページ</Text>
      </TouchableOpacity>   
      <Text style={styles.textMenu}>お知らせ</Text> 
      <TextInput id="infomation" editable={false} style={styles.infomation}>デモ版を実装中です</TextInput> 
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
  // loginLogo: {
  //   marginTop:logoTop,
  //   marginLeft:logoLeft,
  //   width:logoWidth,
  //   height:logoHeight
  // },
  // loginID: {
  //   marginLeft:textLeft,
  //   marginTop:30,
  // },
  // loginPwd: {
  //   marginLeft:textLeft,
  //   marginTop:10,
  // },
  textMenu:{
    marginLeft:textLeft,
    marginTop:20,
  },
  // textInput: {
  //   marginTop:5,
  //   marginLeft:textLeft,
  //   paddingLeft:10,
  //   paddingRight:10,
  //   width:textInputWidth,
  //   height:40,
  //   backgroundColor: '#fff',
  //   borderRadius:5,
  //   borderWidth:1,
  //   borderColor:'#d6d7da',    
  // },
  // loginButton: {
  //   marginTop: 20,
  //   marginLeft: textLeft,
  //   borderRadius:5,
  //   backgroundColor: '#00AD52',
  //   width:textInputWidth,
  //   height:50,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },  
  menuButton: {
    marginTop: 10,
    marginLeft: textLeft,
    borderRadius:5,
    backgroundColor: '#00AD52',
    width:textInputWidth,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnText: {
    // ボタン内text
    color: '#fff',
    fontSize: 20,
  },
  // checkbox: {
  //   width: 25,
  //   height: 25,    
  // },
  // checkboxContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginTop: 10,
  //   width:sWidth,    
  //   justifyContent: 'center',
  // },
  // toiawaseBtn:{
  //   marginTop:toiawaseBot,
  //   justifyContent: 'center',
  //   width:sWidth, 
  //   alignItems: 'center',
  //   flexDirection: 'row',    
  // },
  // toiawaseText: {
  //   color: '#000',
  //   fontSize: 17,
  // },
  infomation:{
    // お知らせ
    marginTop:5,
    marginLeft:textLeft,
    paddingTop:5,
    paddingLeft:10,
    paddingRight:10,
    width:textInputWidth,
    height:300,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',
    textAlignVertical: 'top'
  }
});
