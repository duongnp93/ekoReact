// □マイページ薬品リスト
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

import {createSwitchNavigator, createAppContainer,NavigationEvents} from 'react-navigation';
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
  
export default class MyPageListScreen extends React.Component {  

  componentDidMount(){
    console.log('did_mount_start');
    this.GetMyEntryList();
    this.GetMyPurchasedList();
    console.log('did_mount_end');
    
  }
  

  // 出品情報の取得
  GetMyEntryList(){
    console.log('GetMyEntryList_start');
    // SQL文へ飛ばす
    var url = serverUrl + 'GetMyEntryList';
    axios.post(url,{
      // ログインしているID
      login_member_id: this.state.login_info.id,
    })
    .then((MyEntryData) => {
      this.setState({

        entry_data: MyEntryData.data,
        entry_filter_data: MyEntryData.data,

      })
    });
  }
  
  // 購入情報の取得
  GetMyPurchasedList(){
    console.log('GetMyPurchasedList_start');
    // SQL
    var url = serverUrl + 'GetMyPurchasedList';
    axios.post(url,{
      login_member_id: this.state.login_info.id,
    })
    .then((MyPurchasedData) => {
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
      
      // 出品中
      checkedEntry:true,
      // 落札
      checkedDealt:true,
      // 取り消し
      checkedCanceled:true,
      
      // 出品情報の種類別管理 未取引、取引済み、取消
      colorDetailPanel:'#C2FFC2', // 未取引:緑 取引済み:赤 取消:灰
      enableDetailInput:0,  // 0:編集不可 1:編集可

      page_selecter:0,
      stateDetailPage:1,// 0:未取引 1:取引済み 2:取消
      
      login_info:this.props.navigation.state.params.login_info
    }
  }
  
  //出品中にチェックが入っているときのフィルター
  //arrayの中にフィルターで抽出したデータをpushで押し込んでる。
  //メソッドを纏めるかばらばらにするかは書き方次第
  //entry_filter_dataはフィルターをかけた結果のデータ
  checkEntry = (value) => {
    console.log("checkEntry");
  
    // 出品中にチェックの動きがあった時に走る
    // 状態のif分
    var c = this.state.checkedEntry ? false : true;
    
    this.setState({
      checkedEntry:c,
      //entry_filter_data:array,
    })
    
  }
  
  //落札にチェックが入ってる時のフィルター
  checkDealt = (value) => {
    console.log("checkDealt");
  
    var c = this.state.checkedDealt ? false : true;
    
    this.setState({
      checkedDealt:c,
      //entry_filter_data:array,
    })

  }
  //取消にチェックが入っているときのフィルター
  checkCanceled = (value) => {
    console.log("checCanceled");
  
    var c = this.state.checkedCanceled ? false : true;
    
    this.setState({
      checkedCanceled:c,
      //entry_filter_data:array,
    })

  }
  
  checkInit(){
    console.log("checkInit");
    var array = [];
    
    if ( this.state.checkedEntry ) 
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
    
    return array;
  }
  
  
  render(){
    const { navigate } = this.props.navigation;
    console.log("マイページ一覧" + this.state.login_info.name)
    
    var arrayInit = this.checkInit();
    
    // 出品薬品 一覧
    if(this.state.pageSwitch == 0)
    {
      return (
        <View style={styles.container}>
            
            {/* 画面遷移した時にcomponentDidMount()を踏ませる */}
            <NavigationEvents
              onDidFocus={payload => this.componentDidMount()}
            />

            { /* スイッチセレクター */ }
            <View style marginLeft={textLeft} marginRight={textLeft} marginTop={10} height={40}>
              <SwitchSelector
                initial={this.state.pageSwitch}
                onPress={value => this.setState({pageSwitch:value, detailSwitch:0,page_selecter:value})}
                textColor='#00AD52'
                selectedColor='white'
                buttonColor='#00AD52'
                borderColor='#00AD52'
                animationDuration = {0}
                options={[
                  { label: '出品薬品', value: 0 },
                  { label: '購入薬品', value: 1 }
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
              //data={this.state.entry_filter_data}
              data = {arrayInit}
              renderItem={this.getItem}
              style={{ marginTop: 10,marginBottom:10 }}
            />
            
            </View>
            
        </View>
      );
    }
  
    // 購入薬品 一覧
    else if( this.state.pageSwitch == 1){
      return (
        <View style={styles.container}>
            
            { /* スイッチセレクター */ }
            <View style marginLeft={textLeft} marginRight={textLeft} marginTop={10} height={40}>
              <SwitchSelector
                initial={this.state.pageSwitch}
                onPress={value => this.setState({pageSwitch:value, detailSwitch:0, page_selecter:value})}
                textColor='#00AD52'
                selectedColor='white'
                buttonColor='#00AD52'
                borderColor='#00AD52'
                animationDuration = {0}
                options={[
                  { label: '出品薬品', value: 0 },
                  { label: '購入薬品', value: 1 }
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
            
        </View>
      );
    }
  
  }
  
  getItem = ({item}) => {
    
    return(
      <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this.openDetail(item)}>

        <View style={styles.panelDrugInListPhoto}>
          <Image source={{uri: item.image_1}} style={styles.logoDrugInListPhoto}  />

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
      pageSwitch : this.state.pageSwitch,
    });

    console.log(item.is_canceled);
    console.log(item);
    console.log(this.state.stateDetailPage);

      //マイページに遷移するときに一緒に薬品の情報も渡す
      this.props.navigation.navigate('MyPageDetail',{page_selecter:this.state.page_selecter,item,
                                                     login_info:this.state.login_info});
  }
  
}


///////////////////////////////////////// ここからSCC //////////////////////////////////////////////////
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
  // textInputInPanel:{
  //   marginTop:10,
  //   marginLeft:10,
  //   paddingTop:10,
  //   paddingBottom:10,
  //   paddingLeft:10,
  //   paddingRight:10,
  //   width:textInputWidthThird*2 + 20,
  //   height:40,
  //   backgroundColor: '#fff',
  //   borderRadius:5,
  //   borderWidth:1,
  //   borderColor:'#d6d7da',
  //   position: 'absolute',
  //   right: 10
  // },
  // textInputInPanelJan:{
  //   marginTop:53,
  //   marginLeft:10,
  //   paddingTop:0,
  //   paddingBottom:10,
  //   paddingLeft:10,
  //   paddingRight:10,
  //   width:textInputWidthThird*2 + 20,
  //   height:40,
  //   position: 'absolute',
  //   right: 10
  // },
  // textInputInPanel3:{
  //   marginTop:10,
  //   marginLeft:10,
  //   paddingTop:10,
  //   paddingBottom:10,
  //   paddingLeft:10,
  //   paddingRight:10,
  //   width:textInputWidthThird*2 + 20,
  //   height:100,
  //   backgroundColor: '#fff',
  //   borderRadius:5,
  //   borderWidth:1,
  //   borderColor:'#d6d7da',
  //   position: 'absolute',
  //   right: 10,
  //   textAlignVertical: 'top',
  // },
  // textInputInPanelPrice:{
  //   marginTop:10,
  //   marginLeft:10,
  //   paddingTop:10,
  //   paddingBottom:10,
  //   paddingLeft:10,
  //   paddingRight:10,
  //   width:textInputWidthThird*2 - 5,
  //   height:40,
  //   backgroundColor: '#fff',
  //   borderRadius:5,
  //   borderWidth:1,
  //   borderColor:'#d6d7da',
  //   position: 'absolute',
  //   right: 35,
  //   color:'red',
  //   textAlign : 'right',
  // },
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
  
  // textLeft:{
  //   marginLeft:textLeft,
  //   marginTop:10,
  //   textAlign: 'left' 
  // },
  // textRight:{
  //   marginRight:textLeft,
  //   marginTop:10,
  //   position: 'absolute',
  //   right: 0
  // },  
  // textOneString: {
  // 	color: '#000',
  // 	marginTop:15,
  // 	marginLeft:10,
  // 	width: 20,
  //   alignItems: 'center',
  // },
  // textOneStringPrice: {
  // 	color: '#000',
  // 	marginTop:20,
  // 	marginLeft:0,
  // 	width: 20,
  //   alignItems: 'center',
  //   position: 'absolute',
  //   right: 10,
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
  // loginButtonLast: {
  //   marginTop: 20,
  //   marginBottom: 20,
  //   marginLeft: textLeft,
  //   borderRadius:5,
  //   backgroundColor: '#00AD52',
  //   width:textInputWidth,
  //   height:50,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // loginButtonHalfLeft: {
  //   marginTop: 20,
  //   marginRight: 5,
  //   //marginLeft:textInputWidth/4,
  //   borderRadius:5,
  //   backgroundColor: '#00AD52',
  //   width:textInputWidth/4,
  //   height:50,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   position: 'absolute',
  //   right:panelLeft+textInputWidth/4,
  // },
  // loginButtonHalfRight: {
  //   marginTop: 20,
  //   //marginLeft:50,
  //   marginRight:0,
  //   borderRadius:5,
  //   backgroundColor: '#00AD52',
  //   width:textInputWidth/4,
  //   height:50,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   position: 'absolute',
  //   right:panelLeft,
  // },
  // loginBtnText: {
  //   color: '#fff',
  //   fontSize: 20,
  // },
  checkbox: {
    width: 25,
    height: 25,    
  },
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
  // panelPhotoLeft:{
  //   height:140,
  //   width:textInputWidthHalf - 3,
  //   marginTop:5,
  //   marginRight:3,
  //   backgroundColor: '#FAFAFA',
  //   borderWidth:1,
  //   borderColor:'#d6d7da',
  //   justifyContent: 'center',
  //   flexDirection: 'row',
  //   alignItems: 'center',
    
  // },
  // panelPhotoRight:{
  //   height:140,
  //   width:textInputWidthHalf - 3,
  //   marginTop:5,
  //   marginLeft:3,
  //   backgroundColor: '#FAFAFA',
  //   borderWidth:1,
  //   borderColor:'#d6d7da',
  //   justifyContent: 'center',
  //   flexDirection: 'row',
  //   alignItems: 'center',
    
  // },
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
  // imageDrugPhoto:{
  //   height:140-2,
  //   width:textInputWidthHalf - 5,
  // },
  // imageDealtLogo:{
  //   marginTop: 20,
  //   marginLeft:panelLeft,
  //   height:50,
  //   width:textInputWidth/3,
  // },
  // imageEntryLogo:{
  //   marginTop: 20,
  //   marginLeft:panelLeft,
  //   height:50,
  //   width:textInputWidth/3,
  // },
  // imageCanselLogo:{
  //   marginTop: 20,
  //   marginLeft:panelLeft,
  //   height:50,
  //   width:textInputWidth/3,
  // },
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
});
