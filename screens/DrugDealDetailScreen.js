import React,{Component} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions,TextInput,ScrollView,BackHandler } from 'react-native';
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
  var textInputWidthHalf = textInputWidth/2;
  var textInputWidthThird = textInputWidth/3;
  var toiawaseBot = sHeight*14/100-50;
  
export default class SearchDetailScreen extends Component {  

  componentWillMount() {
    // バックボタンを無効化
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  
  componentWillUnmount(){
    // バックボタンを有効化
    this.backHandler.remove();
  }
  /* バック処理無効化設定 */
  handleBackButton() {
    return true;    // true: prevent the back action.
  }

  constructor(props){
    super(props)
    this.state = {
      data_detail:this.props.navigation.state.params.data_detail,
      login_info:this.props.navigation.state.params.login_info,
    };
  }

  render(){
  const { navigate } = this.props.navigation;
  console.log("購入完了"+this.state.login_info.name)
  return (
    <View style={styles.container}>
    <ScrollView>
        <Text style={styles.textInPanel}>購入完了しました</Text> 

      
        <View style={styles.panelDetailRowFirst}>
          <Text style={styles.textInPanel}>薬品名</Text> 
          <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.data_detail.drug_name}</TextInput>
          <Text style={styles.textInputInPanelJan}>YJ/{this.state.data_detail.drug_code_yj}</Text> 
        </View>
      
        <View style={styles.panelDetailRow}>
          <Text style={styles.textInPanel}>販売価格</Text> 
          <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}>{this.state.data_detail.price}</TextInput>
          <Text style={styles.textOneStringPrice}>円</Text> 
        </View>
                
        <View style={styles.panelDetailRow}>
          <Text style={styles.textInPanel}>個数</Text> 
          <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}>{this.state.data_detail.quantity}</TextInput>
          <Text style={styles.textOneStringPrice}>個</Text> 
        </View>

