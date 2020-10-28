import React,{Component} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity,ScrollView, View, Dimensions,TextInput, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Checkbox from 'react-native-modest-checkbox'
import logo from '../images/a1765.png';
import axios from 'axios';

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
  var serverUrl=require('./server_url.js')
  
export default class LoginScreen extends Component {  
  /******** コンストラクタ ********/
  constructor(props) {
    super(props)
    this.state = {
      loginid : "",
      password : "",
      login_info:[],
    };
  }
  /******** 外部処理 ********/
  /* ログインID、パスワード確認処理 */
  GetLoginUser(loginid, password){
    var url = serverUrl + 'GetLoginUser';
    console.log("認証スタート")
    axios.get(url, {params: {loginid: loginid, password:password}})
    .then((result_data => {
      this.setState({
        login_info: result_data.data,
      })
      console.log("login_sql_result");
      console.log(this.state.login_info);
      
      if(this.state.login_info.length != 0){
        // ログイン認証：正常
        this.screenTransitions()
      }
      else{
        // ログイン認証：エラー
        this.loginErrorAlert()
      }
    }))
  }

  /******** 内部処理 ********/
  /* ログイン機能 */
  login(loginid, password){
    // 入力チェック結果格納変数(true:正常 false:エラー)
    var input_check_result = true
    /* ログイン入力チェック */
    input_check_result = this.requiredCheck(loginid, password)
    console.log("必須チェックstart")
    if(!input_check_result){
      this.requiredErrorAlert()
      return
    }
    console.log("必須チェックend")
    this.GetLoginUser(loginid, password)

  }

  /* 入力チェック */
  requiredCheck(loginid, password){
    var check_result = true

    // ログインID
    if(loginid == ""){
      check_result = false
    }

    // パスワード
    if(password == ""){
      check_result = false
    }

    return check_result;
  }
  /* 画面遷移 */
  screenTransitions(){
    this.props.navigation.navigate('Home',{login_info:this.state.login_info[0]});
  }
  /******** render ********/
  render(){
  const { navigate } = this.props.navigation;
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source = {logo} style={styles.loginLogo}/>    
        <Text style={styles.loginID}>ログインID</Text> 
        <TextInput id="loginId" editable={true} maxLength={10} onChangeText = {(value)=> this.setState({loginid:value})} 
          style={styles.textInput} keyboardType={'visible-password'} ></TextInput> 
        <Text style={styles.loginPwd}>パスワード</Text>
        <TextInput id="loginPw" editable={true} style={styles.textInput} maxLength={10} secureTextEntry={true}
          onChangeText = {(value)=> this.setState({password:value})}></TextInput> 
        <TouchableOpacity  
          onPress = {()=> this.login(this.state.loginid, this.state.password)}      
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
      </ScrollView>
    </View>
  );
  }
  
  /******** 画面表示処理 ********/
  // ログイン認証エラー表示
  loginErrorAlert(){
    Alert.alert(
      'ログインエラー',
      'ログインID、パスワードが不正です。'
    );
  }
  // 入力チェックエラー表示
  requiredErrorAlert(){
    Alert.alert(
      'ログインエラー',
      'ログインID、パスワードが入力されていません。'
    );
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
    height:logoHeight,
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
