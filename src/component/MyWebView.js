import React, { Component } from 'react';
import { WebView } from 'react-native';
import ARKitWebView from './ARKitWebView'

export default class MyWebView extends Component {
    render() {
        let isARKit = this.props.navigation.getParam('isARKit', false);
        let uri = this.props.navigation.getParam('uri');
        if(isARKit) {
            return (
                <ARKitWebView
                    source={uri}
                    style={{flex: 1}}
                />
            );
        }
        else {
            return (
                <WebView
                    source={{uri}}
                    style={{flex: 1}}
                    scrollEnabled={false}
                />
            );
        }

    }
}
