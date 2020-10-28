import React,{Component} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions,TextInput,ScrollView,FlatList } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Checkbox from 'react-native-modest-checkbox'
import axios from 'axios';
import logo from '../images/a1765.png';
import test_Asetanoru from '../images/アセタノール100.jpg';
import dropDownLogo from '../images/a1491.png';
import dealtLogo from '../images/dealted.png';
import entryLogo from '../images/middle_entry.png'
import canseledLogo from '../images/canseled.png'

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
  var textInputMargin = sWidth*16/100;
  var textInputWidth = sWidth*84/100;
  var textInputWidthHalf = textInputWidth/2;
  var textInputWidthThird = textInputWidth/3;
  var toiawaseBot = sHeight*14/100-50;
  var panelLeft = 20;
  var serverUrl=require('./server_url.js')
  
export default class SearchDetailScreen extends React.Component {  

  componentDidMount(){
    console.log('did_mount_start');
    this.GetMyEntryList();
    this.GetMyPurchasedList();
    console.log('did_mount_end');
  }
  
  
  GetMyEntryList(){
    console.log('GetMyEntryList_start');
  
    var url = serverUrl + 'GetMyEntryList';
    axios.post(url,{
      filter_member_id: 1,
    })
    .then((MyEntryData) => {
      //console.log(MyEntryData.data);
      this.setState({
        entry_data: MyEntryData.data,
        entry_filter_data: MyEntryData.data,
      })
    });
  }
  
  GetMyPurchasedList(){
    console.log('GetMyPurchasedList_start');
    
    var url = serverUrl + 'GetMyPurchasedList';
    axios.post(url,{
      filter_member_id: 1,
    })
    .then((MyPurchasedData) => {
      //console.log(MyPurchasedData.data);
      this.setState({
        purchased_data: MyPurchasedData.data,
      })
    });
  }
  
  
  constructor(props) {
    super(props)
    this.state = {
      pageSwitch:0,
      detailSwitch:0,
      detailCount:5,
      entry_data:[],
      entry_filter_data:[],
      purchased_data:[],
      current_data:[],
      
      checkedEntry:true,
      checkedDealt:true,
      checkedCanceled:true,
      
      // 出品情報の種類別管理 未取引、取引済み、取消
      stateDetailPage:0,          // 0:未取引 1:取引済み 2:取消
      colorDetailPanel:'#C2FFC2', // 未取引:緑 取引済み:赤 取消:灰
      enableDetailInput:0,  // 0:編集不可 1:編集可
    }
  }
  
  
  checkEntry = (value) => {
    var c = this.state.checkedEntry ? false : true;

    var array = [];
    
    if ( !this.state.checkedEntry ) 
    {
      array.push(...this.state.entry_data.filter(item => (item.is_canceled === 0 && item.is_dealt === 0)));
      
    }
    if ( this.state.checkedDealt ) 
    {
      array.push(...this.state.entry_data.filter(item => (item.is_canceled === 0 && item.is_dealt === 1)));
      
    }
    if ( this.state.checkedCanceled ) 
    {
      array.push(...this.state.entry_data.filter(item => (item.is_canceled === 1)));
      
    }
    
    var comparator = (a, b) => {
      // 使用期限:年でソート
      if(a.expiration_year < b.expiration_year) return -1;
      if(a.expiration_year > b.expiration_year) return  1;
      
      // 使用期限:月でソート
      if(a.expiration_month < b.expiration_month) return -1;
      if(a.expiration_month > b.expiration_month) return  1;
      
      return 0;
    };
    
    array.sort(comparator);
    
    this.setState({
      checkedEntry:c,
      entry_filter_data:array,
    })
    
  }

