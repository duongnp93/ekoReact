// □商品一覧画面
import React,{Component} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions,Alert,TextInput,ScrollView,FlatList } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Checkbox from 'react-native-modest-checkbox'
import axios from 'axios';

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
  var textInputMargin = sWidth*16/100;
  var textInputWidth = sWidth*84/100;
  var textInputWidthHalf = textInputWidth/2;
  var textInputWidthThird = textInputWidth/3;
  var toiawaseBot = sHeight*14/100-50;
  var serverUrl=require('./server_url.js')


  
export default class SearchListScreen extends Component {  

  componentDidMount(){
    this.GetEntryList();
  }
  
  // リクエストをSQLに投げる
  GetEntryList(){
      var url = serverUrl + 'GetEntryList';
      var result_length = 0;
    axios.post(url,{
      filter_drug_name: "%" + this.state.filter_drug_name + "%",
      filter_price_lower: this.state.filter_price_lower,
      filter_price_upper: this.state.filter_price_upper,
      filter_quantity_lower: this.state.filter_quantity_lower,
      filter_quantity_upper: this.state.filter_quantity_upper,
      filter_expiration_lower:this.state.filter_expiration_lower,
      filter_expiration_upper:this.state.filter_expiration_upper,
      login_member_id: this.state.login_info.id
    })
    .then((EntryData) => {
      
      // 件数の取得
      // アラートに使用
      this.noData(EntryData.data.length);

      this.setState({
        data: EntryData.data,
      })
      
    });

  }

  // 検索画面で指定がない項目用
  constructor(props) {
    super(props)
    this.state = {
      data:[],
      filter_drug_name:(this.props.navigation.state.params.filter.filter_drug_name != "") ? this.props.navigation.state.params.filter.filter_drug_name : '',
      filter_price_lower:(this.props.navigation.state.params.filter.filter_price_lower != "") ? this.props.navigation.state.params.filter.filter_price_lower : 0,
      filter_price_upper:(this.props.navigation.state.params.filter.filter_price_upper != "") ? this.props.navigation.state.params.filter.filter_price_upper : 99999999,
      filter_quantity_lower:(this.props.navigation.state.params.filter.filter_quantity_lower != "") ? this.props.navigation.state.params.filter.filter_quantity_lower : 0,
      filter_quantity_upper:(this.props.navigation.state.params.filter.filter_quantity_upper != "") ? this.props.navigation.state.params.filter.filter_quantity_upper : 99999,
      filter_expiration_lower:(this.props.navigation.state.params.filter.filter_expiration_lower != "") ? this.props.navigation.state.params.filter.filter_expiration_lower : 0,
      filter_expiration_lower_y:(this.props.navigation.state.params.filter.filter_expiration_lower_y != "") ? this.props.navigation.state.params.filter.filter_expiration_lower_y : 0,
      filter_expiration_lower_m:(this.props.navigation.state.params.filter.filter_expiration_lower_m != "") ? this.props.navigation.state.params.filter.filter_expiration_lower_m : 0,
      filter_expiration_upper:(this.props.navigation.state.params.filter.filter_expiration_upper != "") ? this.props.navigation.state.params.filter.filter_expiration_upper : 999999,
      filter_expiration_upper_y:(this.props.navigation.state.params.filter.filter_expiration_upper_y != "") ? this.props.navigation.state.params.filter.filter_expiration_upper_y : 9999,
      filter_expiration_upper_m:(this.props.navigation.state.params.filter.filter_expiration_upper_m != "") ? this.props.navigation.state.params.filter.filter_expiration_upper_m : 99,
      login_info:this.props.navigation.state.params.filter.login_info,
      result_data:[],
      
    };
  }
  
  
  
  render(){
    const { navigate } = this.props.navigation;
    console.log("商品一覧" + this.state.login_info.name)
    return (
      <View style={styles.container}>
          
                     {/* <View style marginLeft={textLeft} marginRight={textLeft} marginTop={10} height={40} > */}
              <View style marginLeft={textLeft} marginRight={textLeft} marginTop={20} height={40} >
              <SwitchSelector
                initial={0}
                onPress={value => this.sortList(value)}
                textColor='#00AD52'
                selectedColor='white'
                buttonColor='#00AD52'
                borderColor='#00AD52'
                animationDuration = {0}
                options={[
                  { label: '使用期限', value: '0' },
                  { label: '割引率', value: '1' },
                  { label: '数量', value: '2' },
                ]}
              />
              </View>
            {/*</View> */}
          
          {/* 取得した検索結果を表示（this.state.date） */} 
          <Text style={{marginTop:10,marginRight:textInputMargin/2,textAlign:'right'}}
            
            >
              {this.state.data.length} 件
            </Text>

          <FlatList
            data={this.state.data}
            renderItem={this.getItem}
            style={{ marginTop: 10,marginBottom:10 }}
          />

        
      </View>
    );
  }
  
