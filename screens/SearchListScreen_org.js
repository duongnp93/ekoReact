import React,{Component} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions,TextInput,ScrollView } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Checkbox from 'react-native-modest-checkbox'
import logo from '../images/a1765.png';
import test_Asetanoru from '../images/アセタノール100.jpg';

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
  
export default class SearchListScreen extends Component {  
  constructor(props) {
    super(props)
    this.state = {
      calcPrice:0,
    }
  }
  
  
  render(){
  const { navigate } = this.props.navigation;
  
  return (
    <View style={styles.container}>
      <ScrollView>
        
            <Text style={styles.textInPanel,{textAlign:'right', marginTop:10 ,marginRight:textLeft}}>{this.state.detailCount}件</Text>
            

            <View style={{ flexDirection: 'column', alignItems: 'center'}}>

              
              { /* タップ可能リスト */ }
              <TouchableOpacity  
                onPress = {()=> navigate('SearchDetail')}
                style={styles.panelDrugInList}>
              
                <View style={styles.panelDrugInListPhoto}>
                  <Image source = {test_Asetanoru} style={styles.logoDrugInListPhoto} />
                </View>
                
                <View style={styles.panelDrugInListDescription}>
                  <Text style={{marginLeft:10,textAlign:'left'}}>アセタノールカプセル100</Text>
                  <Text style={{marginRight:10,textAlign:'right',color:'red'}}>20,000</Text>
                  <Text style={{marginLeft:10,textAlign:'left'}}>10個</Text>
                  <Text style={{marginLeft:10,textAlign:'left'}}>2020年5月31日</Text>
                </View>
              
              </TouchableOpacity>
              
              <TouchableOpacity  
                onPress = {()=> navigate('SearchDetail')}
                style={styles.panelDrugInList}>
              
                <View style={styles.panelDrugInListPhoto}>
                </View>
                
                <View style={styles.panelDrugInListDescription}>
                  <Text style={{marginLeft:10,textAlign:'left'}}>アセタノールカプセル100</Text>
                  <Text style={{marginRight:10,textAlign:'right',color:'red'}}>20,000</Text>
                  <Text style={{marginLeft:10,textAlign:'left'}}>10個</Text>
                  <Text style={{marginLeft:10,textAlign:'left'}}>2020年5月31日</Text>
                </View>
              
              </TouchableOpacity>
              
              <TouchableOpacity  
                onPress = {()=> navigate('SearchDetail')}
                style={styles.panelDrugInList}>
              
                <View style={styles.panelDrugInListPhoto}>
                </View>
                
                <View style={styles.panelDrugInListDescription}>
                  <Text style={{marginLeft:10,textAlign:'left'}}>アセタノールカプセル100</Text>
                  <Text style={{marginRight:10,textAlign:'right',color:'red'}}>20,000</Text>
                  <Text style={{marginLeft:10,textAlign:'left'}}>10個</Text>
                  <Text style={{marginLeft:10,textAlign:'left'}}>2020年5月31日</Text>
                </View>
              
              </TouchableOpacity>
              
              <TouchableOpacity  
                onPress = {()=> navigate('SearchDetail')}
                style={styles.panelDrugInList}>
              
                <View style={styles.panelDrugInListPhoto}>
                </View>
                
                <View style={styles.panelDrugInListDescription}>
                  <Text style={{marginLeft:10,textAlign:'left'}}>アセタノールカプセル100</Text>
                  <Text style={{marginRight:10,textAlign:'right',color:'red'}}>20,000</Text>
                  <Text style={{marginLeft:10,textAlign:'left'}}>10個</Text>
                  <Text style={{marginLeft:10,textAlign:'left'}}>2020年5月31日</Text>
                </View>
              
              </TouchableOpacity>
              
              <TouchableOpacity  
                onPress = {()=> navigate('SearchDetail')}
                style={styles.panelDrugInList}>
              
                <View style={styles.panelDrugInListPhoto}>
                </View>
                
                <View style={styles.panelDrugInListDescription}>
                  <Text style={{marginLeft:10,textAlign:'left'}}>アセタノールカプセル100</Text>
                  <Text style={{marginRight:10,textAlign:'right',color:'red'}}>20,000</Text>
                  <Text style={{marginLeft:10,textAlign:'left'}}>10個</Text>
                  <Text style={{marginLeft:10,textAlign:'left'}}>2020年5月31日</Text>
                </View>
              
              </TouchableOpacity>
              
            </View>
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
  },
  textInPanel:{
    marginTop:5,
    marginLeft:10,
    textAlign:'left',
  },
   textInPanelRedPanel:{
    marginTop:5,
    marginRight:10,
    textAlign:'right',
    color:'red',
    
  },
  textRight:{
    marginRight:logoLeft,
    marginTop:30,
    textAlign: 'right' 
  
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
  textOneString: {
  	color: '#000',
  	marginTop:15,
  	marginLeft:10,
  	width: 20,
    alignItems: 'center',
  },
    panelDrugInList:{
    height:100,
    width:textInputWidth,
    marginTop:10,
    marginRight:0,
    backgroundColor: '#FAFAFA',
    borderWidth:1,
    borderColor:'#d6d7da',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  panelDrugInListPhoto:{
    height: 100,
    width: textInputWidth / 100 * 45 ,
    borderWidth:1,
    borderColor:'#d6d7da',
    backgroundColor: '#FFF',
  
  },
  panelDrugInListDescription:{
    height: 100,
    width: textInputWidth / 100 * 55 ,
    borderWidth:1,
    borderColor:'#d6d7da',
    flexDirection: 'column',
    justifyContent: 'center',
    
  },
  logoDrugInListPhoto:{
    height:100-2,
    width:textInputWidth / 100 * 45,
  }
});