  checkDealt = (value) => {
    var c = this.state.checkedDealt ? false : true;

    var array = [];
    
    if ( this.state.checkedEntry ) 
    {
      array.push(...this.state.entry_data.filter(item => (item.is_canceled === 0 && item.is_dealt === 0)));
      
    }
    if ( !this.state.checkedDealt ) 
    {
      array.push(...this.state.entry_data.filter(item => (item.is_canceled === 0 && item.is_dealt === 1)));
      
    }
    if ( this.state.checkedCanceled ) 
    {
      array.push(...this.state.entry_data.filter(item => (item.is_canceled === 1)));
      
    }

    var comparator = (a, b) => {
      // 使用期限:年でソート
      if(a.expiration_year < b.expiration_year) return -1;
      if(a.expiration_year > b.expiration_year) return  1;
      
      // 使用期限:月でソート
      if(a.expiration_month < b.expiration_month) return -1;
      if(a.expiration_month > b.expiration_month) return  1;
      
      return 0;
    };
    
    array.sort(comparator);

    
    this.setState({
      checkedDealt:c,
      entry_filter_data:array,
    })

  }

  checkCanceled = (value) => {
    var c = this.state.checkedCanceled ? false : true;

    var array = [];
    
    if ( this.state.checkedEntry ) 
    {
      array.push(...this.state.entry_data.filter(item => (item.is_canceled === 0 && item.is_dealt === 0)));
      
    }
    if ( this.state.checkedDealt ) 
    {
      array.push(...this.state.entry_data.filter(item => (item.is_canceled === 0 && item.is_dealt === 1)));
      
    }
    if ( !this.state.checkedCanceled ) 
    {
      array.push(...this.state.entry_data.filter(item => (item.is_canceled === 1)));
      
    }

    var comparator = (a, b) => {
      // 使用期限:年でソート
      if(a.expiration_year < b.expiration_year) return -1;
      if(a.expiration_year > b.expiration_year) return  1;
      
      // 使用期限:月でソート
      if(a.expiration_month < b.expiration_month) return -1;
      if(a.expiration_month > b.expiration_month) return  1;
      
      return 0;
    };
    
    array.sort(comparator);

    
    this.setState({
      checkedCanceled:c,
      entry_filter_data:array,
    })

  }


  


  onPressPageSelector = (value) => {
    this.setState({
      pageSwitch: value,
      detailSwitch: 0
    })
    
  }
  
  onPressListPanel = (value) => {
    this.setState({
      detailSwitch: value
    })
    
  }
  
