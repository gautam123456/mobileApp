import React from 'react';
import { Text } from 'react-native';


export default class LPText extends React.Component {
    render() {
        const { style } = this.props;
        return (
            <Text style={[styles.text, style]}>{this.props.children}</Text>
        );
    }
}

const styles = {
    text: {
        fontFamily: "Roboto"
    }
}