import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { colors } from './src/styles/index.style';
import MyIcon from './MyIcon';
import Text from './LPText';

export default class Button extends React.Component {

    render() {
        const { content, inActive, style, icon } = this.props,
            styleProps = style || {},
            buttonStyle = inActive ? { ...styles.button, ...styles.inactive, ...styleProps } : { ...styles.button, ...styles.active, ...styleProps};

        return (
            <TouchableOpacity onPress={this.handleButtonPress}>
                <View style={buttonStyle}>
                    {icon ? <MyIcon name={icon}
                        style={styles.icon}
                    /> : null}
                    <Text style={styles.text}>{content.toUpperCase()}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    handleButtonPress = () => {
        const options = {},
            { inActive, handleButtonPress} = this.props;

        if (!inActive)
            handleButtonPress(options);
    }
}

const styles = {
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        elevation: 3,
        borderRadius: 3,
        flexDirection: 'row'
    },
    text: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '900',
    },
    active: {
        backgroundColor: colors.background1
    },
    inactive: {
        backgroundColor: 'rgba(200,200,200,0.5)'
    },
    icon: {
        fontSize: 15,
        marginRight: 5
    }
}
