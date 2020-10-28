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

import SwitchSelector from 'react-native-switch-selector';

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
  
export default class SearchDetailScreen extends React.Component {  
  constructor(props) {
    super(props)
    this.state = {
      pageSwitch:0,
      detailSwitch:0,
      detailCount:5,
      entry_data:[],
      purchased_data:[],
      current_data:[],
    }
  }
  
    
  onPressPageSelector = (value) => {
    this.setState({
      pageSwitch: value,
      detailSwitch: 0
    })
    
    this.refs.scrollView.scrollTo(0)
  }
  
  onPressListPanel = (value) => {
    this.setState({
      detailSwitch: value
    })
    
    this.refs.scrollView.scrollTo(0)
  }
  
  render(){
    const { navigate } = this.props.navigation;
    
    // 出品薬品 一覧
    if(this.state.pageSwitch == 0 && this.state.detailSwitch == 0)
    {
      return (
        <View style={styles.container}>
          <ScrollView ref="scrollView">
            
            { /* スイッチセレクター */ }
            <View style marginLeft={textLeft} marginRight={textLeft} marginTop={10} height={40}>
              <SwitchSelector
                initial={0}
                onPress={value => this.setState({pageSwitch:value, detailSwitch:0})}
                textColor='#00AD52'
                selectedColor='white'
                buttonColor='#00AD52'
                borderColor='#00AD52'
                animationDuration = {0}
                options={[
                  { label: '出品薬品', value: '0' },
                  { label: '購入薬品', value: '1' }
                ]}
              />
            </View>
        
            <Text style={styles.textInPanel,{textAlign:'right', marginTop:10 ,marginRight:textLeft}}>{this.state.pageSwitch}{this.state.detailSwitch}</Text>
            

            <View style={{ flexDirection: 'column', alignItems: 'center'}}>

              
              { /* タップ可能リスト */ }
              <TouchableOpacity  
                onPress = {()=> this.setState({detailSwitch:1})}       
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
                onPress = {()=> this.setState({detailSwitch:1})}    
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
                onPress = {()=> this.setState({detailSwitch:1})}     
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
                onPress = {()=> this.setState({detailSwitch:1})}     
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
                onPress = {()=> this.setState({detailSwitch:1})}    
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
            


            <TouchableOpacity  
              onPress = {()=> navigate('Home')}      
              style={styles.loginButtonLast}>
              <Text style={styles.loginBtnText}>ホーム画面へ</Text>
            </TouchableOpacity>
        
          </ScrollView>
        </View>
      );
    }
    // 出品薬品 詳細
    else if( this.state.pageSwitch == 0 && this.state.detailSwitch == 1)
    {
      return (
        <View style={styles.container}>
          <ScrollView>
            
            { /* スイッチセレクター */ }
            <View style marginLeft={textLeft} marginRight={textLeft} marginTop={10} height={40}>
              <SwitchSelector
                initial={0}
                onPress={value => this.setState({pageSwitch:value, detailSwitch:0})}
                textColor='#00AD52'
                selectedColor='white'
                buttonColor='#00AD52'
                borderColor='#00AD52'
                animationDuration = {100}
                options={[
                  { label: '出品薬品', value: '0' },
                  { label: '購入薬品', value: '1' }
                ]}
              />
            </View>
        
            { /* <Text style={styles.textInPanel}>{this.state.pageSwitch}{this.state.detailSwitch}</Text> */ }
            
            
            <View style={styles.panelDetailRowFirst}>
              <Text style={styles.textInPanel}>薬品名</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}></TextInput>
            </View>
      
            <View style={styles.panelDetailRow}>
              <Text style={styles.textInPanel}>販売価格</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}></TextInput>
              <Text style={styles.textOneStringPrice}>円</Text> 
            </View>
                
            <View style={styles.panelDetailRow}>
              <Text style={styles.textInPanel}>個数</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}></TextInput>
              <Text style={styles.textOneStringPrice}>個</Text> 
            </View>

