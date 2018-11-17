import React from 'react';
import { TextInput, View } from 'react-native';
import MyIcon from './MyIcon';

export default class LPTextInput extends React.Component {
    render() {
        const { iconName, placeholder, keyboardType, color: customColor, value } = this.props,
            color = customColor ? { color: customColor} : {},
            borderColor = customColor ? { borderColor: customColor} : {};

        return (
            <View style={styles.wrapper}>

                {iconName ? <MyIcon name={iconName}
                    style={{...styles.icon, ...color}}
                />: null}

                <TextInput
                    style={{ ...styles.textInput, ...color, ...borderColor}}
                    onChangeText={this.onChangeInput}
                    placeholder={placeholder || 'Please enter'}
                    underlineColorAndroid='transparent'
                    placeholderTextColor={customColor || '#fff'}
                    keyboardType={keyboardType || 'numeric'}
                    returnKeyType='next'
                    value={value}
                />
            </View>
        )
    }

    onChangeInput = (input) => {
        const { handleChangeInput} = this.props;

        if (handleChangeInput)
            handleChangeInput(input);
    }
}

const styles = {
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        borderColor: '#fff',
        borderBottomWidth: 1,
        padding: 5,
        color: '#fff',
        fontSize: 14,
        flex: 10
    },
    icon: {
        fontSize: 20,
        flex: 1
    }
}
