import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Picker } from 'react-native';
import ActivityHeader from './lib/ActivityHeader';
import ActivityFooter from './lib/ActivityFooter';
import LPTextInput from './lib/LPTextInput';
import { colors } from './lib/src/styles/index.style';
import MyToast from './lib/Toast'
import Button from './lib/Button';
import { userRegistered, reFetchUserDetails, registerUser, makeAPICall, getUserDetails } from '../actions';
import { ADD_ADDRESS, LANDMARK, CITIES, API_PATH, ROUTES } from '../constants';
import Text from './lib/LPText';

class AddAddress extends React.Component {
    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        let address, landmark, city, lkey;
        if (params.address){
            const { address: a, city: c, landmark: l, lkey: lk } = params.address;
            address = a;
            city = c;
            landmark = l;
            lkey = lk;
        }

        this.state = {
            city: city || CITIES[0],
            name: '',
            otp: '',
            refcode: '',
            address: address || '',
            landmark: landmark || '',
            lkey: lkey || '',
            op: params ? params.op : 'add'
        }
    }
    

    render() {
        const { name, otp, address, landmark, city, refcode, op } = this.state,
            { userDetails: { isNewUser }, navigation } = this.props;

        let heading = '',
            buttonContent = '';

        if (op === 'delete'){
            heading = 'DELETE ADDRESS';
            buttonContent = 'Delete';
        } else if (op === 'edit'){
            heading = 'EDIT ADDRESS'
            buttonContent = 'Update';
        }else{
            heading = 'PROVIDE ADDRESS';
            buttonContent = 'Add';
        }

        return (
            <View style={styles.services}>
                <ActivityHeader navigation={navigation} heading={heading} />
                <MyToast handleToastRef={this.saveToastRef} />
                <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={styles.container}>
                        <View style={styles.card}>
                            <View style={{ height: isNewUser ? 320 : 200, justifyContent: 'space-around' }}>
                                {isNewUser ? <LPTextInput iconName='account-box' placeholder={'Enter your name'} keyboardType='email-address' handleChangeInput={this.saveName} color={colors.fontColor} /> : null}
                                {isNewUser ? <LPTextInput iconName='phone-iphone' placeholder={'Enter OTP'} keyboardType='numeric' handleChangeInput={this.saveOTP} color={colors.fontColor} />: null}
                                <LPTextInput iconName='add-location' placeholder={ADD_ADDRESS} keyboardType='email-address' value={address} handleChangeInput={this.saveAddress} color={colors.fontColor} />
                                <LPTextInput iconName='add-location' placeholder={LANDMARK} keyboardType='email-address' value={landmark} handleChangeInput={this.saveLandMark} color={colors.fontColor} />
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{flex: 1}}>City</Text>
                                    <Picker
                                        selectedValue={this.state.city}
                                        style={{ flex: 7 }}
                                        onValueChange={this.saveCity}>
                                        { CITIES.map(ele => {
                                            return <Picker.Item label={ele} value={ele} />;
                                        })}
                                    </Picker>
                                </View>
                                {isNewUser ? <LPTextInput iconName='account-box' placeholder={'Referal code (optional)'} keyboardType='default' handleChangeInput={this.refCodeChanged} color={colors.fontColor} /> : null}
                            </View>
                        </View>
                    </View>
                    <View style={{padding: 10}}>
                        <Button content={buttonContent} handleButtonPress={this.handleNextClick} />
                    </View>
                </ScrollView>
                <ActivityFooter next={this.handleNextClick} prev={this.handlePrevClick} />
            </View>
        )
    }

    saveToastRef = (toast) => {
        this.toast = toast;
    }

    handleNextClick = () => {
        this.updatePreferences();
    }

    handlePrevClick = () => {
        const { navigation } = this.props;
        if (this.state.op) {
            navigation.navigate(ROUTES.ADDRESS_LIST);
        }else {
            navigation.navigate(ROUTES.USER_DETAILS);
        }
    }

    saveName = (name) => {
        this.setState({ name });
    }

    refCodeChanged = (refcode) => {
        this.setState({ refcode});
    }

    saveOTP = (otp) => {
        this.setState({ otp });
    }

    saveAddress = (address) => {
        this.setState({ address});
    }

    saveCity = (city) => {
        this.setState({ city });
    }

    saveLandMark = (landmark) => {
        this.setState({ landmark });
    }

    updatePreferences = () => {
        if (this.props.userDetails.isNewUser) { 
            this.registerUser();
        } else {
            this.updateAddress();
        }
    }

    registerUser = () => {
        const { name, otp, address, landmark, city } = this.state;

        if (name) {
            if (otp) {
                if (address) {
                    if (landmark) {
                        if (city) {
                            this.registerUserForReal();
                        } else {
                            this.showNotification('', CITY);
                        }
                    } else {
                        this.showNotification('', LANDMARK);
                    }
                } else {
                    this.showNotification('', ADD_ADDRESS);
                }
            } else {
                this.showNotification('', OTP);
            }
        } else {
            this.showNotification('', NAME);
        }
    }

    showNotification(random, INFO) {
        this.toast.show(INFO, 3000);
    }

    registerUserForReal = () => {
        const { userDetails: { number, token }, registerUser } = this.props,
            { otp, name, refcode } = this.state;
        //Base.showOverlay();
        //ajaxObj.url = ajaxObj.baseUrl + '/saveguestcustomer';
        const data = {
            phonenumber: number,
            otp,
            token,
            name,
            refcode
        };
        // { data, successCallback: successCallback2, navigation, navigateTo, toast}
        registerUser({ data, toast: this.toast, successCallback: this.callBackSuccess});
    }

    callBackSuccess = () => {
        this.props.userRegistered();
        this.addAddress();
    }

    updateAddress = () => {
        const { address, landmark, city, op } = this.state;

        if (city) {
            if (address) {
                if (landmark) {
                    op === 'edit' ? this.editAddress() : (op === 'delete' ? this.deleteAddress() : this.addAddress())
                } else {
                    this.showNotification('', LANDMARK);
                }
            } else {
                this.showNotification('', ADD_ADDRESS);
            }
        } else {
            this.showNotification('', CITY);
        }
    }

    addAddress = () => {
        this.changeAddress('/addaddress');
    }

    editAddress = () => {
        this.changeAddress('/editaddress');
    }

    deleteAddress = () => {
        this.changeAddress('/deleteaddress');
    }

    changeAddress = (url) => {
        
        const { address, city, landmark, lkey } = this.state,
            { reFetchUserDetails, navigation, makeAPICall } = this.props;

        const payload = { address, city, landmark, lkey };

        const successCallback = () => {
            this.props.getUserDetails();
            navigation.navigate(ROUTES.ADDRESS_LIST, { refresh: true });
        }

        const errorCallback = ({ message }) => {
            this.toast.show(message, 3000);
        }

        makeAPICall({ url: API_PATH + url, payload, successCallback, errorCallback });
    }
}

function mapStateToProps(state) {
    return {
        bookingDetails: state.bookingDetails,
        userDetails: state.userDetails
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userRegistered: () => {
            dispatch(userRegistered());
        },
        reFetchUserDetails: (flag) => {
            dispatch(reFetchUserDetails(flag));
        },
        registerUser: (data, notificn, navigateTo, callBack) => {
            dispatch(registerUser(data, notificn, navigateTo, callBack));
        },
        makeAPICall: (data) => {
            dispatch(makeAPICall(data));
        },
        getUserDetails: () => {
            dispatch(getUserDetails());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);

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
