import React,{Component} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions,TextInput,Alert, ScrollView,Picker } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Checkbox from 'react-native-modest-checkbox'
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
  
  const error_code = "#ff0000";
  const normal_code = "#d6d7da";

export default class SearchScreen extends Component {  

  constructor(props) {
    super(props)
    this.state = {
      filter_drug_name:"",
      filter_price_lower:"",
      filter_price_upper:"",
      filter_quantity_lower:"",
      filter_quantity_upper:"",
      filter_expiration_lower:"",
      filter_expiration_lower_y:"",
      filter_expiration_lower_m:"",
      filter_expiration_upper:"",
      filter_expiration_upper_y:"",
      filter_expiration_upper_m:"",
      price_bordercolor:normal_code,
      quantity_bordercolor:normal_code,
      ym_bordercolor:normal_code,
      login_info: this.props.navigation.state.params.login_info,
    };
  }

  render(){
  const { navigate } = this.props.navigation;
  console.log("商品検索" + this.state.login_info.name)
  return (
    <View style={styles.container}>
{/*
      <Text style={styles.loginID}>薬品名</Text> 
      <TextInput id="loginId" editable={true} style={styles.textInput}
      ></TextInput> 

*/}
      <ScrollView>
        <Text style={styles.loginID}>薬品名</Text> 
        <TextInput id="loginId" editable={true} style={styles.textInput} maxLength={100}
          onChangeText = {(value)=> this.setState({filter_drug_name:value})}
        >{this.state.filter_drug_name}</TextInput> 
        <Text style={styles.loginPwd}>販売価格</Text> 
        <View style={{ justifyContent: 'center', flexDirection: 'row'}}>

          <TextInput id="loginId" editable={true} keyboardType='numeric' textAlign='right' maxLength={8}
            onChangeText = {(value)=> this.inputCheck(value,this.state.filter_price_upper,'1')}
            style={[styles.textInputHalfLeft, {borderColor:this.state.price_bordercolor}]}>
          {this.state.filter_price_lower}</TextInput> 
          
          <Text style={styles.textOneString}>～</Text> 
          
          <TextInput id="loginId" editable={true} keyboardType='numeric' textAlign='right' maxLength={8}
            onChangeText = {(value)=> this.inputCheck(this.state.filter_price_lower,value,'1')}
            style={[styles.textInputHalfRight, {borderColor:this.state.price_bordercolor}]}>
          {this.state.filter_price_upper}</TextInput> 
          
          <Text style={styles.textOneString}>円</Text> 
        
        </View>
        
        <Text style={styles.loginPwd}>個数</Text> 
        <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
          <TextInput id="loginId" editable={true}  keyboardType='numeric' textAlign='right' maxLength={5}
            onChangeText = {(value)=> this.inputCheck(value,this.state.filter_quantity_upper,'2')}
            style={[styles.textInputHalfLeft, {borderColor:this.state.quantity_bordercolor}]}
          >{this.state.filter_quantity_lower}</TextInput> 
          
          <Text style={styles.textOneString}>～</Text> 
          <TextInput id="loginId" editable={true} keyboardType='numeric' textAlign='right' maxLength={5}
            onChangeText = {(value)=> this.inputCheck(this.state.filter_quantity_lower,value,'2')}
            style={[styles.textInputHalfRight, {borderColor:this.state.quantity_bordercolor}]}
          >{this.state.filter_quantity_upper}</TextInput> 
          
          <Text style={styles.textOneString}>個</Text> 
        </View>      
        
        <Text style={styles.loginPwd}>使用期限</Text> 
        <View style={{ flexDirection: 'row'}}>
          {/*
          <TextInput id="loginId" editable={true} style={styles.textInputOneThird} keyboardType='numeric' textAlign='right' maxLength={4}
            onChangeText = {(value)=> this.setState({filter_expiration_lower_y:value})}
          >{this.state.filter_expiration_lower_y}</TextInput> 
          */}
            <View 
              style={{ flexDirection: 'row', width:textInputWidthThird,  height:40,backgroundColor: "#fff",
                      marginLeft:textLeft,borderRadius:5, borderWidth:1, borderColor: this.state.ym_bordercolor}}
              //style = {styles.dropDownStyleYear}
            >
            <Picker
              style={styles.dropDownStyleYear}
              itemStyle={{ color: 'blue' }}
              selectedValue={this.state.filter_expiration_lower_y}
              mode="dropdown"
              onValueChange={(value) => this.inputExpirationLimit(value, this.state.filter_expiration_lower_m,
              this.state.filter_expiration_upper_y, this.state.filter_expiration_upper_m)}>
              <Picker.Item label= ""                   value={ "" } />
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
            onChangeText = {(value)=> this.setState({filter_expiration_lower_m:value})}
          >{this.state.filter_expiration_lower_m}</TextInput> 
          */}
            <View
              style={{ flexDirection: 'row', width:textInputWidthThird - 20,
                      backgroundColor:(this.state.filter_expiration_lower_y != "") ? "#fff" : "#f5f5f5",
                      borderRadius:5, borderWidth:1, borderColor: this.state.ym_bordercolor}}
              //style = {styles.dropDownStyleMonth}
            >
            <Picker
              style={styles.dropDownStyleMonth}
              enabled={(this.state.filter_expiration_lower_y != "") ? true : false}
              itemStyle={styles.dropDownItemStyle}
              selectedValue={this.state.filter_expiration_lower_m}
              mode="dropdown"
              onValueChange={(value) => {this.inputExpirationLimit(this.state.filter_expiration_lower_y,value,
                                                          this.state.filter_expiration_upper_y, this.state.filter_expiration_upper_m);}}>
              <Picker.Item label= ""    value={ "" } />
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
        
        <Text style={styles.loginPwd}>～</Text> 
        
        <View style={{ flexDirection: 'row'}}>
          {/*
          <TextInput id="loginId" editable={true} style={styles.textInputOneThird} keyboardType='numeric' textAlign='right' maxLength={4}
            onChangeText = {(value)=> this.setState({filter_expiration_upper_y:value})}
          >{this.state.filter_expiration_upper_y}</TextInput> 
          */}
            <View 
              style={{ flexDirection: 'row', width:textInputWidthThird, height:40, backgroundColor: "#fff",
                      marginLeft:textLeft, borderRadius:5, borderWidth:1, borderColor: this.state.ym_bordercolor}}
              //style = {styles.dropDownStyleYear}
            >
            <Picker
              style={styles.dropDownStyleYear}
              itemStyle={{ color: 'blue' }}
              selectedValue={this.state.filter_expiration_upper_y}
              mode="dropdown"
              onValueChange={(value) => {this.inputExpirationLimit(this.state.filter_expiration_lower_y, this.state.filter_expiration_lower_m,
                                                          value, this.state.filter_expiration_upper_m);}}>
              <Picker.Item label=""                    value={ "" } />
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
            onChangeText = {(value)=> this.setState({filter_expiration_upper_m:value})}
          >{this.state.filter_expiration_upper_m}</TextInput>
          */}
          
