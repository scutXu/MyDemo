import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image,
    Dimensions,
} from 'react-native';
import RadarChart from '../component/RadarChart'
import {
    FONT_SIZE,
    alignToWidth,
} from "../utils/sizeUtils";
import Octicons from 'react-native-vector-icons/Octicons'

const screenWidth = Dimensions.get('window').width;

export default class ProfileScreen extends Component {
    renderItem(icon, text) {
        return (
            <View style={styles.infoItem}>
                <Octicons name={icon} style={styles.infoIcon}/>
                <Text style={styles.infoText}>{text}</Text>
            </View>
        );
    }


	render() {
        return (
            <ScrollView style = {styles.root}>
                <View style = {[styles.photoContainer, styles.bordered]}>
                    <Octicons style={styles.photo} name="mark-github"/>
                    <View style={styles.introduction}>
                        <Text style={styles.name}>xionglong.xu</Text>
                        <Text style={styles.description}>A programmer who live like a salt fish.</Text>
                    </View>
                </View>
                <Text style={styles.title}>Skill</Text>
                <View style = {styles.bordered}>
                    <RadarChart width={screenWidth} height={screenWidth}/>
                </View>
                <Text style={styles.title}>Info</Text>
                {this.renderItem("mail", "xionglong.xu@gmail.com")}
                {this.renderItem("mortar-board", "South China University of Technology")}
                {this.renderItem("briefcase", "Meitu.Inc")}
            </ScrollView>
        );
  }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    bordered: {
        borderBottomWidth: 2,
        borderColor: 'black',
    },
    photoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    photo: {
        margin: 16,
        height: screenWidth / 3,
        width: screenWidth / 3,
        fontSize: screenWidth / 3,
        color: 'rgba(60, 60, 60, 255)',
    },
    introduction: {
        flex: 1,
        padding: 16,
    },
    description: {
        fontSize: alignToWidth(0.035),
    },
    name: {
        fontSize: alignToWidth(0.05),
        marginBottom: 8,
    },

    title: {
        padding: 16,
        fontSize: FONT_SIZE.h2,
    },
    infoItem: {
        flexDirection: 'row',
        marginHorizontal: 24,
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    infoIcon: {
        fontSize: alignToWidth(0.1),
        marginRight: 16,
    },
    infoText: {
        flex: 1,
        fontSize: alignToWidth(0.05),
        paddingTop: alignToWidth(0.02),
    },
});
