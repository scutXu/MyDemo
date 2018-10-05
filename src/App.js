import React, { Component } from 'react';
import {
    StyleSheet,
    WebView,
    Text,
    Dimensions,
} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ProfileScreen from './screen/ProfileScreen';
import DemoScreen from './screen/DemoScreen';
import CommentScreen from './screen/CommentScreen'
import MyWebView from "./component/MyWebView";

let screenHeight = Dimensions.get('window').height;
let tarbarHeight = screenHeight / 12.5;
let labelFontSize = tarbarHeight / 4.5;
let iconFontSize = labelFontSize * 2;
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];
console.disableYellowBox = true;


const MainTabNavigator = createBottomTabNavigator(
    {
        Profile: ProfileScreen,
        Demo: DemoScreen,
        Comment: CommentScreen
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if(routeName === "Profile") {
                    iconName = "user-circle";
                }
                else if(routeName === "Demo") {
                    iconName = "html5";
                }
                else {
                    iconName = "commenting";
                }
                return <FontAwesome color = {tintColor} name = {iconName} style = {{fontSize: iconFontSize}}/>;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
            style: {
                height: tarbarHeight,
            },
            /*tabStyle: {
                backgroundColor: 'rgba(255, 255, 0, 1)',
            },*/
            labelStyle: {
                fontSize: labelFontSize,
            }
        },
    }
);

MainTabNavigator.navigationOptions = ({navigation}) => {
    if(navigation.state.index === 2) {
        //如果是CommentScreen，则不显示header bar
        //为了在CommentScreen右上角增加一个header button，另外创建了一个stack，如果这里不隐藏，就会有两个头部栏
        return {
            header: null
        };
    }
    return {};
};

export default createStackNavigator(
    {
        MainTab: MainTabNavigator,
        MyWebView: MyWebView,
    }
);