            <View style={styles.panelDetailRow}>
              <Text style={styles.textInPanel}>使用期限</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}></TextInput>
            </View>

            <View style={styles.panelDetailRow3}>
              <Text style={styles.textInPanel}>備考</Text> 
              <TextInput multiline blurOnSubmit={false} id="loginId" editable={false} style={styles.textInputInPanel3}></TextInput>
            </View>
      
            <View style={styles.panelDetailRow}>
              <Text style={styles.textInPanel}></Text> 
              <TextInput id="loginId" editable={false}落札者 style={styles.textInputInPanel}></TextInput>
            </View>

            <View style={styles.panelDetailRow3}>
              <Text style={styles.textInPanel}>住所</Text> 
              <TextInput multiline blurOnSubmit={false} id="loginId" editable={false} style={styles.textInputInPanel3}></TextInput>
            </View>

            <View style={styles.panelDetailRow}>
              <Text style={styles.textInPanel}>電話番号</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}></TextInput>
            </View>
        
            <View style={{  flexDirection: 'row'}}>
              <Text style={styles.textLeft}>画像</Text> 
              <Text style={styles.textRight}>[JANコード、ロット番号、使用期限等]</Text>       
            </View>
      

      
            <TouchableOpacity  
              onPress = {()=> this.setState({detailSwitch:0})}       
              style={styles.loginButtonLast}>
              <Text style={styles.loginBtnText}>リスト画面へ</Text>
            </TouchableOpacity>
            
            
            
          </ScrollView>
        </View>
      );            
    }
    // 購入薬品 一覧
    else if( this.state.pageSwitch == 1 && this.state.detailSwitch == 0 ){
      return (
        <View style={styles.container}>
          <ScrollView>
            
            { /* スイッチセレクター */ }
            <View style marginLeft={textLeft} marginRight={textLeft} marginTop={10} height={40}>
              <SwitchSelector
                initial={0}
                onPress={value => this.setState({pageSwitch:value, detailSwitch:0})}
                textColor='#00AD52'
                selectedColor='white'
                buttonColor='#00AD52'
                borderColor='#00AD52'
                animationDuration = {100}
                options={[
                  { label: '出品薬品', value: '0' },
                  { label: '購入薬品', value: '1' }
                ]}
              />
            </View>
        
            <Text style={styles.textInPanel,{textAlign:'right', marginTop:10 ,marginRight:textLeft}}>{this.state.pageSwitch}{this.state.detailSwitch}</Text>
            

            <View style={{ flexDirection: 'column', alignItems: 'center'}}>

              
              { /* タップ可能リスト */ }
              <TouchableOpacity  
                onPress = {()=> this.setState({detailSwitch:1})}       
                style={styles.panelDrugInList}>
              
                <View style={styles.panelDrugInListPhoto}>
                </View>
                
                <View style={styles.panelDrugInListDescription}>
                  <Text style={{marginLeft:10,textAlign:'left'}}>アセタノールカプセル99</Text>
                  <Text style={{marginRight:10,textAlign:'right',color:'red'}}>20,000</Text>
                  <Text style={{marginLeft:10,textAlign:'left'}}>10個</Text>
                  <Text style={{marginLeft:10,textAlign:'left'}}>2020年5月31日</Text>
                </View>
              
              </TouchableOpacity>
              
              <TouchableOpacity  
                onPress = {()=> this.setState({detailSwitch:1})}    
                style={styles.panelDrugInList}>
              
                <View style={styles.panelDrugInListPhoto}>
                </View>
                
                <View style={styles.panelDrugInListDescription}>
                  <Text style={{marginLeft:10,textAlign:'left'}}>アセタノールカプセル99</Text>
                  <Text style={{marginRight:10,textAlign:'right',color:'red'}}>20,000</Text>
                  <Text style={{marginLeft:10,textAlign:'left'}}>10個</Text>
                  <Text style={{marginLeft:10,textAlign:'left'}}>2020年5月31日</Text>
                </View>
              
              </TouchableOpacity>
              
              <TouchableOpacity  
                onPress = {()=> this.setState({detailSwitch:1})}     
                style={styles.panelDrugInList}>
              
                <View style={styles.panelDrugInListPhoto}>
                </View>
                
                <View style={styles.panelDrugInListDescription}>
                  <Text style={{marginLeft:10,textAlign:'left'}}>アセタノールカプセル99</Text>
                  <Text style={{marginRight:10,textAlign:'right',color:'red'}}>20,000</Text>
                  <Text style={{marginLeft:10,textAlign:'left'}}>10個</Text>
                  <Text style={{marginLeft:10,textAlign:'left'}}>2020年5月31日</Text>
                </View>
              
              </TouchableOpacity>
              
              <TouchableOpacity  
                onPress = {()=> this.setState({detailSwitch:1})}     
                style={styles.panelDrugInList}>
              
                <View style={styles.panelDrugInListPhoto}>
                </View>
                
                <View style={styles.panelDrugInListDescription}>
                  <Text style={{marginLeft:10,textAlign:'left'}}>アセタノールカプセル99</Text>
                  <Text style={{marginRight:10,textAlign:'right',color:'red'}}>20,000</Text>
                  <Text style={{marginLeft:10,textAlign:'left'}}>10個</Text>
                  <Text style={{marginLeft:10,textAlign:'left'}}>2020年5月31日</Text>
                </View>
              
              </TouchableOpacity>
              

              
            </View>
            


            <TouchableOpacity  
              onPress = {()=> navigate('Home')}      
              style={styles.loginButtonLast}>
              <Text style={styles.loginBtnText}>ホーム画面へ</Text>
            </TouchableOpacity>
        
          </ScrollView>
        </View>
      );
    }
    // 購入薬品 詳細
    else if( this.state.pageSwitch == 1 && this.state.detailSwitch == 1 ){
      return (
        <View style={styles.container}>
          <ScrollView>
            
            { /* スイッチセレクター */ }
            <View style marginLeft={textLeft} marginRight={textLeft} marginTop={10} height={40}>
              <SwitchSelector
                initial={0}
                onPress={value => this.setState({pageSwitch:value, detailSwitch:0})}
                textColor='#00AD52'
                selectedColor='white'
                buttonColor='#00AD52'
                borderColor='#00AD52'
                animationDuration = {100}
                options={[
                  { label: '出品薬品', value: '0' },
                  { label: '購入薬品', value: '1' }
                ]}
              />
            </View>
            
            <View style={styles.panelDetailRowFirst}>
              <Text style={styles.textInPanel}>薬品名</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}></TextInput>
            </View>
      
            <View style={styles.panelDetailRow}>
              <Text style={styles.textInPanel}>販売価格</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}></TextInput>
              <Text style={styles.textOneStringPrice}>円</Text> 
            </View>
                
            <View style={styles.panelDetailRow}>
              <Text style={styles.textInPanel}>個数</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}></TextInput>
              <Text style={styles.textOneStringPrice}>個</Text> 
            </View>

            <View style={styles.panelDetailRow}>
              <Text style={styles.textInPanel}>使用期限</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}></TextInput>
            </View>

            <View style={styles.panelDetailRow3}>
              <Text style={styles.textInPanel}>備考</Text> 
              <TextInput multiline blurOnSubmit={false} id="loginId" editable={false} style={styles.textInputInPanel3}></TextInput>
            </View>
      
            <View style={styles.panelDetailRow}>
              <Text style={styles.textInPanel}>出品者</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}></TextInput>
            </View>

            <View style={styles.panelDetailRow3}>
              <Text style={styles.textInPanel}>住所</Text> 
              <TextInput multiline blurOnSubmit={false} id="loginId" editable={false} style={styles.textInputInPanel3}></TextInput>
            </View>

            <View style={styles.panelDetailRow}>
              <Text style={styles.textInPanel}>電話番号</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}></TextInput>
            </View>
        
            <View style={{  flexDirection: 'row'}}>
              <Text style={styles.textLeft}>画像</Text> 
              <Text style={styles.textRight}>[JANコード、ロット番号、使用期限等]</Text>       
            </View>

            <TouchableOpacity  
              onPress = {()=> this.setState({detailSwitch:1})}   
              style={styles.loginButtonLast}>
              <Text style={styles.loginBtnText}>リスト画面へ</Text>
            </TouchableOpacity>
            
            
            
          </ScrollView>
        </View>            
      );  
    }
  
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
    height:60,
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
    marginRight:3,
    backgroundColor: '#FAFAFA',
    borderWidth:1,
    borderColor:'#d6d7da',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    
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
