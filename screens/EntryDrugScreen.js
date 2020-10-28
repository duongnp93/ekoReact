// □登録画面
import React,{Component} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions,TextInput,Alert,ScrollView,FlatList,SafeAreaView,Picker } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import Checkbox from 'react-native-modest-checkbox';
import axios from 'axios';

import logo from '../images/a1765.png';
import dropDownLogo from '../images/a1491.png';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import { Linking } from 'expo';
import GLOBALS from '../Globals';
import { Switch } from 'react-native-gesture-handler';

let fileReader = new FileReader();
const photo = new FormData();

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

  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  
  var serverUrl=require('./server_url.js')
  
  const errorcolor = "#ff0000";
  const normalcolor = "#d6d7da";

export default class EntryDrugScreen extends React.Component {  

  GetDrugList(value){
      var url = serverUrl + 'GetDrug';
    axios.post(url,{
//      filter_drug_name: "%" + this.state.filter_drug_name + "%",
      filter_drug_name: "%" + value + "%",
    })
    .then((DrugData) => {
      console.log(DrugData.data);
      this.setState({
        listDrug: DrugData.data,
      })
    });

  }
  
  EntryDrug(){

    console.log(this.state.screen_type);
    
    // 新規登録
    if(this.state.screen_type == 0){
      var url = serverUrl + 'EntryDrug';
      axios.post(url,{
       drug_code_yj:(this.state.selectedDrug.code_yj != "") ? this.state.selectedDrug.code_yj : 0,
        login_member_id: this.state.login_info.id,
        expiration_year: (this.state.expiration_year != "") ? this.state.expiration_year : 9999,
        expiration_month: (this.state.expiration_month != "") ? this.state.expiration_month : 99,
        price: (this.state.calc_price != "") ? (this.state.calc_price*1 + this.state.postage*1): 0,
        ratio: (this.state.ratio != "") ? this.state.ratio : 0,
        quantity: (this.state.quantity != "") ? this.state.quantity : 0,
        postage: (this.state.postage != "") ? this.state.postage : 0,
        note: (this.state.note != "") ? this.state.note : '',
        image_1: this.state.image_01_base64,
        image_2: this.state.image_02_base64,
        image_3: this.state.image_03_base64,
        image_4: this.state.image_04_base64,
        image_5: this.state.image_05_base64,
        image_6: this.state.image_06_base64,
      })
      .then((result) => {
        console.log(result);
        //this.setState({
        //  data: EntryData.data,
        //})
     });
   }
   // 修正
   if(this.state.screen_type == 1){
    var url = serverUrl + 'EditDrug';
    axios.post(url,{
      expiration_year: this.state.expiration_year,
      expiration_month: this.state.expiration_month,
      price: (this.state.calc_price*1 + this.state.postage*1),
      ratio: this.state.ratio,
      quantity:this.state.quantity,
      postage:this.state.postage,
      note: (this.state.note != "") ? this.state.note : '',
      image_1: this.state.image_01_base64,
      image_2: this.state.image_02_base64,
      image_3: this.state.image_03_base64,
      image_4: this.state.image_04_base64,
      image_5: this.state.image_05_base64,
      image_6: this.state.image_06_base64,
      filter_id: this.state.drug_info.id,
    })
    .then((result) => {
      console.log(result);
      //this.setState({
      //  data: EntryData.data,
      //})
    });
  }


  }



