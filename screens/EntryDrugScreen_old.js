import React,{Component} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions,TextInput,ScrollView,FlatList,SafeAreaView,Picker } from 'react-native';
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
  


export default class EntryDrugScreen extends React.Component {  

  GetDrugList(value){
      var url = 'http://192.168.5.101:3000/GetDrug';
//      var url = 'http://52.155.111.201:3100/GetDrug';
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
    var url = 'http://192.168.5.101:3000/EntryDrug';
//    var url = 'http://52.155.111.201:3100/EntryDrug';
    axios.post(url,{
      drug_code_yj:(this.state.selectedDrug.code_yj != "") ? this.state.selectedDrug.code_yj : 0,
      member_id: 1,
      expiration_year: (this.state.expiration_year != "") ? this.state.expiration_year : 9999,
      expiration_month: (this.state.expiration_month != "") ? this.state.expiration_month : 99,
      price: (this.state.calc_price != "") ? this.state.calc_price : 0,
      ratio: (this.state.ratio != "") ? this.state.ratio : 0,
      quantity: (this.state.quantity != "") ? this.state.quantity : 0,
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



  constructor(props) {
    super(props)
    this.state = {
      filter_drug_name:"",
      drug_code_jan:"",
      drug_price:"",
      ratio:"",
      quantity:"",
      postage:"",
      calc_price:0,
      expiration_year:"",
      expiration_month:"",
      note:"",
      image_01:null,
      image_02:null,
      image_03:null,
      image_04:null,
      image_05:null,
      image_06:null,
      
      image_01_base64:null,
      image_02_base64:null,
      image_03_base64:null,
      image_04_base64:null,
      image_05_base64:null,
      image_06_base64:null,

      member_id:1,
      listDrug: [], 
      selectedDrug: [],
      isSelected:false,
      
      selectedValue: null
    }
  }




  render(){
  const { navigate } = this.props.navigation;
  
  let { image_01,image_02,image_03,image_04,image_05,image_06 } = this.state;
  

  
  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled={true} scrollEnabled={true}>
        <Text style={styles.loginID}>薬品名</Text> 
        <TextInput id="loginId" editable={true} style={styles.textInput}
          onChangeText = {(value)=> this.getDrugList(value)}
        >{this.state.filter_drug_name}</TextInput> 
        
        {
          this.state.isSelected ?
            
            <Text style={styles.textLeftNonMarginTop}>JAN / {this.state.drug_code_jan}</Text>
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
          <Text style={{ marginTop:10, marginLeft:styles.textInputOneThird.width -65 }}>[定価]</Text> 
          <Text style={{ marginTop:10, marginLeft:styles.textInputOneThird.width -35 }}>[％]</Text> 
          <Text style={{ marginTop:10, marginLeft:styles.textInputOneThird.width -50 }}>[個数]</Text> 
        </View>
        
        <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
          <TextInput id="drugPrice" editable={false} style={styles.textInputOneThirdFalse} keyboardType='numeric' textAlign='right'
            onChangeText = {(value)=> this.setState({drug_price:value, calc_price:(value * (this.state.ratio/100) * this.state.quantity)})}
            
          >{this.state.drug_price}</TextInput> 
          
          <TextInput id="ratio" editable={true} style={styles.textInputTwoThirds} keyboardType='numeric' textAlign='right'
            onChangeText = {(value)=> this.setState({ratio:value, calc_price:(this.state.drug_price * (value/100) * this.state.quantity)})}
            
          >{this.state.ratio}</TextInput> 
          
          <TextInput id="quantity" editable={true} style={styles.textInputThreeThirds} keyboardType='numeric' textAlign='right'
            onChangeText = {(value)=> this.setState({quantity:value, calc_price:(this.state.drug_price * (this.state.ratio/100) * value)})}
            
          >{this.state.quantity}</TextInput> 
        
        </View>
        
        
        
        <View style={styles.panelDetailRowNonColor} >
          <Text style={{marginTop:20,marginLeft:styles.textInputInPanelPriceEntry.width -100}} >送料</Text> 
          <TextInput id="loginId" editable={true} style={styles.textInputInPanelPriceEntry} keyboardType='numeric' textAlign='right'
            //onChangeText = {(value)=> this.setState({postage:value, calc_price:(parseInt(this.state.calc_price) + parseInt(value))})}
            onChangeText = {(value)=> this.setState({postage:value, calc_price:this.state.calc_price})}
          >{this.state.postage}</TextInput>
          <Text style={styles.textOneStringPrice}>円</Text> 
        </View>
        
        
        <View style={styles.panelDetailRowFirst} >
          <Text style={{marginTop:20,marginLeft:styles.textInputInPanelPriceEntry.width -100,}} >合計金額</Text> 
          <TextInput id="loginId" editable={false} style={styles.textInputInPanelPriceEntryFalse} keyboardType='numeric' textAlign='right'>{this.state.calc_price*1 + this.state.postage*1}</TextInput>
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
            style={{ flexDirection: 'row'}}
            //style = {styles.dropDownStyleYear}
          >
          <Picker
            style={styles.dropDownStyleYear}
            itemStyle={{ color: 'blue' }}
            selectedValue={this.state.expiration_year}
            mode="dropdown"
            onValueChange={(value) => {
              this.setState({ expiration_year: value });
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
            style={{ flexDirection: 'row'}}
            //style = {styles.dropDownStyleMonth}
          >
          <Picker
            style={styles.dropDownStyleMonth}
            itemStyle={styles.dropDownItemStyle}
            selectedValue={this.state.expiration_month}
            mode="dropdown"
            onValueChange={(value) => {
              this.setState({ expiration_month: value });
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
          onChangeText = {(value)=> this.setState({note:value})}
        >{this.state.note}</TextInput>
        
        <View style={{ flexDirection: 'row'}}>
          <Text style={styles.textLeft}>画像</Text> 
          <Text style={styles.textRight}>[JANコード、ロット番号、使用期限等]</Text>       
        </View>

        <View style={{ justifyContent: 'center', flexDirection: 'column'}}>

          <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            
            <TouchableOpacity style={styles.panelDrugInList} onPress={()=>this._takePhoto(1)}>
              <View style={styles.panelPhotoLeft}>
                {
                  image_01 ?
                  <Image
                    source={{uri:image_01}}
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
                  image_02 ?
                  <Image
                    source={{uri:image_02}}
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
                  image_03 ?
                  <Image
                    source={{uri:image_03}}
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
                  image_04 ?
                  <Image
                    source={{uri:image_04}}
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
                  image_05 ?
                  <Image
                    source={{uri:image_05}}
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
                  image_06 ?
                  <Image
                    source={{uri:image_06}}
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
          onPress = {()=> this.entryDrug()}
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
      drug_code_jan:item.code_jan,
      drug_price:item.price,
      calc_price:(item.price * (this.state.ratio/100) * this.state.quantity),
      listDrug:[]
      });
    
    console.log(this.state.listDrug);    
    console.log(item);
  }


  entryDrug = () => {
    console.log('entry_Start');
    this.EntryDrug();
    
    this.props.navigation.navigate('Home');
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
  textInput3:{
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
    marginTop:5,
    marginLeft:0,
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
    marginTop:5,
    marginLeft:textLeft,
    paddingLeft:0,
    paddingRight:0,
    //paddingBottom:10,
    width:textInputWidthThird,
    height:40,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#d6d7da',
    justifyContent: 'center',

  },
  dropDownStyleMonth:{
    marginTop:5,
    marginLeft:0,
    paddingLeft:0,
    paddingRight:0,
    //paddingBottom:10,
    width:textInputWidthThird - 20,
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
});
