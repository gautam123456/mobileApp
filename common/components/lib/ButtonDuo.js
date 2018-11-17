import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from './LPText';

export default class MyAppointments extends React.Component {

    render() {
        const { content1, content2, active } = this.props,
            button1TextStyle = active == 0 ? {...styles.text, ...styles.active} : styles.text,
            button2TextStyle = active == 1 ? {...styles.text, ...styles.active} : styles.text;
        return (
            <View style={styles.buttons}>
                <TouchableOpacity onPress={this.handleButtonPress.bind(this, 0)}>
                    <View style={styles.button}><Text style={button1TextStyle}>{content1.toUpperCase()}</Text></View>
                </TouchableOpacity>
                <View style={styles.button}><Text style={styles.text}>|</Text></View>
                <TouchableOpacity onPress={this.handleButtonPress.bind(this, 1)}>
                    <View style={styles.button}><Text style={button2TextStyle}>{content2.toUpperCase()}</Text></View>
                </TouchableOpacity>
            </View>
        )
    }

    handleButtonPress(button) {
        this.props.handleButtonPress(button);
    }
}

const styles = {
    buttons: {
        flexDirection: 'row',
        borderRadius: 2,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '80%',
        marginBottom: 60
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
    },
    text: {
        color: '#fff',
        fontSize: 15,
        marginBottom: 15
    },
    active: {
        fontWeight: '900'
    }
}
