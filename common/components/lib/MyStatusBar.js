import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Platform,
} from 'react-native';
import { colors } from './src/styles/index.style';

export default class MyStatusBar extends Component {
    render() {
        return (
            <View style={[styles.statusBar]}>
                <StatusBar animated={true} backgroundColor={colors.background1} barStyle="light-content" hidden={false} networkActivityIndicatorVisible={true}/>
            </View>
        );
    }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
        backgroundColor: colors.background1
    }
});