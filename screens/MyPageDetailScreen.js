// □マイページー薬品詳細画面
import React,{Component} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Alert, Dimensions,TextInput,ScrollView,Modal } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Checkbox from 'react-native-modest-checkbox'
import ImageZoom from 'react-native-image-pan-zoom';
import axios from 'axios';
import logo from '../images/a1765.png';
import test_Asetanoru from '../images/アセタノール100.jpg';
import dropDownLogo from '../images/a1491.png';
import dealtLogo from '../images/dealted.png';
import entryLogo from '../images/middle_entry.png'
import canseledLogo from '../images/canseled.png'
import closeLogo from '../images/mark_batsu.png';

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
var serverUrl=require('./server_url.js');



export default class MyPageDetailScreen extends React.Component {  

  // SQLリクエスト
  // drugDelete(){
  CancelEntryDrug(){
    console.log('drugDelete_start');
    console.log(this.state.receive_data.item.id);
    
    var url = serverUrl + 'drugDelete';
    axios.post(url,{
      filter_id: this.state.receive_data.item.id,
    })
    .then((result) => {
      //console.log(result);
      //this.setState({
      //  data: EntryData.data,
      //})
    });

    console.log(url);
    console.log('drugDelete_end');

  }

    constructor(props) {
        super(props)
        this.state = {
          detailCount:5,
          entry_data:[],
          entry_filter_data:[],
          purchased_data:[],
          current_data:[],
          checkedEntry:true,
          checkedDealt:true,
          checkedCanceled:true,
          //この中にタッチされた薬品の情報が入っている
          receive_data: {page_selecter: this.props.navigation.state.params.page_selecter,
                          item:this.props.navigation.state.params.item},
          
          login_info: this.props.navigation.state.params.login_info,
          // 出品情報の種類別管理 未取引、取引済み、取消        
          stateDetailPage: 0, //未取引:0 取引済み:1 取消:2
          colorDetailPanel:'#C2FFC2', // 未取引:緑 取引済み:赤 取消:灰
          enableDetailInput:0,  // 0:編集不可 1:編集可
          
          // 画像表示モーダル用
          modalVisible:false,
          currentImage:"",
        }
      }
    
  openModal = ( value ) => {
    console.log(value);
    if ( value == 1 && this.state.receive_data.item.image_1)
    {
      this.setState({
        modalVisible:true,
        currentImage:this.state.receive_data.item.image_1
      });
    }
    else if( value == 2 && this.state.receive_data.item.image_2)
    {
      this.setState({
        modalVisible:true,
        currentImage:this.state.receive_data.item.image_2
      });
    }
    else if( value == 3 && this.state.receive_data.item.image_3)
    {
      this.setState({
        modalVisible:true,
        currentImage:this.state.receive_data.item.image_3
      });
    }
    else if( value == 4 && this.state.receive_data.item.image_4)
    {
      this.setState({
        modalVisible:true,
        currentImage:this.state.receive_data.item.image_4
      });
    }
    else if( value == 5 && this.state.receive_data.item.image_5)
    {
      this.setState({
        modalVisible:true,
        currentImage:this.state.receive_data.item.image_5
      });
    }
    else if( value == 6 && this.state.receive_data.item.image_6)
    {
      this.setState({
        modalVisible:true,
        currentImage:this.state.receive_data.item.image_6
      });
    }
    
  }
  
  