  render(){
    const { navigate } = this.props.navigation;
    
    // 出品薬品 一覧
    if(this.state.pageSwitch == 0 && this.state.detailSwitch == 0)
    {
      return (
        <View style={styles.container}>
            
            { /* スイッチセレクター */ }
            <View style marginLeft={textLeft} marginRight={textLeft} marginTop={10} height={40}>
              <SwitchSelector
                initial={this.state.pageSwitch}
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
            
            
            <View style={{ flexDirection: 'row',justifyContent: 'center'}}>
            <Checkbox
              label='出品中'
              checkboxStyle={styles.checkbox}
              containerStyle = {styles.checkboxContainerOneThird}         
              checkedImage={require('../images/a1766.png')} 
              uncheckedImage={require('../images/a2534.png')}
              checked = {this.state.checkedEntry}
              onChange={(checked) => this.checkEntry()}
            />
            <Checkbox
              label='落札'
              checkboxStyle={styles.checkbox}
              containerStyle = {styles.checkboxContainerOneThird}         
              checkedImage={require('../images/a1766.png')} 
              uncheckedImage={require('../images/a2534.png')}
              checked = {this.state.checkedDealt}
              onChange={(checked) => this.checkDealt()}
            />
            <Checkbox
              label='取消'
              checkboxStyle={styles.checkbox}
              containerStyle = {styles.checkboxContainerOneThird}         
              checkedImage={require('../images/a1766.png')} 
              uncheckedImage={require('../images/a2534.png')}
              checked = {this.state.checkedCanceled}
              onChange={(checked) => this.checkCanceled()}
            />
            </View>
            
            <View style={styles.container}>
            <Text style={styles.textInPanel,{textAlign:'right', marginTop:10 ,marginRight:textLeft}}>{this.state.entry_data.length} 件</Text>
            
            { /* タップ可能リスト */ }
            <FlatList
              //data={this.state.entry_data}
              data={this.state.entry_filter_data}
              renderItem={this.getItem}
              style={{ marginTop: 10,marginBottom:10 }}
            />
            
            </View>

            {/*
            <TouchableOpacity  
              onPress = {()=> navigate('Home')}      
              style={styles.loginButtonLast}>
              <Text style={styles.loginBtnText}>ホーム画面へ</Text>
            </TouchableOpacity>
            */}
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
                initial={this.state.pageSwitch}
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
        
            { /* <Text style={styles.textInPanel}>{this.state.pageSwitch}{this.state.detailSwitch}</Text> */ }
            
            {
              this.state.stateDetailPage === 0 &&
                <View style={{  flexDirection: 'row',}}>
                  <Image source={entryLogo} style={styles.imageEntryLogo} resizeMode='stretch' />

                  {/* 修正ボタン */}
                  {/*
                  <TouchableOpacity  
                    onPress = {()=> this.setState({detailSwitch:0})}       
                    style={styles.loginButtonHalfLeft}
                  >
                    <Text style={styles.loginBtnText}>修正</Text>

                  </TouchableOpacity>
                  */}
                  
                  {/* 取消ボタン */}
                  {/*
                  <TouchableOpacity  
                    onPress = {()=> this.setState({detailSwitch:0})}       
                    style={styles.loginButtonHalfRight}>
                    <Text style={styles.loginBtnText}>取消</Text>
                  </TouchableOpacity>
                  */}
                </View>
                
                
            }
            {
              this.state.stateDetailPage === 1 &&
                <View style={{  flexDirection: 'row',}}>
                  <Image source={dealtLogo} style={styles.imageDealtLogo} resizeMode='stretch' />
                </View>  
            }
            {
              this.state.stateDetailPage === 2 &&
                <View style={{  flexDirection: 'row',}}>
                  <Image source={canseledLogo} style={styles.imageCanselLogo} resizeMode='stretch' />
                </View>  
            }
            
            <View style={styles.panelDetailRowFirst} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>薬品名</Text>
              {
                this.state.stateDetailPage === 0 ?
                  <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.current_data.drug_name}</TextInput>
                  :
                  <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.current_data.drug_name}</TextInput>
              }
              <Text style={styles.textInputInPanelJan}>JAN/{this.state.current_data.drug_code_jan}</Text> 
              
            </View>
      
            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>販売価格</Text> 
              {
                this.state.stateDetailPage === 0 ?
                  <TextInput id="loginId" editable={true} style={styles.textInputInPanelPrice}>{this.state.current_data.price}</TextInput>
                  :
                  <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}>{this.state.current_data.price}</TextInput>
              }
              <Text style={styles.textOneStringPrice}>円</Text> 
            </View>
            
            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>売掛率</Text> 
              {
                this.state.stateDetailPage === 0 ?
                  <TextInput id="loginId" editable={true} style={styles.textInputInPanelPrice}>{this.state.current_data.ratio}</TextInput>
                  :
                  <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}>{this.state.current_data.ratio}</TextInput>
              }
              <Text style={styles.textOneStringPrice}>%</Text> 
            </View>
                
            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>個数</Text> 
              {
                this.state.stateDetailPage === 0 ?
                  <TextInput id="loginId" editable={true} style={styles.textInputInPanelPrice}>{this.state.current_data.quantity}</TextInput>
                  :
                  <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}>{this.state.current_data.quantity}</TextInput>
              }
              <Text style={styles.textOneStringPrice}>個</Text> 
            </View>

            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>使用期限</Text> 
              {
                this.state.stateDetailPage === 0 ?
                  <TextInput id="loginId" editable={true} style={styles.textInputInPanel}>{this.state.current_data.expiration_year}年{this.state.current_data.expiration_month}月</TextInput>
                  :
                  <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.current_data.expiration_year}年{this.state.current_data.expiration_month}月</TextInput>
              }
              
            </View>

            <View style={styles.panelDetailRow3} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>備考</Text> 
              {
                this.state.stateDetailPage === 0 ?
                  <TextInput multiline blurOnSubmit={true} id="loginId" editable={true} style={styles.textInputInPanel3}>{this.state.current_data.note}</TextInput>
                  :
                  <TextInput multiline blurOnSubmit={false} id="loginId" editable={true} style={styles.textInputInPanel3}>{this.state.current_data.note}</TextInput>
              }

            </View>
            
            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>出品No</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>0000001</TextInput>
            </View>
            
            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>出品日</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>2020年2月1日</TextInput>
            </View>
            
            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>落札日</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>2020年5月18日</TextInput>
            </View>
      
            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>落札者</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}></TextInput>
            </View>

            <View style={styles.panelDetailRow3} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>住所</Text> 
              <TextInput multiline blurOnSubmit={false} id="loginId" editable={false} style={styles.textInputInPanel3}></TextInput>
            </View>

            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>電話番号</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}></TextInput>
            </View>
        
            <View style={{  flexDirection: 'row'}}>
              <Text style={styles.textLeft}>画像</Text> 
              <Text style={styles.textRight}>[JANコード、ロット番号、使用期限等]</Text>       
            </View>
            
            <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            <View style={styles.panelPhotoLeft}>
              <Image source={{uri: this.state.current_data.image_1}} style={styles.imageDrugPhoto} resizeMode='stretch' />

            </View>
            <View style={styles.panelPhotoRight}>
              <Image source={{uri: this.state.current_data.image_2}} style={styles.imageDrugPhoto} resizeMode='stretch' />
            </View>
            </View>
        
            <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            <View style={styles.panelPhotoLeft}>
              <Image source={{uri: this.state.current_data.image_3}} style={styles.imageDrugPhoto} resizeMode='stretch' />

            </View>
            <View style={styles.panelPhotoRight}>
              <Image source={{uri: this.state.current_data.image_4}} style={styles.imageDrugPhoto} resizeMode='stretch' />

            </View>
            </View>
        
            <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            <View style={styles.panelPhotoLeft}>
              <Image source={{uri: this.state.current_data.image_5}} style={styles.imageDrugPhoto} resizeMode='stretch' />

            </View>
            <View style={styles.panelPhotoRight}>
              <Image source={{uri: this.state.current_data.image_6}} style={styles.imageDrugPhoto} resizeMode='stretch' />

            </View>
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
            
            { /* スイッチセレクター */ }
            <View style marginLeft={textLeft} marginRight={textLeft} marginTop={10} height={40}>
              <SwitchSelector
                initial={this.state.pageSwitch}
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
        
            <Text style={styles.textInPanel,{textAlign:'right', marginTop:10 ,marginRight:textLeft}}>{this.state.purchased_data.length} 件</Text>
            

            { /* タップ可能リスト */ }
            <FlatList
              data={this.state.purchased_data}
              renderItem={this.getItem}
              style={{ marginTop: 10,marginBottom:10 }}
            />

            {/*
            <TouchableOpacity  
              onPress = {()=> navigate('Home')}     
              style={styles.loginButtonLast}>
              <Text style={styles.loginBtnText}>ホーム画面へ</Text>
            </TouchableOpacity>
            */}
            
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
                initial={this.state.pageSwitch}
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
            
            <View style={styles.panelDetailRowFirst} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>薬品名</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel} >{this.state.current_data.drug_name}</TextInput>
            </View>
      
            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>販売価格</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}>{this.state.current_data.price}</TextInput>
              <Text style={styles.textOneStringPrice}>円</Text> 
            </View>
            
            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>割引率</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}>{100-this.state.current_data.ratio}</TextInput>
              <Text style={styles.textOneStringPrice}>%</Text> 
            </View>
                
            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>個数</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}>{this.state.current_data.quantity}</TextInput>
              <Text style={styles.textOneStringPrice}>個</Text> 
            </View>

            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>使用期限</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.current_data.expiration_year}年{this.state.current_data.expiration_month}月</TextInput>
            </View>

            <View style={styles.panelDetailRow3} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>備考</Text> 
              <TextInput multiline blurOnSubmit={false} id="loginId" editable={false} style={styles.textInputInPanel3}>{this.state.current_data.note}</TextInput>
            </View>
      
            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>出品者</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.current_data.member_name}</TextInput>
            </View>

            <View style={styles.panelDetailRow3} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>住所</Text> 
              <TextInput multiline blurOnSubmit={false} id="loginId" editable={false} style={styles.textInputInPanel3}>{this.state.current_data.member_address}</TextInput>
            </View>

            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>電話番号</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.current_data.member_tel}</TextInput>
            </View>
        
            <View style={{  flexDirection: 'row'}}>
              <Text style={styles.textLeft}>画像</Text> 
              <Text style={styles.textRight}>[JANコード、ロット番号、使用期限等]</Text>       
            </View>

            <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            <View style={styles.panelPhotoLeft}>
              <Image source={{uri: this.state.current_data.image_1}} style={styles.imageDrugPhoto} resizeMode='stretch' />

            </View>
            <View style={styles.panelPhotoRight}>
              <Image source={{uri: this.state.current_data.image_2}} style={styles.imageDrugPhoto} resizeMode='stretch' />
            </View>
            </View>
        
            <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            <View style={styles.panelPhotoLeft}>
              <Image source={{uri: this.state.current_data.image_3}} style={styles.imageDrugPhoto} resizeMode='stretch' />

            </View>
            <View style={styles.panelPhotoRight}>
              <Image source={{uri: this.state.current_data.image_4}} style={styles.imageDrugPhoto} resizeMode='stretch' />

            </View>
            </View>
        
            <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            <View style={styles.panelPhotoLeft}>
              <Image source={{uri: this.state.current_data.image_5}} style={styles.imageDrugPhoto} resizeMode='stretch' />

            </View>
            <View style={styles.panelPhotoRight}>
              <Image source={{uri: this.state.current_data.image_6}} style={styles.imageDrugPhoto} resizeMode='stretch' />

            </View>
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
  }
  
  
  getItem = ({item}) => {
    return(
      <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this.openDetail(item)}>

        <View style={styles.panelDrugInListPhoto}>
          <Image source={{uri: item.image_1}} style={styles.logoDrugInListPhoto}  />
          
          {/*<Image source = {dropDownLogo} style={styles.dealtLogo}/>*/}
          {
            item.is_canceled === 1 ?
              <Text style={styles.canceledLogo}>取{"\n"}消</Text> 
              :
              (item.is_dealt === 1 ?
                <Text style={styles.dealtLogo}>落{"\n"}札</Text>
                :
                <Text style={styles.entryLogo}>出{"\n"}品{"\n"}中</Text>

              )
          }
          
          
        </View>
          
        <View style={styles.panelDrugInListDescription}>
          <Text style={{marginLeft:10,textAlign:'left'}}>{item.drug_name}</Text>
          
          <Text style={{marginRight:10,textAlign:'right',color:'red'}}>{100-item.ratio}%OFF  {item.quantity} 個</Text>

          
          <Text style={{marginRight:10,textAlign:'right'}}>{item.price} 円</Text>
          <Text style={{marginRight:10,textAlign:'right'}}>{item.expiration_year} 年 {item.expiration_month} 月</Text>
        </View>
      </TouchableOpacity>
    );
  }
  
  openDetail = (item)=>{
    this.setState({
      current_data : item,
      detailSwitch : 1,
      pageSwitch : this.state.pageSwitch,
    });
    
    if (item.is_canceled === 1)
    {
      // 取消:灰色
      this.setState({
        //colorDetailPanel : '#CCCCCC',
        colorDetailPanel : '#C2FFC2',
        stateDetailPage : 2,
        enableDetailInput:0,
      });
    }
    else if (item.is_dealt === 1)
    {
      // 取引済み:赤色
      this.setState({
        //colorDetailPanel : '#FF9999',
        colorDetailPanel : '#C2FFC2',
        stateDetailPage : 1,
        enableDetailInput:0,
      });
    }
    else if (item.is_dealt === 0)
    {
      // 未取引:緑色
      this.setState({
        colorDetailPanel : '#C2FFC2',
        stateDetailPage : 0,
        enableDetailInput:1,
      });
    } 
    
    
    console.log(item);
    console.log(this.state.stateDetailPage);
    //this.props.navigation.navigate('SearchDetail',item);
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
  loginButtonHalfLeft: {
    marginTop: 20,
    marginRight: 5,
    //marginLeft:textInputWidth/4,
    borderRadius:5,
    backgroundColor: '#00AD52',
    width:textInputWidth/4,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right:panelLeft+textInputWidth/4,
  },
  loginButtonHalfRight: {
    marginTop: 20,
    //marginLeft:50,
    marginRight:0,
    borderRadius:5,
    backgroundColor: '#00AD52',
    width:textInputWidth/4,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right:panelLeft,
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
  checkboxContainerOneThird: {
    //flexDirection: 'row',
    //alignItems: 'center',
    marginTop: 10,
    width:(sWidth - textLeft*2)/3  - 10,
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
    marginLeft:panelLeft,
    marginRight:panelLeft,
    //backgroundColor: colorDetailPanel,
    flexDirection: 'row',
  },
    panelDetailRow3:{
    height:120,
    marginTop:2,
    marginLeft:panelLeft,
    marginRight:panelLeft,
    //backgroundColor: colorDetailPanel,
    flexDirection: 'row',
  },
  panelDetailRowFirst:{
    height:76,
    marginTop:10,
    marginLeft:panelLeft,
    marginRight:panelLeft,
    //backgroundColor: '#C2FFC2',
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
    marginLeft:textInputMargin/2,
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
  },  
  imageDrugPhoto:{
    height:140-2,
    width:textInputWidthHalf - 5,
  },
  imageDealtLogo:{
    marginTop: 20,
    marginLeft:panelLeft,
    height:50,
    width:textInputWidth/3,
  },
  imageEntryLogo:{
    marginTop: 20,
    marginLeft:panelLeft,
    height:50,
    width:textInputWidth/3,
  },
  imageCanselLogo:{
    marginTop: 20,
    marginLeft:panelLeft,
    height:50,
    width:textInputWidth/3,
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
  dealtLogo:{
    height:56,
    width:20,
    //transform: [{ rotate: '90deg' }],
    backgroundColor: '#FF9999',
    position: "absolute",
    marginTop:0,
    paddingTop:1,
    left: -20,
    top:-1,
    color:'black',
    textAlign: 'center',
    borderWidth:1,
    borderColor:'#d6d7da',
    fontSize:14,
    lineHeight:18,
  },
  canceledLogo:{
    height:56,
    width:20,
    //transform: [{ rotate: '90deg' }],
    backgroundColor: '#CCCCCC',
    position: "absolute",
    marginTop:0,
    paddingTop:1,
    left: -20,
    top:-1,
    color:'black',
    textAlign: 'center',
    borderWidth:1,
    borderColor:'#d6d7da',
    fontSize:14,
    lineHeight:18,
  },
  entryLogo:{
    height:56,
    width:20,
    //transform: [{ rotate: '90deg' }],
    backgroundColor: '#C2FFC2',
    position: "absolute",
    marginTop:0,
    paddingTop:1,
    left: -20,
    top:-1,
    color:'black',
    textAlign: 'center',
    borderWidth:1,
    borderColor:'#d6d7da',
    fontSize:14,
    lineHeight:18,
  },
});