            <View 
              style={{ flexDirection: 'row', width:textInputWidthThird - 20, 
                      backgroundColor:(this.state.filter_expiration_upper_y != "") ? "#fff" : "#f5f5f5",
                      borderRadius:5, borderWidth:1, borderColor: this.state.ym_bordercolor}}
              //style = {styles.dropDownStyleMonth}
            >
            <Picker
              style={styles.dropDownStyleMonth}
              enabled={(this.state.filter_expiration_upper_y != "") ? true : false}
              itemStyle={styles.dropDownItemStyle}
              selectedValue={this.state.filter_expiration_upper_m}
              mode="dropdown"
              onValueChange={(value) => {this.inputExpirationLimit(this.state.filter_expiration_lower_y, this.state.filter_expiration_lower_m,
                                                          this.state.filter_expiration_upper_y, value);}}>
              <Picker.Item label= ""    value={ "" } />  
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
        <TouchableOpacity  
          onPress = {()=> this.screenTransitions()}      
          style={styles.loginButton}>
          <Text style={styles.loginBtnText}>検索する</Text>
        </TouchableOpacity>                             
      </ScrollView>
    </View>
  );
  }
  
  // 販売価格、個数の入力チェックメソッド
  inputCheck(check_value_lower,check_value_upper,check_type){
    // check_value_lower = 入力された値
    // check_type = チェックする条件分岐(1:販売価格 2:個数)
    var result_color = ''
    
    // 販売価格チェック
    if(check_type == 1){
      // 販売価格の最小、最大どちらも入力されている場合チェック行う
      if(check_value_lower != '' && check_value_upper != ''){
        
        // 大小チェック
        // 最小                            > 最大
        if(Number(check_value_lower) > Number(check_value_upper)){
          // 大小条件:エラー
          result_color = error_code
          
        }
        else{
          // 大小条件:正常
          result_color = normal_code
        }
      }
      else{
        // 大小どちらが空白の場合は、チェックなし
        result_color = normal_code
      }

    }
    else{
      // 個数チェック
      // 個数の最小、最大どちらも入力されている場合チェック行う
      if(check_value_lower != '' && check_value_upper != ''){
        
        // 大小チェック
        // 最小                            > 最大
        if(Number(check_value_lower) > Number(check_value_upper)){
          // 大小条件:エラー
          result_color = error_code
          
        }
        else{
          // 大小条件:正常
          result_color = normal_code
        }
      }
      else{
        result_color = normal_code
        // 大小どちらが空白の場合は、チェックなし
      }

    }

    if(check_type == 1){
      this.setState({price_bordercolor:result_color,
        filter_price_lower:check_value_lower,
        filter_price_upper:check_value_upper});
    }
    else{
      this.setState({quantity_bordercolor:result_color,
        filter_quantity_lower:check_value_lower,
        filter_quantity_upper:check_value_upper});
    }
    
  }

  // 使用期限チェック
  inputExpirationLimit(lower_year,lower_month,upper_year,upper_month){

    // 範囲条件チェック
    this.checkExpirationLimit(lower_year,lower_month,upper_year,upper_month);

    // 確定
    this.setExpirationLimit(lower_year,lower_month,upper_year,upper_month);
  
  }

  // 使用期限　範囲条件チェック
  // チェック結果をborderColorにセット
  checkExpirationLimit(lower_year,lower_month,upper_year,upper_month){
    var result_color = ""     // 枠線カラー用変数

    /* 空白を仮の値に変換 */
    // 最小使用期限年処理用
    var fixed_lower_year = (lower_year != "")?lower_year:'0'; 
    // 最小使用期限月処理用 
    var fixed_lower_month = (lower_month != "")?('00' + lower_month).slice(-2):'00'; 
    // 最大使用期限年処理用
    var fixed_upper_year = (upper_year != "")?upper_year:'9999';
    // 最大使用期限月処理用
    var fixed_upper_month = (upper_month != "")?('00' + upper_month).slice(-2):'99'; 

    /* 年月を結合して比較用文字列を作成 */
    // 最小使用期限年月
    var lower_expiration_limit = "" + fixed_lower_year +  fixed_lower_month
    // 最大使用期限年月
    var upper_expiration_limit = "" + fixed_upper_year +  fixed_upper_month


    /* 大小チェック */
    // 最小使用年月 > 最大使用年月
    if(lower_expiration_limit > upper_expiration_limit){
      // 大小条件:エラー
      result_color = error_code
    }
    else{
      // 大小条件：正常
      result_color = normal_code
    }
    
    /* 判定結果を格納 */
    this.setState({
      ym_bordercolor:result_color,
      filter_expiration_lower:lower_expiration_limit,
      filter_expiration_upper:upper_expiration_limit,
    });
  }

