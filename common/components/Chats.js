import React from 'react';
import {
    StyleSheet,
    View,
    Animated,
    WebView,
    Image,
    TouchableOpacity,
} from 'react-native';
import MyIcon from './lib/MyIcon';
import { colors } from './lib/src/styles/index.style';
import { S3_IMAGE_PATH, ROUTES, MESSENGER_TEXT, WHATS_APP_TEXT, MESSENGER_URL } from '../constants';
import { openApp } from '../constants/Utility'
const imagePath = S3_IMAGE_PATH + '/chatIcons/';

export default class Chats extends React.Component {
    
    state = {
        scale: new Animated.Value(0),
        chatView: null
    }

    componentDidMount() {
        const chatView = <WebView
            source={{ uri: 'https://tawk.to/chat/57cada172b03647ba16fdffe/default' }}
            javaScriptEnabled={true}
            injectedJavaScript={this.generateJSCode()}
            mixedContentMode={'compatibility'}
        />;

        this.setState({ chatView });
    }

    generateJSCode() {
        let jsCode = `
                setTimeout(() => {
                    var iframe = document.getElementsByTagName("iframe");
                    var elmnt = iframe[0] ? iframe[0].contentWindow.document.getElementById("topBarContainer") : null;
                    if(elmnt){
                        elmnt.style.display = "none";
                    }
                }, 500)`;

        return jsCode;
    }

    handleTawkToPress = () => {
        this.props.navigation.navigate(ROUTES.WEB_VIEW, { view: this.state.chatView, noOverlay: true });
    }

    handleWatsAppPress = () => {
        openApp(WHATS_APP_TEXT);
    }

    handleClearPress = () => {
        this.props.toggleChatComponent(false);
    }

    handleMessangerPress = () => {
        openApp(MESSENGER_URL);
    }

    render() {
        const { cell, row, customPosition, discard, icon, filterImage} = styles;

        return (
            <View style={[styles.container]}>
                <View style={[cell, row]}>
                    <View style={cell}></View>
                    <View style={cell}>
                        <View style={[cell, row]}>
                            <TouchableOpacity style={[cell, {height: 80}]} onPress={this.handleTawkToPress}>
                                <Image style={[filterImage, {marginLeft: -20, marginTop: -10}]} source={{ uri: imagePath + 'comments.png?v=9'}} />
                            </TouchableOpacity>
                            <TouchableOpacity style={cell} onPress={this.handleWatsAppPress}>
                                <Image style={[filterImage, customPosition]} source={{ uri: imagePath + 'wapp.png' }} />
                            </TouchableOpacity>
                        </View>
                        <View style={[cell, row]}>
                            <TouchableOpacity style={cell} onPress={this.handleClearPress}>
                                <View style={discard}>
                                    <MyIcon name='clear'
                                        style={icon}
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={cell} onPress={this.handleMessangerPress}>
                                <Image style={[filterImage, {marginLeft: 10, marginTop: 10}]} source={{ uri: imagePath + 'messanger.png' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={cell}></View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        left: -150,
        bottom: -150,
        backgroundColor: colors.background1,
        width: 300,
        height: 300,
        elevation: 10,
        borderRadius: 200,
        elevation: 10
    },
    cell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row'
    },
    customPosition: {
        marginLeft: -45,
        marginTop: 65
    },
    discard: {
        marginLeft: -10,
        marginTop: 10,
        backgroundColor: colors.background2,
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 17,
        elevation: 5
    },
    icon: {
        fontWeight: '900'
    },
    filterImage: {
        height: 35,
        width: 35
    }
});