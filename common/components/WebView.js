import React, { Component } from 'react';
import { WebView, View } from 'react-native';
import MyToast from './lib/Toast';
import { connect } from 'react-redux';
import Header from './lib/Header';
import MyStatusBar from './lib/MyStatusBar';
import Overlay from './lib/Overlay';
import { toggleOverlay } from '../actions';

class TawkTo extends Component {
    render() {
        const { params: {uri, view} } = this.props.navigation.state;

        return (
             <View style={{ flex: 1 }}>
                <MyStatusBar />
                <Overlay />
                <MyToast handleToastRef={this.saveToastRef} />
                <Header navigation={this.props.navigation} showHome={true}/>
                {view}
                {uri ? <WebView
                    source={{ uri }}
                    onLoad={this.webViewLoaded}
                    onError={this.handleError}
                /> : null}
                
             </View>
        );
    }

    saveToastRef = (toast) => {
        this.toast = toast;
    }

    componentDidMount() {
        const { toggleOverlay, navigation: { state: { params }} } = this.props;
        toggleOverlay({ showOverlay: true });
        if(!(params && !params.noOverlay)){
            setTimeout(() => {
                toggleOverlay({ showOverlay: false });
            }, 1000);
        } 
    }

    webViewLoaded = () => {
       this.props.toggleOverlay({ showOverlay: false });
    }

    handleError = () => {
        this.props.toggleOverlay({ showOverlay: false });
        this.toast.show('Due to technical issue we are not able to connect currently, please try later', 3000);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleOverlay: (data) => {
            dispatch(toggleOverlay(data));
        }
    };
}

export default connect(null, mapDispatchToProps)(TawkTo);
