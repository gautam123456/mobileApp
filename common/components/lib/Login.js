import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ROUTES } from '../../constants';
import Text from './LPText';

export default class Login extends React.Component {

    render() {
        return (
            <TouchableOpacity onPress={this.handleLoginPress} style={styles.call}>
                <View>
                    <Text style={{color: '#fff'}}>Login</Text>
                </View>
            </TouchableOpacity>
        );
    }

    handleLoginPress = () => {
        this.props.navigation.navigate(ROUTES.LOGIN);
    }
}

const styles = {
    call: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        elevation: 3
    }
}
