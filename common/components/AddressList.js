import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import ActivityHeader from './lib/ActivityHeader';
import ActivityFooter from './lib/ActivityFooter';
import Address from './Address';
import Button from './lib/Button';
import Overlay from './lib/Overlay';
import MyToast from './lib/Toast';
import { addressSelected, getUserDetails, reFetchUserDetails } from '../actions';
import { ROUTES } from '../constants';
import Text from './lib/LPText';

class AddressList extends React.Component {
    state = {
        address: '',
        activelkey: ''
    }

    render() {
        const { activelkey } = this.state,
            { userDetails, navigation } = this.props;
        let addressList = userDetails.details ? userDetails.details.addressList : [];

        return (
            <View style={styles.services}>
                <ActivityHeader navigation={navigation} heading='SELECT ADDRESS' />
                <Overlay />
                <MyToast handleToastRef={this.saveToastRef} position={'top'} />
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.card}>
                            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                                {Array.isArray(addressList) ? addressList.map((address, index) => {
                                    return (<Address key={address.lkey} address={address} index={index} active={activelkey === address.lkey} selectedAddress={this.selectedAddress} navigation={navigation}/>)
                                }, this) : ''}
                            </View>
                            <Text style={{color: '#bbb'}}>*Tap to select your desired address</Text>
                            <View style={{ marginTop: 30 }}><Button content='Add new Address' handleButtonPress={this.handleButtonPress} /></View>
                        </View>
                    </View>
                </ScrollView>
                <ActivityFooter next={this.handleNextClick} prev={this.handlePrevClick} />
            </View>
        )
    }

    saveToastRef = (ref) => {
        this.toast = ref;
    }

    handleButtonPress = () => {
        this.props.navigation.navigate(ROUTES.ADD_ADDRESS, {op: 'add'});
    }

    handleNextClick = () => {
        if(this.state.activelkey){
            this.props.navigation.navigate(ROUTES.BOOKING_CONFIRM);
        }else{
            this.toast.show('Please add or select your address', 500);
        }
    }

    handlePrevClick = () => {
        this.props.navigation.navigate(ROUTES.USER_DETAILS);
    }

    componentDidMount = () => {
        const { reFetchDetails } = this.props.userDetails;
        if (reFetchDetails) {
            this.callGetAddressListIn3Sec();
        }
    }

    callGetAddressListIn3Sec = () => {
        setTimeout(() => { 
            this.getaddresslist()
            this.setState({refresh: false});
        }, 2000);
    }

    getaddresslist = () => {
        this.props.getUserDetails();
        this.props.reFetchUserDetails(false);
    }

    selectedAddress = (address) => {
        this.setState({ address, activelkey: address.lkey });
        this.props.addressSelected({ activelkey: address.lkey });
    }
}

function mapStateToProps(state) {
    return {
        userDetails: state.userDetails
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addressSelected: (options) => {
            dispatch(addressSelected(options));
        },
        getUserDetails: () => {
            dispatch(getUserDetails());
        },
        reFetchUserDetails: (flag) => {
            dispatch(reFetchUserDetails(flag));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressList);

const styles = {
    services: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        backgroundColor: '#efefef'
    },
    card: {
        flex: 1,
        elevation: 5,
        backgroundColor: '#fff',
        width: '100%',
        padding: 10
    },
    textAreaContainer: {
        borderColor: '#eee',
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 150
    }
}
