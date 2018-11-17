import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import MyIcon from './MyIcon';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from './src/styles/index.style';
import Text from './LPText';

export default class ActivityFooter extends React.Component {
    render() {
        const { next, prev } = this.props;

        return (
            <View style={styles.content}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colors.background1, colors.background1]} style={styles.linearGradient}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={prev}>
                            <View style={styles.next}>
                                <MyIcon name='arrow-back' />
                                <Text style={styles.text}>Prev</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={next}>
                            <View style={styles.next}>
                                <Text style={styles.text}>Next</Text>
                                <MyIcon name='arrow-forward' />
                            </View>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        )
    }
}

const styles = {
    content: {
        height: 50,
        backgroundColor: '#fff',
        elevation: 5
    },
    gradient: {
        height: 5
    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        flex: 1
    },
    linearGradient: {
        flex: 1
    },
    text: {
        fontWeight: '900',
        fontSize: 18,
        color: '#fff'
    },
    next: {
        flexDirection: 'row',
        alignItems: 'center'
    }
}