  closeModal() {
    this.setState({modalVisible:false});
  }
    
      

render(){
    const { navigate } = this.props.navigation;
    
    let { image_1,image_2,image_3,image_4,image_5,image_6 } = this.state.receive_data.item;
    
// 出品薬品 詳細
console.log("receive_data start")
console.log(this.state.receive_data);
console.log("receive_data finish")

console.log(this.state.receive_data.page_selecter);
console.log(this.state.receive_data.item.is_canceled);

if(this.state.receive_data.item.is_canceled === 1)
{
  this.state.stateDetailPage = 2
}
else if(this.state.receive_data.item.is_dealt === 1)
{
  this.state.stateDetailPage = 1
}
else if(this.state.receive_data.item.is_dealt === 0)
{
  this.state.stateDetailPage = 0
}

//page_selecterには出品画面なのか購入画面なのかの情報がはいっている。
//0の時は出品画面、1の時は購入画面
if( this.state.receive_data.page_selecter === 0)
{
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{  flexDirection: 'row',}}>
          {/*取消済み、落札済み、出品中で表示する画像を分けて表示 */}
        {
            this.state.receive_data.item.is_canceled === 1?
              <Image source={canseledLogo} style={styles.imageCanselLogo}resizeMode='stretch'/>
              :       
              (this.state.receive_data.item.is_dealt === 0?
                <Image source={entryLogo} style={styles.imageEntryLogo} resizeMode='stretch' />
                :
                <Image source={dealtLogo} style={styles.imageDealtLogo} resizeMode='stretch' />
              )
        }
        {/*todo: 後で修正・取消処理を記述する。*/}
        {
          this.state.receive_data.item.is_dealt === 0&&
          this.state.receive_data.item.is_canceled === 0&&
          
            <TouchableOpacity  
              // onPress = {()=> this.confirmAlert(0)}       
              onPress = {()=> this.editingConfirmAlert()}       
              style={styles.loginButtonHalfLeft}
            >
              <Text style={styles.loginBtnText}>修正</Text>
            </TouchableOpacity>       
        }
        {
          this.state.receive_data.item.is_dealt === 0&&
          this.state.receive_data.item.is_canceled === 0&&
          <TouchableOpacity  
            // onPress = {()=> this.setState({detailSwitch:0})}
            // onPress = {()=> this.confirmAlert(1)}
            onPress = {()=> this.deleteConfirmAlert()}
            style={styles.loginButtonHalfRight}>
            <Text style={styles.loginBtnText}>取消</Text>
          </TouchableOpacity>
        }
        </View>

        <View style={styles.panelDetailRowFirst} backgroundColor={this.state.colorDetailPanel}>
          <Text style={styles.textInPanel}>薬品名</Text>
            {/*出品中の時だけ薬品情報を変更できるように設定*/}
            {
            this.state.stateDetailPage === 0 ?
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.receive_data.item.drug_name}</TextInput>
              :
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.receive_data.item.drug_name}</TextInput>
          }
          <Text style={styles.textInputInPanelJan}>YJ/{this.state.receive_data.item.drug_code_yj}</Text> 
          
        </View>
  
        <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
          <Text style={styles.textInPanel}>販売価格</Text> 
          {
            this.state.stateDetailPage === 0 ?
              <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}>{this.state.receive_data.item.price}</TextInput>
              :
              <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}>{this.state.receive_data.item.price}</TextInput>
          }
          <Text style={styles.textOneStringPrice}>円</Text> 
        </View>
        
        <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
          <Text style={styles.textInPanel}>売掛率</Text> 
          {
            this.state.stateDetailPage === 0 ?
              <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}>{this.state.receive_data.item.ratio}</TextInput>
              :
              <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}>{this.state.receive_data.item.ratio}</TextInput>
          }
          <Text style={styles.textOneStringPrice}>%</Text> 
        </View>
            
        <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
          <Text style={styles.textInPanel}>個数</Text> 
          {
            this.state.stateDetailPage === 0 ?
              <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}>{this.state.receive_data.item.quantity}</TextInput>
              :
              <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}>{this.state.receive_data.item.quantity}</TextInput>
          }
          <Text style={styles.textOneStringPrice}>個</Text> 
        </View>

        <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
          <Text style={styles.textInPanel}>使用期限</Text> 
          {
            this.state.stateDetailPage === 0 ?
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.receive_data.item.expiration_year}年{this.state.receive_data.item.expiration_month}月</TextInput>
              :
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.receive_data.item.expiration_year}年{this.state.receive_data.item.expiration_month}月</TextInput>
          }
          
        </View>

        <View style={styles.panelDetailRow3} backgroundColor={this.state.colorDetailPanel}>
          <Text style={styles.textInPanel}>備考</Text> 
          {
            this.state.stateDetailPage === 0 ?
              <TextInput multiline blurOnSubmit={false} id="loginId" editable={false} style={styles.textInputInPanel3}>{this.state.receive_data.item.note}</TextInput>
              :
              <TextInput multiline blurOnSubmit={false} id="loginId" editable={false} style={styles.textInputInPanel3}>{this.state.receive_data.item.note}</TextInput>
          }

        </View>
        
        <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
          <Text style={styles.textInPanel}>出品No</Text> 
          <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>0000001</TextInput>
        </View>
        
        <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
          <Text style={styles.textInPanel}>出品日</Text> 
          <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.receive_data.item.entry_at}</TextInput>
        </View>
        
        <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
          <Text style={styles.textInPanel}>落札日</Text> 
          <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.receive_data.item.dealt_at}</TextInput>
        </View>
  
        <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
          <Text style={styles.textInPanel}>落札者</Text> 
          <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.receive_data.item.buyer_member_name}</TextInput>
        </View>

        <View style={styles.panelDetailRow3} backgroundColor={this.state.colorDetailPanel}>
          <Text style={styles.textInPanel}>住所</Text> 
          <TextInput multiline blurOnSubmit={false} id="loginId" editable={false} style={styles.textInputInPanel3}>{this.state.receive_data.item.buyer_member_address}</TextInput>
        </View>

        <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
          <Text style={styles.textInPanel}>電話番号</Text> 
          <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.receive_data.item.buyer_member_tel}</TextInput>
        </View>
    
        <View style={{  flexDirection: 'row'}}>
          <Text style={styles.textLeft}>画像</Text> 
          <Text style={styles.textRight}>[JANコード、ロット番号、使用期限等]</Text>       
        </View>
        
        <View style={{ justifyContent: 'center', flexDirection: 'column'}}>

          <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this.openModal(1)}>
              <View style={styles.panelPhotoLeft}>
                {
                  image_1 ?
                  <Image
                    source={{uri:this.state.receive_data.item.image_1}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>No Image</Text>
                }
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this.openModal(2)}>
              <View style={styles.panelPhotoRight}>
                {
                  image_2 ?
                  <Image
                    source={{uri:this.state.receive_data.item.image_2}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>No Image</Text>
                }
              </View>
            </TouchableOpacity>
            
          </View>
        
          <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this.openModal(3)}>
              <View style={styles.panelPhotoLeft}>
                {
                  image_3 ?
                  <Image
                    source={{uri:this.state.receive_data.item.image_3}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>No Image</Text>
                }
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this.openModal(4)}>
              <View style={styles.panelPhotoRight}>
                {
                  image_4 ?
                  <Image
                    source={{uri:this.state.receive_data.item.image_4}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>No Image</Text>
                }
              </View>
            </TouchableOpacity>
          </View>
        
          <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this.openModal(5)}>
              <View style={styles.panelPhotoLeft}>
                {
                  image_5 ?
                  <Image
                    source={{uri:this.state.receive_data.item.image_5}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>No Image</Text>
                }
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this.openModal(6)}>
              <View style={styles.panelPhotoRight}>
                {
                  image_6 ?
                  <Image
                    source={{uri:this.state.receive_data.item.image_6}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>No Image</Text>
                }
              </View>
            </TouchableOpacity>
          </View>
        </View>
  

        {/*todo: 後で登録・リスト遷移処理を記述する*/}        
        
        <TouchableOpacity  
          // onPress = {()=> this.setState({detailSwitch:0})}       
          onPress = {()=> this.props.navigation.navigate('MyPageList',{login_info:this.state.login_info})} 
          style={styles.loginButtonLast}>
          <Text style={styles.loginBtnText}>リスト画面へ</Text>
        </TouchableOpacity>
        
        
        
        
                
        {/* 画像拡大用モーダル */}
        <Modal
          visible={this.state.modalVisible}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
          
          {/*<Image source={{uri: this.state.data_detail.image_1}} style={{width: sWidth, height: sHeight}} resizeMode='contain' />*/}
          
          <ImageZoom cropWidth={sWidth}
            cropHeight={sHeight}
            imageWidth={sWidth}
            imageHeight={sHeight}
          >
            
          <Image source={{uri: this.state.currentImage}} style={{width:sWidth, height:sHeight}} resizeMode='contain'/>
            
          </ImageZoom>

            <TouchableOpacity  
              onPress = {()=> this.closeModal()}      
              style={styles.imageCloseLogo}>
              <Image source={closeLogo} style={styles.imageCloseLogo} resizeMode='contain'/>
            </TouchableOpacity>  
            
            
            
          </View>
        </Modal>
        
        
      </ScrollView>
    </View>
   );            
  }

  //購入画面の商品をタップした時
  else if( this.state.receive_data.page_selecter === 1)
  {
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.panelDetailRowFirst} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>薬品名</Text> 
              {/*購入画面では購入したものしか表示されないため薬品情報は触れないようしている*/}
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel} >{this.state.receive_data.item.drug_name}</TextInput>
              <Text style={styles.textInputInPanelJan}>YJ/{this.state.receive_data.item.drug_code_yj}</Text> 
            </View>
      
            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>販売価格</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}>{this.state.receive_data.item.price}</TextInput>
              <Text style={styles.textOneStringPrice}>円</Text> 
            </View>
            
            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>割引率</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}>{100-this.state.receive_data.item.ratio}</TextInput>
              <Text style={styles.textOneStringPrice}>%</Text> 
            </View>
                
            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>個数</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanelPrice}>{this.state.receive_data.item.quantity}</TextInput>
              <Text style={styles.textOneStringPrice}>個</Text> 
            </View>

            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>使用期限</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.receive_data.item.expiration_year}年{this.state.receive_data.item.expiration_month}月</TextInput>
            </View>

            <View style={styles.panelDetailRow3} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>備考</Text> 
              <TextInput multiline blurOnSubmit={false} id="loginId" editable={false} style={styles.textInputInPanel3}>{this.state.receive_data.item.note}</TextInput>
            </View>
      
            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>出品者</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.receive_data.item.member_name}</TextInput>
            </View>

            <View style={styles.panelDetailRow3} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>住所</Text> 
              <TextInput multiline blurOnSubmit={false} id="loginId" editable={false} style={styles.textInputInPanel3}>{this.state.receive_data.item.member_address}</TextInput>
            </View>

            <View style={styles.panelDetailRow} backgroundColor={this.state.colorDetailPanel}>
              <Text style={styles.textInPanel}>電話番号</Text> 
              <TextInput id="loginId" editable={false} style={styles.textInputInPanel}>{this.state.receive_data.item.member_tel}</TextInput>
            </View>
        
            <View style={{  flexDirection: 'row'}}>
              <Text style={styles.textLeft}>画像</Text> 
              <Text style={styles.textRight}>[JANコード、ロット番号、使用期限等]</Text>       
            </View>