  constructor(props) {
    super(props)
    this.state = {
      // filter_drug_name:"",
      // ↓枠線の初期値
      filter_ratio_bordercolor:'#d6d7da',
      filter_ym_bordercolor:"#d6d7da",

      // 薬品名
      filter_drug_name:(this.props.navigation.state.params.registration_type == 0)?"":this.props.navigation.state.params.drug_info.drug_name,
      // 薬品コード
      // drug_code_jan:(this.props.navigation.state.params.registration_type == 0)?"":this.props.navigation.state.params.drug_info.drug_code_jan,
      drug_code_yj:(this.props.navigation.state.params.registration_type == 0)?"":this.props.navigation.state.params.drug_info.drug_code_yj,
      // 価格[薬価]
      drug_price:(this.props.navigation.state.params.registration_type == 0)?"":this.props.navigation.state.params.drug_info.drug_price,
      // 売掛率[％]
      ratio:(this.props.navigation.state.params.registration_type == 0)?"":this.props.navigation.state.params.drug_info.ratio,
      // 数量
      quantity:(this.props.navigation.state.params.registration_type == 0)?"":this.props.navigation.state.params.drug_info.quantity,
      // 送料
      postage:(this.props.navigation.state.params.registration_type == 0)?"":this.props.navigation.state.params.drug_info.postage,
      // 合計金額
      calc_price:(this.props.navigation.state.params.registration_type == 0)? 0:this.props.navigation.state.params.drug_info.price,
      // 年
      expiration_year:(this.props.navigation.state.params.registration_type == 0)?year:this.props.navigation.state.params.drug_info.expiration_year,
      // 月
      expiration_month:(this.props.navigation.state.params.registration_type == 0)?month:this.props.navigation.state.params.drug_info.expiration_month,
      // 備考
      note:(this.props.navigation.state.params.registration_type == 0)?"":this.props.navigation.state.params.drug_info.note,

      unit:"",
      unit_amount:"",
      
      image_01:null,
      image_02:null,
      image_03:null,
      image_04:null,
      image_05:null,
      image_06:null,
      
      // 画像（１～６）
      image_01_base64:(this.props.navigation.state.params.registration_type == 0)?null:this.props.navigation.state.params.drug_info.image_1,
      image_02_base64:(this.props.navigation.state.params.registration_type == 0)?null:this.props.navigation.state.params.drug_info.image_2,
      image_03_base64:(this.props.navigation.state.params.registration_type == 0)?null:this.props.navigation.state.params.drug_info.image_3,
      image_04_base64:(this.props.navigation.state.params.registration_type == 0)?null:this.props.navigation.state.params.drug_info.image_4,
      image_05_base64:(this.props.navigation.state.params.registration_type == 0)?null:this.props.navigation.state.params.drug_info.image_5,
      image_06_base64:(this.props.navigation.state.params.registration_type == 0)?null:this.props.navigation.state.params.drug_info.image_6,

      listDrug: [], 
      selectedDrug: [],
      isSelected:(this.props.navigation.state.params.registration_type == 0)?false:true,
      
      selectedValue: null,

      // 画面遷移タイプ
      screen_type:this.props.navigation.state.params.registration_type,
      // 薬品情報
      drug_info:this.props.navigation.state.params.drug_info,

	  login_info:this.props.navigation.state.params.login_info
    }
  }