        <View style={styles.panelDetailRow}>
          <Text style={styles.textInPanel}>使用期限</Text> 
          <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.data_detail.expiration_year}年{this.state.data_detail.expiration_month}月</TextInput>
        </View>

        <View style={styles.panelDetailRow3}>
          <Text style={styles.textInPanel}>備考</Text> 
          <TextInput multiline blurOnSubmit={false} id="loginId" editable={false} style={styles.textInputInPanel3}>{this.state.data_detail.note}</TextInput>
        </View>
      
        <View style={styles.panelDetailRow}>
          <Text style={styles.textInPanel}>出品者</Text> 
          <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.data_detail.member_name}</TextInput>
        </View>

        <View style={styles.panelDetailRow3}>
          <Text style={styles.textInPanel}>住所</Text> 
          <TextInput multiline blurOnSubmit={false} id="loginId" editable={false} style={styles.textInputInPanel3}>{this.state.data_detail.member_address}</TextInput>
        </View>

        <View style={styles.panelDetailRow}>
          <Text style={styles.textInPanel}>電話番号</Text> 
          <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.data_detail.member_tel}</TextInput>
        </View>
        
        <View style={{  flexDirection: 'row'}}>
          <Text style={styles.textLeft}>画像</Text> 
          <Text style={styles.textRight}>[JANコード、ロット番号、使用期限等]</Text>       
        </View>
      
          <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            <View style={styles.panelPhotoLeft}>
              <Image source={{uri: this.state.data_detail.image_1}} style={styles.imageDrugPhoto} resizeMode='stretch' />

            </View>
            <View style={styles.panelPhotoRight}>
              <Image source={{uri: this.state.data_detail.image_2}} style={styles.imageDrugPhoto} resizeMode='stretch' />
            </View>
          </View>
        
          <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            <View style={styles.panelPhotoLeft}>
              <Image source={{uri: this.state.data_detail.image_3}} style={styles.imageDrugPhoto} resizeMode='stretch' />

            </View>
            <View style={styles.panelPhotoRight}>
              <Image source={{uri: this.state.data_detail.image_4}} style={styles.imageDrugPhoto} resizeMode='stretch' />

            </View>
          </View>
        
          <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            <View style={styles.panelPhotoLeft}>
              <Image source={{uri: this.state.data_detail.image_5}} style={styles.imageDrugPhoto} resizeMode='stretch' />

            </View>
            <View style={styles.panelPhotoRight}>
              <Image source={{uri: this.state.data_detail.image_6}} style={styles.imageDrugPhoto} resizeMode='stretch' />

            </View>
          </View>
      
        <TouchableOpacity  
          onPress = {()=> navigate('Home',{login_info:this.state.login_info})}      
          style={styles.loginButtonLast}>
          <Text style={styles.loginBtnText}>ホーム画面へ</Text>
        </TouchableOpacity>
      
    </ScrollView>
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
  detailContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
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
  textInputInPanel:{
    marginTop:10,
    marginLeft:10,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
    width:textInputWidthThird*2 + 20,
    height:40,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',
    position: 'absolute',
    right: 10
  },
  textInputInPanelJan:{
    marginTop:53,
    marginLeft:10,
    paddingTop:0,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
    width:textInputWidthThird*2 + 20,
    height:40,
    position: 'absolute',
    right: 10
  },
  textInputInPanel3:{
    marginTop:10,
    marginLeft:10,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
    width:textInputWidthThird*2 + 20,
    height:100,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',
    position: 'absolute',
    right: 10,
    textAlignVertical: 'top',
  },
  textInputInPanelPrice:{
    marginTop:10,
    marginLeft:10,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
    width:textInputWidthThird*2 - 5,
    height:40,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',
    position: 'absolute',
    right: 35,
    color:'red',
    textAlign : 'right',
  },
  textInPanel:{
    marginTop:20,
    marginLeft:10,
    textAlign:'left',
  },
  
  textLeft:{
    marginLeft:textLeft,
    marginTop:10,
    textAlign: 'left' 
  },
  textRight:{
    marginRight:textLeft,
    marginTop:10,
    position: 'absolute',
    right: 0
  },  
  textOneString: {
  	color: '#000',
  	marginTop:15,
  	marginLeft:10,
  	width: 20,
    alignItems: 'center',
  },
  textOneStringPrice: {
  	color: '#000',
  	marginTop:20,
  	marginLeft:0,
  	width: 20,
    alignItems: 'center',
    position: 'absolute',
    right: 10,
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
  loginButtonLast: {
    marginTop: 20,
    marginBottom: 20,
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
  
  panelDetailRow:{
    height:60,
    marginTop:2,
    marginLeft:20,
    marginRight:20,
    backgroundColor: '#C2FFC2',
    flexDirection: 'row',
  },
    panelDetailRow3:{
    height:120,
    marginTop:2,
    marginLeft:20,
    marginRight:20,
    backgroundColor: '#C2FFC2',
    flexDirection: 'row',
  },
  panelDetailRowFirst:{
    height:76,
    marginTop:15,
    marginLeft:20,
    marginRight:20,
    backgroundColor: '#C2FFC2',
    flexDirection: 'row',
  },
  panelPhoto:{
    height:140,
    width:textInputWidthHalf - 5,
    marginTop:10,
    marginRight:0,
    backgroundColor: '#FAFAFA',
    borderWidth:1,
    borderColor:'#d6d7da',
    alignItems: 'center',
  }, 
  panelPhotoLeft:{
    height:140,
    width:textInputWidthHalf - 3,
    marginTop:5,
    marginLeft:3,
    borderWidth:1,
    borderColor:'#d6d7da',
    backgroundColor: '#FAFAFA',

    
  },
  panelPhotoRight:{
    height:140,
    width:textInputWidthHalf - 3,
    marginTop:5,
    marginLeft:3,
    backgroundColor: '#FAFAFA',
    borderWidth:1,
    borderColor:'#d6d7da',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  imageDrugPhoto:{
    height:140-2,
    width:textInputWidthHalf - 5,
  },
});
