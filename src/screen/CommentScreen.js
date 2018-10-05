import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    TextInput,
    RefreshControl,
    ActivityIndicator,
    FlatList,
    View,
} from 'react-native';
import {createStackNavigator} from "react-navigation";
import {
    SERVER
} from '../utils/constants'
import {
    alighToHeight,
} from "../utils/sizeUtils";
import RNFetchBlob from "rn-fetch-blob";

const PAGE_SIZE = 6;

class CommentDisplayView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button
                    onPress={()=>{navigation.navigate("EditView", {triggerRefresh: navigation.getParam('triggerRefresh')})}}
                    title="Edit"
                    color={"black"}
                />
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            loading: false,
            noMoreData: false,
            remoteData: [],
        };
    }

    componentDidMount() {
        this._triggerRefresh();
        this.props.navigation.setParams({ triggerRefresh: this._triggerRefresh });
    }

    _triggerRefresh = () => {
        if(!this.state.refreshing) {
            this.setState({refreshing: true, noMoreData: false});
            RNFetchBlob.fetch('GET', SERVER + 'comments?_limit=' + PAGE_SIZE + '&_sort=id&_order=desc').then((res)=>{
                let status = res.info().status;
                if(status == 200) {
                    let json = res.json()
                    if(json.length < PAGE_SIZE) {
                        this.setState({noMoreData: true});
                    }
                    this.setState({remoteData: json});
                }
                this.setState({refreshing: false});
            }).catch((err)=>{
                this.setState({refreshing: false});
            });
        }
    }

    _triggerLoad() {
        if(!this.state.loading && !this.state.noMoreData && !this.state.refreshing) {
            this.setState({loading: true});
            let page = Math.floor(this.state.remoteData.length / PAGE_SIZE) + 1;
            RNFetchBlob.fetch('GET', SERVER + 'comments?_limit=' + PAGE_SIZE + '&_sort=id&_order=desc' + '&_page=' + page).then((res)=>{
                let status = res.info().status;
                if(status == 200) {
                    let json = res.json()
                    if(json.length < PAGE_SIZE) {
                        this.setState({noMoreData: true});
                    }
                    this.setState({remoteData: [...this.state.remoteData, ...json]});
                }
                this.setState({loading: false});
            }).catch((err)=>{
                this.setState({loading: false});
            });
        }
    }

    _renderFooter() {
        if(this.state.loading) {
            return (<ActivityIndicator/>);
        }
        else if(this.state.noMoreData){
            return (<Text style={{textAlign: 'center', padding: 8}}>没有更多的评论了</Text>);
        }
        else {
            return null;
        }
    }

    _renderItem = ({item}) => {
        return (
            <Text style={styles.commentItem}>
                {item.content}
            </Text>
        )
    }

    _renderSeperator = () => {
        return (
            <View style={styles.seperator}/>
        )
    }

    _keyExtractor = (item, index) => item.id;

	render() {
        return (
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._triggerRefresh}
                    />
                }
                data = {this.state.remoteData}
                contentContainerStyle={styles.list}
                renderItem={this._renderItem}
                onEndReached={()=>this._triggerLoad()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={this._renderFooter()}
                ItemSeparatorComponent={this._renderSeperator}
                keyExtractor={this._keyExtractor}
            />
        );
    }
}

class CommentEditView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button
                    onPress={navigation.getParam('submit')}
                    title="Submit"
                    disabled={navigation.getParam('textEmpty')}
                    color={"black"}
                />
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            text: "",
        };

    }

    componentDidMount() {
        this.props.navigation.setParams({ submit: this._onSubmit });
        this.props.navigation.setParams({ textEmpty: true });
    }

    _onSubmit = () => {
        RNFetchBlob.fetch('POST', SERVER + "comments",
            {'Content-Type': 'application/json',},
            JSON.stringify({
                content: this.state.text,
        })).then((res) => {
            let triggerRefresh = this.props.navigation.getParam('triggerRefresh', null);
            if(triggerRefresh !== null) {
                triggerRefresh();
            }
            this.props.navigation.navigate("DisplayView");

        }).catch((err) => {
            alert("fail to post");
        });

    }

    _onTextChanged = (text) => {
        this.setState({text});
        let textEmpty = text === "";
        this.props.navigation.setParams({ textEmpty });
    }

    render() {
        return (
            <TextInput
                style={styles.textInput}
                placeholder="Leave your comments"
                multiline={true}
                onChangeText={this._onTextChanged}
            />
        );
    }
}

export default createStackNavigator(
    {
        DisplayView: CommentDisplayView,
        EditView: CommentEditView,
    }
);

const styles = StyleSheet.create({
    seperator: {
        height: 1,
        backgroundColor: 'gray',
    },

    commentItem: {
        minHeight: alighToHeight(1 / PAGE_SIZE),
        padding: 8,
    },

    textInput: {
        height: alighToHeight(0.4),
        borderWidth: 2,
        textAlignVertical: 'top',
        margin: 8,
        padding: 8,
    }
});
