import React from 'react';
import { View, TouchableOpacity, Clipboard } from 'react-native';
import MyIcon from './MyIcon';
import Text from './LPText';

export default class CopyClipboard extends React.Component {
    state = {
        copied: false
    }

    render() {
        const { copied } = this.state;
        return (
            <TouchableOpacity onPress={this.copyClipboard} style={styles.copy}>
                {copied ? 
                <View style={styles.message}><Text style={styles.messageText}>Copied</Text></View>
                :
                <View>
                    <MyIcon name='content-copy'
                        style={styles.icon}
                    />
                </View>}
            </TouchableOpacity>
        );
    }

    copyClipboard = () => {
        Clipboard.setString(this.props.data);
        this.handleCopied();
    }

    handleCopied() {
        this.setState({copied: true});
        setTimeout(() => {
            this.setState({ copied: false });
        }, 1000);
    }


}

const styles = {
    placeholderCall: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    copy: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        padding: 5,
        flex: 1
    },
    icon: {
        fontSize: 25,
        color: '#333'
    },
    message: {
        backgroundColor: '#333',
        position: 'absolute',
        padding: 5,
        borderRadius: 3,
        zIndex: 5
    },
    messageText: {
        color: '#fff',
        fontSize: 10
    }
}
