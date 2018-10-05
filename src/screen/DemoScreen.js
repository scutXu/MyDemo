import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    Image,
    View,
    TouchableHighlight,
    Dimensions,
    RefreshControl,
} from 'react-native';
import {
    FONT_SIZE,
    alignToWidth,
} from "../utils/sizeUtils";
import RNFetchBlob from 'rn-fetch-blob'
import MyWebView from "../component/MyWebView";
import {
    SERVER
} from '../utils/constants'

const screenWidth = Dimensions.get('window').width;

let localData = [
    {
        key: "a",
        uri: "https://facebook.github.io/react-native",
        imageUri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        title: "react-native",
        arkitRequired: false,
    },
];


export default class DemoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            remoteData: [],
        };
    }

    componentDidMount() {
        this._triggerRefresh();
    }

    _onPress(uri, isARKit) {
        this.props.navigation.navigate("MyWebView", {uri, isARKit})
    }

    _triggerRefresh() {
        if(!this.state.refreshing) {
            this.setState({refreshing: true});

            RNFetchBlob.fetch('GET', SERVER + 'demos').then((res)=>{
                let status = res.info().status;
                if(status == 200) {
                    let json = res.json()
                    this.setState({remoteData: json});
                }
                this.setState({refreshing: false});
            }).catch((err)=>{
                this.setState({refreshing: false});
            });
        }
    }

    _keyExtractor = (item, index) => item.id;

    render() {
        return (
            <FlatList
                numColumns={2}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={()=>this._triggerRefresh()}
                    />
                }
                data = {this.state.remoteData}
                contentContainerStyle={styles.list}
                renderItem = {({item}) =>
                    <View style={styles.item}>
                        <TouchableHighlight onPress={() => this._onPress(SERVER + item.uri, item.arKitRequired)}>
                            <Image
                                source={{
                                    uri: SERVER + item.iconUri
                                }}
                                style={styles.image}
                            />
                        </TouchableHighlight>
                        <Text style={styles.text}>{item.title}</Text>
                    </View>
                }
                keyExtractor={this._keyExtractor}
            />
        );

    }
}

const styles = StyleSheet.create({
    list: {
        //backgroundColor: 'rgba(255, 0, 255, 1)',
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        //borderWidth: 1,
        width: screenWidth * 0.5,
        height: screenWidth * 0.5,
    },
    image: {
        marginBottom: screenWidth * 0.05,
        width: screenWidth * 0.4,
        aspectRatio: 1.337,
        resizeMode: Image.resizeMode.cover,
        //backgroundColor: 'rgba(0, 0, 255, 1)'
    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        //backgroundColor: 'rgba(0, 255, 0, 1)'
        fontSize: alignToWidth(0.05),
    }
});