  getItem = ({item}) => {
    return(
      <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this.openDetail(item)}>

        <View style={styles.panelDrugInListPhoto}>
          <Image source={{uri: item.image_1}} style={styles.logoDrugInListPhoto}  />
        </View>
        {/*
        <View style={styles.panelDrugInListDescription}>
          <Text style={{marginLeft:10,textAlign:'left'}}>{item.drug_name}</Text>
          <Text style={{marginRight:10,textAlign:'right',color:'red'}}>{item.price} 円</Text>
          <Text style={{marginRight:10,textAlign:'right'}}>{item.quantity} 個</Text>
          <Text style={{marginRight:10,textAlign:'right'}}>{item.expiration_year} 年 {item.expiration_month} 月</Text>
        </View>
        */}
        
        <View style={styles.panelDrugInListDescription}>
          <Text style={{marginLeft:10,textAlign:'left'}}>{item.drug_name}</Text>
          
          <Text style={{marginRight:10,textAlign:'right',color:'red'}}>{100-item.ratio}%OFF  {item.quantity} 個</Text>

          
          <Text style={{marginRight:10,textAlign:'right'}}>{item.price} 円</Text>
          <Text style={{marginRight:10,textAlign:'right'}}>{item.expiration_year} 年 {item.expiration_month} 月</Text>
        </View>
        
      </TouchableOpacity>
    );
  }
  // 商品詳細画面へ遷移
  openDetail = (item)=>{
    // this.setState({
    //   result_data : item
    // });
    
    console.log(item);
    this.props.navigation.navigate('SearchDetail',{item:item,login_info:this.state.login_info});
  }
  
  
  // ソート処理 標準優先度は1:使用期限、2:割引率、3:数量
  sortList = (value) =>{
    
    var sort_array = this.state.data;
    
    var comparator;
    
    if(value == 0)
    {
    console.log('使用期限_start');
    
      comparator = (a, b) => {
      // 使用期限:年でソート
      if(a.expiration_year < b.expiration_year) return -1;
      if(a.expiration_year > b.expiration_year) return  1;
      // 使用期限:月でソート
      if(a.expiration_month < b.expiration_month) return -1;
      if(a.expiration_month > b.expiration_month) return  1;
      
      // 割引率
      if(a.ratio < b.ratio) return -1;
      if(a.ratio > b.ratio) return  1;
      
      // 数量
      if(a.quantity < b.quantity) return -1;
      if(a.quantity > b.quantity) return  1;
      
      
      return 0;
      };
      
    }
    else if(value == 1)
    {
    console.log('割引率_start');
    
      comparator = (a, b) => {
      
      // 割引率
      if(a.ratio < b.ratio) return -1;
      if(a.ratio > b.ratio) return  1;
      
      // 使用期限:年でソート
      if(a.expiration_year < b.expiration_year) return -1;
      if(a.expiration_year > b.expiration_year) return  1;
      // 使用期限:月でソート
      if(a.expiration_month < b.expiration_month) return -1;
      if(a.expiration_month > b.expiration_month) return  1;
      
      // 数量
      if(a.quantity < b.quantity) return -1;
      if(a.quantity > b.quantity) return  1;
      
      
      return 0;
      };
      
      
    }
    else if(value == 2)
    {
    console.log('数量_start');
    
      comparator = (a, b) => {
      
      // 数量
      if(a.quantity < b.quantity) return -1;
      if(a.quantity > b.quantity) return  1;

      // 使用期限:年でソート
      if(a.expiration_year < b.expiration_year) return -1;
      if(a.expiration_year > b.expiration_year) return  1;
      // 使用期限:月でソート
      if(a.expiration_month < b.expiration_month) return -1;
      if(a.expiration_month > b.expiration_month) return  1;
      
      // 割引率
      if(a.ratio < b.ratio) return -1;
      if(a.ratio > b.ratio) return  1;
      
      
      return 0;
      };
    
    }
    

    sort_array.sort(comparator);
    
    this.setState({
      data:sort_array
    })
  }


  // アラート用メソッド
  noData(result_length){

    console.log('件数：' + result_length + '件');

    if(result_length == 0){
      Alert.alert(
       // Androidはセンタリング不可
        '検索結果',
        'データがありません。',
        [
          // OKボタン押下後、検索画面へ遷移
         {text: 'OK', onPress: () => this.props.navigation.goBack()},
        ],
        { cancelable: false }
      )
    }

  }
    
}


/////////////////////////////////////////// ここからSCC ////////////////////////////////////////////
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
  //   textInputInPanel:{
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
  // },
  // textInPanel:{
  //   marginTop:5,
  //   marginLeft:10,
  //   textAlign:'left',
  // },
  //  textInPanelRedPanel:{
  //   marginTop:5,
  //   marginRight:10,
  //   textAlign:'right',
  //   color:'red',
    
  // },
  // textRight:{
  //   marginRight:logoLeft,
  //   marginTop:30,
  //   textAlign: 'right' 
  
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
  // loginBtnText: {
  //   color: '#fff',
  //   fontSize: 20,
  // },
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
  // textOneString: {
  // 	color: '#000',
  // 	marginTop:15,
  // 	marginLeft:10,
  // 	width: 20,
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
    height:100-4,
    width:textInputWidth / 100 * 43,
  },
  
  item: {
    backgroundColor:"#ccccff",
    padding:15,
    margin:2,
  },
  itemTitle: {
    padding:10,
    borderStyle:'solid',
    borderWidth:1,
    backgroundColor:'white',
    fontSize:24,
    color:'blue',
   },
   itemMail:{
     textAlign:'right',
     padding:3,
     fontSize:18,
     backgroundColor:'#000066',
     color:'white',
   }
});