  render(){
  const { navigate } = this.props.navigation;
  
  // let { image_01,image_02,image_03,image_04,image_05,image_06 } = this.state;
  let { image_01_base64,image_02_base64,image_03_base64,image_04_base64,image_05_base64,image_06_base64 } = this.state;
  

  
  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled={true} scrollEnabled={true}>
  <Text style={styles.loginID}>薬品名</Text> 
        {/* <TextInput id="loginId" editable={true} style={styles.textInput} */}
        <TextInput id="loginId" editable={(this.state.screen_type == 0) ? true: false} style={(this.state.screen_type == 0) ? styles.textInput:styles.textInputDrugNameFalse}
          onChangeText = {(value)=> this.getDrugList(value)} maxLength={100}>
            {this.state.filter_drug_name}
        </TextInput> 
        
        {
          this.state.isSelected ?
            
            <Text style={styles.textLeftNonMarginTop}>
              {/* JAN / {this.state.drug_code_jan} */}
              YJ / {this.state.drug_code_yj}
            </Text>
            :
            <ScrollView style={{ flex:1 }}>
            <FlatList
            data={this.state.listDrug}
          
            renderItem={this.getItem}
            style={{ marginTop: 5,marginBottom:10 }}
            />
            </ScrollView>
        
        }
        
        
        {/*
        <ScrollView style={{ flex:1 }}>
        <FlatList
          data={this.state.listDrug}
          
          renderItem={this.getItem}
          style={{ marginTop: 5,marginBottom:10 }}
        />
        </ScrollView>
        */}
        
        
        
        {/*<Text style={styles.textLeft}>JAN/{this.state.drug_code_jan}</Text> */}
        
        <View style={{ flexDirection: 'row'}}>
          <Text style={styles.textLeft}>価格</Text> 
          <Text style={{ marginTop:10, marginLeft:styles.textInputOneThird.width -65 }}>[薬価]</Text> 
          {/* ↓％は今後ドロップダウンリストになる予定 */}
          <Text style={{ marginTop:10, marginLeft:styles.textInputTwoThirds.width -5 }}>[％]</Text>

        </View>
        
        {/*<View style={{ justifyContent: 'center', flexDirection: 'row'}}>*/}
        <View style={{ flexDirection: 'row'}}>
          {/* ↓価格 */}
          <TextInput id="drugPrice" editable={false} style={styles.textInputOneThirdFalse} keyboardType='numeric' textAlign='right' 
            onChangeText = {(value)=> this.setState({drug_price:value, calc_price:(value * (this.state.ratio/100) * this.state.quantity)})}>
              {this.state.drug_price}
          </TextInput> 
          {/* ↓％ (今後ドロップダウンリストになる予定)*/}
          <TextInput id="ratio" editable={true} style={[styles.textInputTwoThirds,{borderColor:this.state.filter_ratio_bordercolor}]} keyboardType='numeric' textAlign='right'
            onChangeText = {(value)=> this.inputRatio({ratio:value, calc_price:(this.state.drug_price * (value/100) * this.state.quantity)})} maxLength={3}>
              {this.state.ratio}
          </TextInput>
        </View>
        

        
        <View style={{ flexDirection: 'row'}}>
          <Text style={styles.textLeft}></Text> 
          <Text style={{ marginTop:10, marginLeft:styles.textInputUnitAmount.width - 35}}>[数量]</Text> 
          <Text style={{ marginTop:10, marginLeft:styles.textInputTwoThirds.width - 20 }}>[単位]</Text>
        </View>
        
        <View style={{  flexDirection: 'row'}}>
          {/* 数量 */}
          <TextInput id="quantity" editable={true} style={styles.textInputUnitAmount} keyboardType='numeric' textAlign='right'
            onChangeText = {(value)=> this.setState({quantity:value, calc_price:(this.state.drug_price * (this.state.ratio/100) * value)})} maxLength={5}>
              {this.state.quantity}
            
          </TextInput> 

          
          <View 
            style={{ flexDirection: 'row'}}
            //style = {styles.dropDownStyleYear}
          >
          <Picker
            style={styles.dropDownStyleUnit}
            itemStyle={{ color: 'blue' }}
            selectedValue={this.state.unit}
            mode="dropdown"
            onValueChange={(value) => {
              this.setState({ unit:value });
            }}
          >
            <Picker.Item label={ "錠" } value={ 0 } />
            <Picker.Item label={ "ml" } value={ 1 } />
            <Picker.Item label={ "g" } value={ 2} />
            <Picker.Item label={ "カプセル" } value={ 3 } />
            <Picker.Item label={ "包" } value={ 4} />
          </Picker>
          </View>

          <Image source = {dropDownLogo} style={styles.dropDownLogoStyleUnit}/>    
          
        
        </View>
        
        
        
        
        <View style={styles.panelDetailRowNonColor} >
          <Text style={{marginTop:20,marginLeft:styles.textInputInPanelPriceEntry.width -100}} >送料</Text> 
          <TextInput id="loginId" editable={true} style={styles.textInputInPanelPriceEntry} keyboardType='numeric' textAlign='right'
            //onChangeText = {(value)=> this.setState({postage:value, calc_price:(parseInt(this.state.calc_price) + parseInt(value))})}
            onChangeText = {(value)=> this.setState({postage:value, calc_price:this.state.calc_price})} maxLength={8}
          >{this.state.postage}</TextInput>
          <Text style={styles.textOneStringPrice}>円</Text> 
        </View>
        
        
        <View style={styles.panelDetailRowFirst} >
          <Text style={{marginTop:20,marginLeft:styles.textInputInPanelPriceEntry.width -100,}} >合計金額</Text> 
          <TextInput id="loginId" editable={false} style={styles.textInputInPanelPriceEntryFalse} keyboardType='numeric' textAlign='right'>
            {this.state.calc_price*1 + this.state.postage*1}
          </TextInput>
          <Text style={styles.textOneStringPrice}>円</Text> 
        </View>
        
        <Text style={styles.loginPwd}>使用期限</Text> 
        {/*<View style={{ justifyContent: 'center', flexDirection: 'row'}}>*/}
        <View style={{  flexDirection: 'row'}}>
          {/*
          <TextInput id="loginId" editable={true} style={styles.textInputOneThird} keyboardType='numeric' textAlign='right' maxLength={4}
            onChangeText = {(value)=> this.setState({expiration_year:value})}
          >{this.state.expiration_year}</TextInput> 
          */}
          <View 
            // style={{ flexDirection: 'row'}}
            style={{ flexDirection: 'row',width:textInputWidthThird, backgroundColor: "#fff",
                    marginLeft:textLeft, borderRadius:5, borderWidth:1, borderColor: this.state.filter_ym_bordercolor}}
            //style = {styles.dropDownStyleYear}
          >
          <Picker
            style={styles.dropDownStyleYear}
            itemStyle={{ color: 'blue' }}
            selectedValue={this.state.expiration_year}
            mode="dropdown"
            onValueChange={(value) => {
              this.inputYm( value ,this.state.expiration_month);
            }}
          >
            <Picker.Item label={ (year).toString() } value={ year } />
            <Picker.Item label={ (year+1).toString() } value={ year+1 } />
            <Picker.Item label={ (year+2).toString() } value={ year+2 } />
            <Picker.Item label={ (year+3).toString() } value={ year+3 } />
            <Picker.Item label={ (year+4).toString() } value={ year+4 } />
          </Picker>
          </View>

          <Image source = {dropDownLogo} style={styles.dropDownLogoStyleYear}/>    
          

          
          <Text style={styles.textOneString}>年</Text> 
          
          {/*
          <TextInput id="loginId" editable={true} style={styles.textInputTwoThirds} keyboardType='numeric' textAlign='right' maxLength={2}
            onChangeText = {(value)=> this.setState({expiration_month:value})}
          >{this.state.expiration_month}</TextInput> 
          */}
          
          <View 
            // style={{ flexDirection: 'row'}}
            style={{ flexDirection: 'row', width:textInputWidthThird - 20,backgroundColor: "#fff",
                      borderRadius:5, borderWidth:1, borderColor: this.state.filter_ym_bordercolor}}
            //style = {styles.dropDownStyleMonth}
          >
          <Picker
            style={styles.dropDownStyleMonth}
            itemStyle={styles.dropDownItemStyle}
            selectedValue={this.state.expiration_month}
            mode="dropdown"
            onValueChange={(value) => {
              // this.setState({ expiration_month: value });
              this.inputYm(this.state.expiration_year, value);
            }}
          >
            <Picker.Item label= "  1" value={ 1 } />
            <Picker.Item label= "  2" value={ 2 } />
            <Picker.Item label= "  3" value={ 3 } />
            <Picker.Item label= "  4" value={ 4 } />
            <Picker.Item label= "  5" value={ 5 } />
            <Picker.Item label= "  6" value={ 6 } />
            <Picker.Item label= "  7" value={ 7 } />
            <Picker.Item label= "  8" value={ 8 } />
            <Picker.Item label= "  9" value={ 9 } />
            <Picker.Item label= " 10" value={ 10 } />
            <Picker.Item label= " 11" value={ 11 } />
            <Picker.Item label= " 12" value={ 12 } />

          </Picker>
          </View>
          
          <Image source = {dropDownLogo} style={styles.dropDownLogoStyleMonth}/>    
          
          
          <Text style={styles.textOneString}>月</Text> 
        </View>

        
        
        <Text style={styles.loginPwd}>備考</Text> 
        <TextInput multiline blurOnSubmit={false} id="loginId" editable={true} style={styles.textInput3}
          onChangeText = {(value)=> this.setState({note:value})} maxLength={300}>
          {this.state.note}
        </TextInput>
        
        <View style={{ flexDirection: 'row'}}>
          <Text style={styles.textLeft}>画像</Text> 
          <Text style={styles.textRight}>[JANコード、ロット番号、使用期限等]</Text>       
        </View>

        <View style={{ justifyContent: 'center', flexDirection: 'column'}}>

          <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this._takePhoto(1)}>
              <View style={styles.panelPhotoLeft}>
                {
                  image_01_base64 ?
                  <Image
                    source={{uri:image_01_base64}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>撮影する</Text>
                }
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this._takePhoto(2)}>
              <View style={styles.panelPhotoRight}>
                {
                  image_02_base64 ?
                  <Image
                    source={{uri:image_02_base64}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>撮影する</Text>
                }
              </View>
            </TouchableOpacity>
            
          </View>
        
          <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this._takePhoto(3)}>
              <View style={styles.panelPhotoLeft}>
                {
                  image_03_base64 ?
                  <Image
                    source={{uri:image_03_base64}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>撮影する</Text>
                }
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this._takePhoto(4)}>
              <View style={styles.panelPhotoRight}>
                {
                  image_04_base64 ?
                  <Image
                    source={{uri:image_04_base64}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>撮影する</Text>
                }
              </View>
            </TouchableOpacity>
          </View>
        
          <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this._takePhoto(5)}>
              <View style={styles.panelPhotoLeft}>
                {
                  image_05_base64 ?
                  <Image
                    source={{uri:image_05_base64}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>撮影する</Text>
                }
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this._takePhoto(6)}>
              <View style={styles.panelPhotoRight}>
                {
                  image_06_base64 ?
                  <Image
                    source={{uri:image_06_base64}}
                    style={styles.imagePhoto}
                  />
                  :
                  <Text>撮影する</Text>
                }
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity  
          // onPress = {()=> this.entryDrug()}
          onPress = {()=> this.entryAlert()}
          style={styles.loginButtonLast}>
          <Text style={styles.loginBtnText}>登録する</Text>
        </TouchableOpacity>  
      