　// 使用期限　確定
  // 使用期限をfilterにセット
  setExpirationLimit(lower_year,lower_month,upper_year,upper_month){
    this.setState({
      filter_expiration_lower_y:lower_year,
      filter_expiration_lower_m:(lower_year != "")?lower_month:"",
      filter_expiration_upper_y:upper_year,
      filter_expiration_upper_m:(upper_year != "")?upper_month:"",
      })
  }


  // 画面遷移処理
  screenTransitions(){

    // エラーがないかチェック
    var check_result = this.errorCheck()

    if(check_result == true){
      // エラー有：メッセージを出す。
      Alert.alert(
        '検索条件エラー',
        '検索条件の入力に誤りがあります。',
      );
    }
    else{
      // エラー無：画面遷移
      this.props.navigation.navigate('SearchList',{filter:this.state,
                                                   login_info:this.state.login_info})  
    }

  }
  // エラー有無のチェック処理
  errorCheck(){
    var result_check = false

    // 販売価格チェック
    if(this.state.price_bordercolor != normal_code){
      result_check = true
    }
    // 個数チェック
    if(this.state.quantity_bordercolor !=normal_code){
      result_check = true
    }
    //使用期限チェック
    if(this.state.ym_bordercolor != normal_code){
      result_check = true
    }

    return result_check;

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
    borderColor:normal_code,    
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
    borderColor:normal_code,    
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
    borderColor:normal_code,    
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
    borderColor:normal_code,    
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
  dropDownStyleYear:{
    marginTop:2,
    marginLeft:2,
    paddingLeft:0,
    paddingRight:0,
    width:textInputWidthThird-6,
    height:34,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:1,
    //borderColor:normal_code,
    justifyContent: 'center',

  },
  dropDownStyleMonth:{
    marginTop:2,
    marginLeft:2,
    width:textInputWidthThird - 20 - 6, //margin+border+border+margin = 6
    height:34,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:5,
    //borderColor:normal_code,
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
    borderRadius:5,
    borderWidth:1,
  },
  dropDownLogoStyleMonth:{
    height:15,
    width:8,
    transform: [{ rotate: '90deg' }],
    backgroundColor: '#fff',
    position: "absolute",
    marginTop:17,
    left: textLeft + textInputWidthThird + 30 + textInputWidthThird - 20 - 20,
    borderRadius:5,
    borderWidth:1,
  },

});
