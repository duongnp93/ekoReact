import React,{Component} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions,TextInput, Alert, ScrollView,Modal } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Checkbox from 'react-native-modest-checkbox'
import ImageZoom from 'react-native-image-pan-zoom';
import axios from 'axios';
import logo from '../images/a1765.png';
import closeLogo from '../images/mark_batsu.png';

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

  var serverUrl=require('./server_url.js')


export default class SearchDetailScreen extends Component {  

  constructor(props){
    super(props)
    this.state = {
      login_info: this.props.navigation.state.params.login_info,
      data_detail:this.props.navigation.state.params.item,
      modalVisible:false,
      currentImage:"",
      
    };
  }

  DealDrug(){
    console.log('DealDrug_start');
    console.log(this.state.data_detail.id);
    
    var url = serverUrl + 'DealDrug';
    axios.post(url,{
      filter_id: this.state.data_detail.id,
      login_member_id: this.state.login_info.id,
      entry_member_id:this.state.data_detail.member_id,
    })
    .then((result) => {
      //console.log(result);
      //this.setState({
      //  data: EntryData.data,
      //})
    });

  
    console.log(url);
    
    console.log('DealDrug_end');
    
  }

  openModal = ( value ) => {
    console.log(value);
    if ( value == 1 && this.state.data_detail.image_1)
    {
      this.setState({
        modalVisible:true,
        currentImage:this.state.data_detail.image_1
      });
    }
    else if( value == 2 && this.state.data_detail.image_2)
    {
      this.setState({
        modalVisible:true,
        currentImage:this.state.data_detail.image_2
      });
    }
    else if( value == 3 && this.state.data_detail.image_3)
    {
      this.setState({
        modalVisible:true,
        currentImage:this.state.data_detail.image_3
      });
    }
    else if( value == 4 && this.state.data_detail.image_4)
    {
      this.setState({
        modalVisible:true,
        currentImage:this.state.data_detail.image_4
      });
    }
    else if( value == 5 && this.state.data_detail.image_5)
    {
      this.setState({
        modalVisible:true,
        currentImage:this.state.data_detail.image_5
      });
    }
    else if( value == 6 && this.state.data_detail.image_6)
    {
      this.setState({
        modalVisible:true,
        currentImage:this.state.data_detail.image_6
      });
    }
    
  }
  
  

  closeModal() {
    this.setState({modalVisible:false});
  }



  
  

  render(){
  const { navigate } = this.props.navigation;
  
  let { image_01,image_02,image_03,image_04,image_05,image_06 } = this.state.data_detail;
  
  console.log('detail↓');
  console.log("薬品詳細"+this.state.login_info.name);
  console.log('detail↑');
  
  console.log(serverUrl);
  
  return (
    <View style={styles.container}>
      <ScrollView>
      
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
        
        
        
        <View style={{  flexDirection: 'row'}}>
          <Text style={styles.textLeft}>画像</Text> 
          <Text style={styles.textRight}>[JANコード、ロット番号、使用期限等]</Text>       
        </View>

        <View style={{ justifyContent: 'center', flexDirection: 'column'}}>

          <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this.openModal(1)}>
              <View style={styles.panelPhotoLeft}>
                {
                  this.state.data_detail.image_1 ?
                  <Image
                    source={{uri:this.state.data_detail.image_1}}
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
                  this.state.data_detail.image_2 ?
                  <Image
                    source={{uri:this.state.data_detail.image_2}}
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
                  this.state.data_detail.image_3 ?
                  <Image
                    source={{uri:this.state.data_detail.image_3}}
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
                  this.state.data_detail.image_4 ?
                  <Image
                    source={{uri:this.state.data_detail.image_4}}
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
                  this.state.data_detail.image_5 ?
                  <Image
                    source={{uri:this.state.data_detail.image_5}}
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
                  this.state.data_detail.image_6 ?
                  <Image
                    source={{uri:this.state.data_detail.image_6}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>No Image</Text>
                }
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity  
          onPress = {()=> this.dealDrugAlert()}      
          style={styles.loginButtonLast}>
          <Text style={styles.loginBtnText}>購入する</Text>
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
  
  
  /* 購入確認処理 */
  dealDrugAlert = () => {
    console.log('deal_Start');

    /* 購入確認 */
    Alert.alert(
      '購入確認',
      '購入しますか？',
      [
        {text: 'OK', 
        onPress: () => this.dealProcess()},
        {text: 'CANCEL', 
        onPress: () => console.log('購入　Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
    console.log("テスト")
  }

  /* 購入実行 */
  dealProcess(){
    /* 購入処理 */
    this.DealDrug()

    /* 画面遷移 */
    this.props.navigation.navigate('DrugDealDetail',{data_detail:this.state.data_detail, 
                                                     login_info:this.state.login_info});
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#FFF8E8',   
  },
  modalContainer: {
    flex:1,
    backgroundColor: '#000',   
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
    textAlign:'right',
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
    marginRight:2,
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
    marginLeft:2,
    backgroundColor: '#FAFAFA',
    borderWidth:1,
    borderColor:'#d6d7da',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  imagePhoto:{
    height:140-2,
    width:textInputWidthHalf - 3,
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
