import React from 'react';
import { View } from 'react-native';
import MyIcon from './MyIcon';
import Text from './LPText';

export default class Placeholder extends React.Component {

    render() {
        return (
            <View style={styles.placeholder}>
                <View style={styles.iconPlaceholder}>
                    <MyIcon name='person-pin' style={styles.icon}/>
                </View>
                <View style={styles.empty}><Text> You don't have any appointments for selected day. </Text></View>
            </View>
        );
    }


}

const styles = {
    placeholder: {
        paddingVertical: 100
    },
    iconPlaceholder: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    empty: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        fontSize: 100,
        color: '#aaa'
    }
}
