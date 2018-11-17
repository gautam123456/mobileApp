import React from 'react';
import { View, Platform } from 'react-native';
import MyIcon from './MyIcon';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from './src/styles/index.style';
import MyStatusBar from './MyStatusBar';
import { ROUTES } from '../../constants';
import Text from './LPText';

export default class ActivityHeader extends React.Component {
    render() {
        const { heading } = this.props;

        return (
            <View style={styles.content}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colors.background2, colors.background1]} style={styles.linearGradient}>
                    <MyStatusBar />
                    <View style={styles.header}>
                        <View><Text></Text></View>
                        <View><Text style={styles.text}>{heading}</Text></View>
                        <View>
                            <MyIcon name='home' onPress={this.handleHomeButtonPress} />
                        </View>
                    </View>
                </LinearGradient>
            </View>
        )
    }

    handleHomeButtonPress = () => {
        this.props.navigation.navigate(ROUTES.HOME);
    }
}

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 60 : 80;

const styles = {
    content: {
        backgroundColor: '#fff',
        elevation: 5,
        height: APPBAR_HEIGHT
    },
    gradient: {
        height: 5
    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        flex: 1,
        paddingVertical: 15
    },
    linearGradient: {
        flex: 1
    },
    text: {
        fontWeight: '900',
        fontSize: 18,
        color: '#fff'
    }
}