<View style={{ justifyContent: 'center', flexDirection: 'column'}}>

          <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this.openModal(1)}>
              <View style={styles.panelPhotoLeft}>
                {
                  image_1 ?
                  <Image
                    source={{uri:this.state.receive_data.item.image_1}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>No Image</Text>
                }
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this.openModal(2)}>
              <View style={styles.panelPhotoRight}>
                {
                  image_2 ?
                  <Image
                    source={{uri:this.state.receive_data.item.image_2}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>No Image</Text>
                }
              </View>
            </TouchableOpacity>
            
          </View>
        
          <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this.openModal(3)}>
              <View style={styles.panelPhotoLeft}>
                {
                  image_3 ?
                  <Image
                    source={{uri:this.state.receive_data.item.image_3}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>No Image</Text>
                }
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this.openModal(4)}>
              <View style={styles.panelPhotoRight}>
                {
                  image_4 ?
                  <Image
                    source={{uri:this.state.receive_data.item.image_4}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>No Image</Text>
                }
              </View>
            </TouchableOpacity>
          </View>
        
          <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this.openModal(5)}>
              <View style={styles.panelPhotoLeft}>
                {
                  image_5 ?
                  <Image
                    source={{uri:this.state.receive_data.item.image_5}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>No Image</Text>
                }
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this.openModal(6)}>
              <View style={styles.panelPhotoRight}>
                {
                  image_6 ?
                  <Image
                    source={{uri:this.state.receive_data.item.image_6}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>No Image</Text>
                }
              </View>
            </TouchableOpacity>
          </View>
        </View>

            {/*todo: 後で処理を記述する*/}
            <TouchableOpacity  
              // onPress = {()=> this.setState({detailSwitch:0})}
              onPress = {()=> this.props.navigation.navigate('MyPageList',{login_info:this.state.login_info})}
              style={styles.loginButtonLast}>
              <Text style={styles.loginBtnText}>リスト画面へ</Text>
            </TouchableOpacity>
            
            
            
        {/* 画像拡大用モーダル */}
        <Modal
          visible={this.state.modalVisible}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
          
          {/*<Image source={{uri: this.state.data_detail.image_1}} style={{width: sWidth, height: sHeight}} resizeMode='contain' />*/}
          
          <ImageZoom cropWidth={sWidth}
            cropHeight={sHeight}
            imageWidth={sWidth}
            imageHeight={sHeight}
          >
            
          <Image source={{uri: this.state.currentImage}} style={{width:sWidth, height:sHeight}} resizeMode='contain'/>
            
          </ImageZoom>

            <TouchableOpacity  
              onPress = {()=> this.closeModal()}      
              style={styles.imageCloseLogo}>
              <Image source={closeLogo} style={styles.imageCloseLogo} resizeMode='contain'/>
            </TouchableOpacity>  
            
            
            
          </View>
        </Modal>
            
          </ScrollView>
        </View>            
      );  
    }
  }


  // 修正ボタン押下後
  editingConfirmAlert(){
    console.log("アイテム確認:" + this.state.receive_data.item.ratio);
    // 確認アラート
    Alert.alert(
      // Androidはセンタリング不可
     '修正確認',
     '修正画面へ遷移します。\n'
     + 'よろしいですか？',
     [
       // 画面遷移、画面タイプ、薬品情報
      {text: 'OK', onPress: () => this.props.navigation.navigate('EntryDrug',{registration_type:1,drug_info:this.state.receive_data.item,login_info:this.state.login_info})},
      {text: 'CANCEL', onPress: () => console.log('確認　Cancel Pressed'), style: 'cancel'},
     ],
     { cancelable: false }
   )
  }


  // 取消ボタン押下後
  deleteConfirmAlert = () => {
    // 確認アラート
    Alert.alert(
      // Androidはセンタリング不可
      '取消確認',
      '出品を取り消します。\n'
      + 'よろしいですか？',
      [
        {text: 'OK', 
          // 取消完了メソッド
          onPress: () => this.deleteCompletedAlert()
        },
        {text: 'CANCEL', 
          onPress: () => console.log('確認　Cancel Pressed'), style: 'cancel'
        },
      ],
      { cancelable: false }
    )
  }

  // 取消完了
  deleteCompletedAlert(){

    // 処理
    // is_canceled = 1 にする
    this.CancelEntryDrug();

    // 取消完了アラート
    Alert.alert(
      // Androidはセンタリング不可
      '完了',
      '取り消しが完了しました。',
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate('MyPageList',{login_info:this.state.login_info})},
      ],
      { cancelable: false }
    )

  }


}