      </ScrollView>
    </View>
  );
  }


  // カメラを起動
  _takePhoto = async (value) => {
      console.log('start_camera');
      
      let result = await ImagePicker.launchCameraAsync({
          base64: true,
          allowsEditing: false
      });
      
      var wantedwidth = 500;
      var wantedheight = 500;

{/*      
      let resizedUri = await new Promise((resolve, reject) => {
        ImageEditor.cropImage(result.uri,
          {
            offset: { x: 0, y: 0 },
            size: { width: result.width, height: result.height },
            displaySize: { width: wantedwidth, height: wantedheight },
            resizeMode: 'contain',
          },
          (uri) => resolve(uri),
          () => reject(),
        );
      });
*/}
{/*
      let resizedBase64 = await new Promise((resolve, reject) => {
        ImageEditor.cropImage(result.uri,
        {
          offset: { x: 0, y: 0 },
          size: { width: result.width, height: result.height },
          displaySize: { width: wantedwidth, height: wantedheight },
          resizeMode: 'contain',
        },
        (uri) => {
          ImageStore.getBase64ForTag(uri,
          (base64Data) => {
            resolve('data:image/jpg'+ ';base64,' + base64Data);
          },
          (reason) => reject(reason));
        },
        () => reject());
      });
*/}

      console.log('resize_start');

      const resizedPhoto = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: {width: wantedwidth , height:wantedheight}}],
        { compress: 0.7, format: 'jpeg' ,base64:true},
      );

      console.log('resize_end');
      
      
      // 画像をbase64に
      let imageUri = result ? `data:image/jpg;base64,${result.base64}` : null;
      //imageUri && console.log({uri: imageUri.slice(0, 100)});
      
      let resizeUri = result ? `data:image/jpg;base64,${resizedPhoto.base64}` : null;
      
      
      if (!result.cancelled) {
      
          // 撮影された（ローカルの）写真を取得
          //const localUri = await fetch(result.uri);
          // blobを取得
          //const localBlob = await localUri.blob();
      
          if(value == 1)
          {
            this.setState({image_01: result.uri});
            this.setState({image_01_base64: resizeUri});
          }else if(value == 2)
          {
            this.setState({image_02: result.uri});
            this.setState({image_02_base64: resizeUri});
          }else if(value == 3)
          {
            this.setState({image_03: result.uri});
            this.setState({image_03_base64: resizeUri});
          }else if(value == 4)
          {
            this.setState({image_04: result.uri});
            this.setState({image_04_base64: resizeUri});
          }else if(value == 5)
          {
            this.setState({image_05: result.uri});
            this.setState({image_05_base64: resizeUri});
          }else if(value == 6)
          {
            this.setState({image_06: result.uri});
            this.setState({image_06_base64: resizeUri});
          }
      }
  }
 
  // カメラロールから選択
  _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          base64: true,
          allowsEditing: true,
          aspect: [16, 9]
      });
 
      console.log(result);
 
      if (!result.cancelled) {
          this.setState({image_01: result.uri});
      }
      

  }
  
  // 薬品リストを取得
  getDrugList = (value) => {
    console.log('getDrugList_Start');
    
    this.setState({
      filter_drug_name:value,
      isSelected:false
    });
    console.log('getDrugList');
    
    this.GetDrugList(value);
    console.log('getDrugList_End');
  
  }
  
  // 薬品リストを、FlatListに反映
  getItem = ({item}) => {
    console.log('getItem');
    
    return(
      <TouchableOpacity style={styles.textDropdown} onPress={()=>this.selectDrug(item)}>
        <Text>{item.name}</Text>
        
      </TouchableOpacity>
    );
  }

  // ドロップダウンから薬品を選択
  selectDrug = (item) => {
    console.log('selectDrug');
    
    this.setState({
      selectedDrug:item, 
      isSelected:true,
      filter_drug_name:item.name,
      // drug_code_jan:item.code_jan,
      drug_code_yj:item.code_yj,
      drug_price:item.price,
      calc_price:(item.price * (this.state.ratio/100) * this.state.quantity),
      listDrug:[]
      });
    
    console.log(this.state.listDrug);    
    console.log(item);
  }

  
  // ↓入力チェックメソッド

  // ％の 100＜ チェック
  // 今後ドロップダウンリストになる予定
  inputRatio(input_ratio){

    var resultcolor = "";

    // input_ratio.ratio」は％の値
    if(Number(input_ratio.ratio) > 100){
      console.log("％エラー");
      resultcolor = errorcolor;
    }
    else{
      resultcolor = normalcolor;
    }

    // stateを変更する
    this.setState({ 
      filter_ratio_bordercolor:resultcolor,
      ratio:input_ratio.ratio,
      calc_price:input_ratio.calc_price
    })

  }

  // 使用期限の大小チェック
  inputYm(selected_year,selected_month){

    var resultcolor = "";

    // 月を先頭0埋め「07」にする
    var selected_month0p = ('00' + selected_month).slice(-2);

    // 選択した年月
    var selected_time = "" + selected_year + selected_month0p;
    // 現在の年月
    var now_time = "" + year + month;

    // 使用期限 ＜ 現在の年月 の場合エラー
    if( selected_time < now_time ){
      console.log("使用期限　エラー");
      resultcolor = errorcolor;
    }
    else{
      console.log("使用期限　正常");
      resultcolor = normalcolor;
    }

    this.setState({ 
      filter_ym_bordercolor:resultcolor,
      expiration_year:selected_year,
      expiration_month:selected_month
    })  

  }

  // アラート
  entryAlert(){

    Alert.alert(
      // Androidはセンタリング不可
      '登録確認',
      '登録しますか？' ,
      [
        {text: 'OK', 
          onPress: () => this.Entry()},
        {text: 'CANCEL', 
          onPress: () => console.log('登録　Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )

  }

  // 登録実行
  Entry(){

    // 入力チェック
    // trueが帰ってきたら登録処理と画面遷移をする
    if(this.entryCheck()){
      // 登録処理
     this.EntryDrug();

      // 画面遷移
     this.completedAlert();

    }

  }

  entryCheck(){
    // Entry()で使う用の初期値
    var result = true;

    // エラーメッセージの初期値
    var required_error_message = this.requiredCheck();
    var illegal_input_error_message = this.illegalInputCheck();

    // 必須項目が未入力
    if(required_error_message != ""){
      required_error_message = required_error_message + 'に入力がありません。\n'
    }
    // 不正入力
    if(illegal_input_error_message != ""){
      illegal_input_error_message = illegal_input_error_message +'の登録内容に誤りがあります。'
    }
    // 登録エラーに引っかかる場合のアラート
    if(required_error_message != "" || illegal_input_error_message != "" ){
      Alert.alert(
        // Androidのセンタリング不可
        '登録エラー',
        required_error_message + illegal_input_error_message,
        [
          {text: 'OK', onPress: () => console.log('登録エラー　OK Pressed')}
        ],
        // アラート以外の箇所をタップでキャンセルをしないようにする
        { cancelable: false }
      )
      // エラーの場合はfalse
      result = false;

    }
    // true か false を返す
    return result;

  }
  

  // 必須入力チェック
  requiredCheck(){
    // 初期値
    var check_result = true;
    var error_message = "";

    if(this.state.isSelected == ""){
      // エラーだからfalseを返す
      check_result = false;
      // メッセージを追加
      error_message += "｢薬品名｣";
    }
    if(this.state.ratio == ""){
      check_result = false;
      error_message += "｢売掛率｣";
    }
    if(this.state.quantity == ""){
      check_result = false;
      error_message += "｢数量｣";
    }
    if(this.state.postage == ""){
      check_result = false;
      error_message += "｢送料｣";
    }
    // メッセージを返す
    return error_message;

  }

  // 不正入力チェック
  illegalInputCheck(){
    // 初期値
    var check_result = true;
    var error_message = "";

    if(this.state.filter_ratio_bordercolor == errorcolor){
      // エラーだからfalseを返す
      check_result = false;
      // メッセージを足していく
      error_message += "｢売掛率｣";
    }
    if(this.state.quantity != "" && this.state.quantity <= 0){
      check_result = false;
      error_message += "｢数量｣";
    }
    if(this.state.filter_ym_bordercolor == errorcolor){
      check_result = false;
      error_message += "｢使用期限｣";
    }
    // メッセージを返す
    return error_message;

  }

  // 登録完了アラート
  completedAlert(){
    
    // メッセージ初期値
    var msg = "";
    // 画面遷移
    var screen_transition = "";

    if(this.state.screen_type == 0){
      msg = "登録が完了しました。"
      screen_transition = this.props.navigation.navigate('Home', {login_info:this.state.login_info});
    }
    if(this.state.screen_type == 1){
      msg = "修正が完了しました。"
      screen_transition = this.props.navigation.navigate('MyPageList', {login_info:this.state.login_info});
    }

    Alert.alert(
      // Androidのセンタリング不可
      '完了',
      msg,
      [
        {text: 'OK', onPress: () => screen_transition}
      ],
      // アラート以外の箇所をタップでキャンセルをしないようにする
      { cancelable: false }
    )

  }



}




//////////////////////// ここからSCC /////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    // 画面全体の背景色
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
    // text「薬品名」
    marginLeft:textLeft,
    marginTop:30,
  },
  loginPwd: {
    // text「使用期限」「備考」
    marginLeft:textLeft,
    marginTop:10,
  },
  textInput: {
    // 「薬品名」のテキストボックス
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
  textInputDrugNameFalse: {
    // 「薬品名」のテキストボックス(修正時)
    marginTop:5,
    marginLeft:textLeft,
    paddingLeft:10,
    paddingRight:10,
    width:textInputWidth,
    height:40,
    backgroundColor: '#F2F2F2',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',    
  },
  textInput3:{
    // 「備考」テキストボックス
    marginTop:5,
    marginLeft:textLeft,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
    width:textInputWidth,
    height:100,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',
    textAlignVertical: 'top',
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
  textInputOneThirdFalse:{
    // 「薬価」のテキストボックス
    marginTop:5,
    marginLeft:textLeft,
    paddingLeft:10,
    paddingRight:10,
    width:textInputWidthThird + 10,
    height:40,
    backgroundColor: '#F2F2F2',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',    
  },
  textInputTwoThirds:{
    marginTop:5,
    marginLeft:15,
    paddingLeft:10,
    paddingRight:10,
    width:textInputWidthThird - 10,
    height:40,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    // borderColor:'#d6d7da',    
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
  textInputUnitAmount:{
    marginTop:5,
    marginLeft:textLeft,
    paddingLeft:10,
    paddingRight:10,
    width: textInputWidthThird + 10,
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
  textInputInPanelPriceEntry:{
    marginTop:10,
    marginLeft:10,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
    width:textInputWidthThird*2 - 50,
    height:40,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',
    position: 'absolute',
    right: 35,
    color:'red',
  },
  textInputInPanelPriceEntryFalse:{
    marginTop:10,
    marginLeft:10,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
    width:textInputWidthThird*2 - 50,
    height:40,
    backgroundColor: '#F2F2F2',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',
    position: 'absolute',
    right: 35,
    color:'red',
  },
  textDropdown: {
    marginTop:1,
    marginLeft:textLeft-10,
    paddingLeft:10,
    paddingRight:10,
    width:textInputWidth+20,
    height:40,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',
    borderRadius:0,    
    justifyContent: 'center',
  },
  textInPanel:{
    marginTop:20,
    marginLeft:10,
    textAlign:'left',
  },
  
  textLeft:{
    // text「価格」～「[単位]」まで
    marginLeft:textLeft,
    marginTop:10,
    textAlign: 'left' 
  },
  textLeftNonMarginTop:{
    marginLeft:textLeft,
    marginTop:0,
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
  textOneString: {
  	color: '#000',
  	marginTop:15,
  	marginLeft:10,
  	width: 20,
    alignItems: 'center',
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
  panelDetailRowNonColor:{
    height:60,
    marginTop:15,
    marginLeft:20,
    marginRight:20,
    backgroundColor: '#FFF8E8',
    flexDirection: 'row',
  },
  panelTouchPhoto:{
    height:140,
    width:textInputWidthHalf - 3,
    marginTop:10,
    marginTop:5,
    marginRight:3,
    backgroundColor: '#FAFAFA',
    borderWidth:1,
    borderColor:'#d6d7da',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
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
  imagePhoto:{
    height:140,
    width:textInputWidthHalf - 3,
  },
  dropDownStyleYear:{
    marginTop:2,
    marginLeft:2,
    paddingLeft:0,
    paddingRight:0,
    width:textInputWidthThird-6,
    height:38,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    //borderColor:normal_code,
    justifyContent: 'center',

  },
  dropDownStyleMonth:{
    marginTop:2,
    marginLeft:2,
    width:textInputWidthThird - 20 - 6,//margin+border+border+margin = 6
    height:34,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',
    justifyContent: 'center',

  },
  dropDownStyleUnit:{
    marginTop:5,
    marginLeft:15,
    paddingLeft:0,
    paddingRight:0,
    //paddingBottom:10,
    width:textInputWidthThird-10,
    height:40,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',
    justifyContent: 'center',

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
  dropDownLogoStyleMonth:{
    height:15,
    width:8,
    transform: [{ rotate: '90deg' }],
    backgroundColor: '#fff',
    position: "absolute",
    marginTop:17,
    left: textLeft + textInputWidthThird + 30 + textInputWidthThird - 20 - 20,
  },
  dropDownLogoStyleUnit:{
    height:15,
    width:8,
    transform: [{ rotate: '90deg' }],
    backgroundColor: '#fff',
    position: "absolute",
    marginTop:17,
    left: textLeft + textInputWidthThird + 10 + 15 + textInputWidthThird -10 -20,
  },
});
