import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

// 画面
import LoginScreen from './screens/Login.js'
import MenuScreen from './screens/MenuScreen.js'
import HomeScreen from './screens/HomeScreen.js'
import SearchScreen from './screens/SearchScreen.js'
import SearchListScreen from './screens/SearchListScreen.js'
import SearchDetailScreen from './screens/SearchDetailScreen.js'
import DrugDealDetailScreen from './screens/DrugDealDetailScreen.js'
import EntryDrugScreen from './screens/EntryDrugScreen.js'
import MyPageScreen from './screens/MyPageScreen.js'
import MyPageListScreen from './screens/MyPageListScreen.js'
import MyPageDetailScreen from './screens/MyPageDetailScreen.js'


//import test_data from './routes.js'

// setting main nav
const MainStack = createStackNavigator(
  {
    Login:{
    	screen:LoginScreen,
    	navigationOptions:{
    		title:'ver 0.9.1',
    		headerStyle:{
    			height:0
    			}
    		}
    },
    Menu:{
    	screen: MenuScreen,
    	navigationOptions:{
    		title:'ログアウト',
    		headerTintColor: '#00AD52',
    		headerBackTitleVisible:null
    		}
    },
    Home:{
    	screen: HomeScreen,
    	navigationOptions:{
    		title:'ホーム',
    		headerTintColor: '#00AD52',
    		headerBackTitleVisible:null
    		}
    },
    Search:{
    	screen: SearchScreen,
    	navigationOptions:{
    		title:'商品検索',
    		headerTintColor: '#00AD52',
    		headerBackTitleVisible:null
    		}
    },
    SearchList:{
    	screen: SearchListScreen,
    	navigationOptions:{
    		title:'商品一覧',
    		headerTintColor: '#00AD52',
    		headerBackTitleVisible:null
    		}
    },
    SearchDetail:{
    	screen: SearchDetailScreen,
    	navigationOptions:{
    		title:'薬品詳細',
    		headerTintColor: '#00AD52',
    		headerBackTitleVisible:null
    		}
    },
    DrugDealDetail:{
    	screen: DrugDealDetailScreen,
    	navigationOptions:{
    		title:'購入完了',
    		headerTintColor: '#00AD52',
    		headerBackTitleVisible:null,
    		headerLeft: null
    		}
    },
    EntryDrug:{
    	screen: EntryDrugScreen,
    	navigationOptions:{
    		title:'薬品登録',
    		headerTintColor: '#00AD52',
    		headerBackTitleVisible:null
    		}
    },
    MyPage:{
    	screen: MyPageScreen,
    	navigationOptions:{
    		title:'マイページ',
    		headerTintColor: '#00AD52',
    		headerBackTitleVisible:null
    		}
	},
	MyPageList:{
		screen: MyPageListScreen,
		navigationOptions:{
			title:'マイページ - 薬品リスト',
			headerTintColor: '#00AD52',
			headerBackTitleVisible:null
			}
	},
	MyPageDetail:{
		screen:MyPageDetailScreen,
		navigationOptions:{
			title:'マイページ - 薬品詳細',
			headerTintColor: '#00AD52',
			headerBackTitleVisible:null
			}
	},


  }
)

const AppContainer = createAppContainer(MainStack)

export default class App extends Component {

  render() {
    return (
      <AppContainer />
    )
  }
}