/////////////////////////////////////  ここからSCC ///////////////////////////////////////////
const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#FFF8E8',   
    },
    modalContainer: {
      flex:1,
      backgroundColor: '#000',   
    },
    // loginID: {
    //   marginLeft:textLeft,
    //   marginTop:30,
    // },
    // loginPwd: {
    //   marginLeft:textLeft,
    //   marginTop:10,
    // },
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
    // textInputHalfLeft: {
    //   marginTop:5,
    //   marginLeft:0,
    //   paddingLeft:10,
    //   paddingRight:10,
    //   width:textInputWidthHalf - 30,
    //   height:40,
    //   backgroundColor: '#fff',
    //   borderRadius:5,
    //   borderWidth:1,
    //   borderColor:'#d6d7da',    
    // },
    // textInputHalfRight: {
    //   marginTop:5,
    //   marginLeft:0,
    //   paddingLeft:10,
    //   paddingRight:10,
    //   width:textInputWidthHalf - 30,
    //   height:40,
    //   backgroundColor: '#fff',
    //   borderRadius:5,
    //   borderWidth:1,
    //   borderColor:'#d6d7da',    
    // },
    // textInputOneThird:{
    //   marginTop:5,
    //   marginLeft:0,
    //   paddingLeft:10,
    //   paddingRight:10,
    //   width:textInputWidthThird + 10,
    //   height:40,
    //   backgroundColor: '#fff',
    //   borderRadius:5,
    //   borderWidth:1,
    //   borderColor:'#d6d7da',    
    // },
    // textInputTwoThirds:{
    //   marginTop:5,
    //   marginLeft:15,
    //   paddingLeft:10,
    //   paddingRight:10,
    //   width:textInputWidthThird - 20,
    //   height:40,
    //   backgroundColor: '#fff',
    //   borderRadius:5,
    //   borderWidth:1,
    //   borderColor:'#d6d7da',    
    // },
    // textInputThreeThirds:{
    //   marginTop:5,
    //   marginLeft:15,
    //   paddingLeft:10,
    //   paddingRight:10,
    //   width:textInputWidthThird - 20,
    //   height:40,
    //   backgroundColor: '#fff',
    //   borderRadius:5,
    //   borderWidth:1,
    //   borderColor:'#d6d7da',    
    // },
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
    //  textInPanelRedPanel:{
    //   marginTop:5,
    //   marginRight:10,
    //   textAlign:'right',
    //   color:'red',
      
    // },
    
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
    // textOneString: {
    //     color: '#000',
    //     marginTop:15,
    //     marginLeft:10,
    //     width: 20,
    //   alignItems: 'center',
    // },
    textOneStringPrice: {
        color: '#000',
        marginTop:20,
        marginLeft:0,
        width: 20,
      alignItems: 'center',
      position: 'absolute',
      right: 10,
    },
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
    checkboxContainerOneThird: {
      //flexDirection: 'row',
      //alignItems: 'center',
      marginTop: 10,
      width:(sWidth - textLeft*2)/3  - 10,
      justifyContent: 'center',
    },
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
    // panelPhoto:{
    //   height:140,
    //   width:textInputWidthHalf - 5,
    //   marginTop:10,
    //   marginRight:0,
    //   backgroundColor: '#FAFAFA',
    //   borderWidth:1,
    //   borderColor:'#d6d7da',
    //   alignItems: 'center',
    // }, 
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
    imagePhoto:{
    height:140,
    width:textInputWidthHalf - 3,
  },
    // panelDrugInList:{
    //   height:100,
    //   width:textInputWidth,
    //   marginTop:10,
    //   marginLeft:textInputMargin/2,
    //   marginRight:0,
    //   backgroundColor: '#FAFAFA',
    //   borderWidth:1,
    //   borderColor:'#d6d7da',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   flexDirection: 'row',
    // },
    // panelDrugInListPhoto:{
    //   height: 100,
    //   width: textInputWidth / 100 * 45 ,
    //   borderWidth:1,
    //   borderColor:'#d6d7da',
    //   backgroundColor: '#FFF',
    
    // },
    // panelDrugInListDescription:{
    //   height: 100,
    //   width: textInputWidth / 100 * 55 ,
    //   borderWidth:1,
    //   borderColor:'#d6d7da',
    //   flexDirection: 'column',
    //   justifyContent: 'center',
      
    // },
    // logoDrugInListPhoto:{
    //   height:100-2,
    //   width:textInputWidth / 100 * 45,
    // },  
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
    // dropDownLogoStyleYear:{
    //   height:15,
    //   width:8,
    //   transform: [{ rotate: '90deg' }],
    //   backgroundColor: '#fff',
    //   position: "absolute",
    //   marginTop:17,
    //   left: textLeft + textInputWidthThird - 20,
    // },
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
   imageDrugPhotoZoom:{
    height:500,
    width:500,
   },
   imageCloseLogo:{    
     height:50,
     width:50,
     position: 'absolute',
     right: 10,
     top:10,
   }
  });