import React from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { toggleOverlay } from '../../actions';
import Text from './LPText';

const { height } = Dimensions.get('window');

class Overlay extends React.Component {
    render() {
        if(this.props.showOverlay){
            return (
                <View style={styles.overlay}>
                    <TouchableOpacity onPress={this.handleOverlayPress}>
                        <View style={styles.overlayContent}>
                            <Text style={styles.text}>Loading...</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }else{
            return null;
        }
    }

    handleOverlayPress = () => {
        this.props.toggleOverlay({ showOverlay: false});
    }
}

function mapStateToProps(state) {
    return {
        showOverlay: state.misc.showOverlay
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleOverlay: (data) => {
            dispatch(toggleOverlay(data));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);

const styles = {
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(63, 81, 181, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: height,
        elevation: 10
    },
    overlayContent: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: '900',
        color: '#fff'
    }
}
