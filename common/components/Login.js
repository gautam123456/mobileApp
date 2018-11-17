import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { colors } from './lib/src/styles/index.style';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Header from './lib/Header';
import Button from './lib/Button';
import LPTextInput from './lib/LPTextInput';
import { makeAPICall, saveLoginData, fetchedUser, userRegistered, registerUser } from '../actions';
import { API_PATH, NAME, OTP } from '../constants';
import Overlay from './lib/Overlay';
import MyToast from './lib/Toast';

const height = Dimensions.get('window').height;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            refcode: '',
            stage: 'stageOne',
            number: '',
            otp: '',
            token: ''
        }
    }

    handleMobileNumberChange = (number) => {
        number = number + '';
        //if(number.length === 10) {
            this.setState({ number });
        //}

        if (number.length === 10) {
            this.recordeNumber(number);
        }
    }

    recordeNumber = (mobile) => {
        const { makeAPICall, source } = this.props;
        makeAPICall({ url: '/recordcontactnumber', type: 'POST', payload: { phonenumber: mobile, source }, noLoader: true });
    }

    handleOTPChange = (otp) => {
        otp = otp + '';
        if (otp.length === 6) {
            this.setState({ otp });
            if(!this.props.isNewUser){
                this.handleOTPSubmit(otp);
            }
        }
    }

    handleButtonPress = () => {
        const { stage, number, otp} = this.state;
        switch (stage) {
            case "stageOne":
                this.handleMobileNumberSubmit(number);
                break;
            case "stageTwo":
                this.handleOTPSubmit(otp);
                break;
            case "stageZero":
                this.handleUserDataSubmit();
                break;
        }
    }

    get stageZero() {
        return (
            <View key="register" style={styles.content}>
                <View style={{height: 160, justifyContent: 'space-between', marginTop: 20}}>
                    <LPTextInput iconName='account-box' placeholder='Name (Required)' keyboardType='email-address' handleChangeInput={this.handleNameChange} />
                    <LPTextInput iconName='phone-iphone' placeholder='OTP (Required)' handleChangeInput={this.handleOTPChange} />
                    <LPTextInput iconName='person-add' placeholder='Referral Code (Optional)' keyboardType='email-address' handleChangeInput={this.handleReferralChange} />
                </View>
                <View style={styles.buttonMargin}>
                    <Button content='Login' handleButtonPress={this.handleButtonPress} />
                </View>
            </View>
        ) 
    }

    get stageTwo() {
        return (
            <View key="otp" style={styles.content}>
                <LPTextInput iconName='phone-iphone' placeholder='Enter OTP' handleChangeInput={this.handleOTPChange} />
                <View style={styles.buttonMargin}>
                    <Button content='Login' handleButtonPress={this.handleButtonPress} />
                </View>
            </View>
        ) 
    }

    get stageOne() {
        return (
            <View key="number" style={styles.content}>
                <LPTextInput iconName='phone-iphone' placeholder='Enter mobile number' handleChangeInput={this.handleMobileNumberChange} />
                <View style={styles.buttonMargin}>
                    <Button content='Get OTP' handleButtonPress={this.handleButtonPress} />
                </View>
            </View>
        )
    }

    render() {
        const { navigation } = this.props,
            { stage } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <Overlay />
                <MyToast handleToastRef={this.saveToastRef} position={'top'}/>
                <ScrollView style={{ flex: 1 }}>
                    <LinearGradient colors={[colors.background1, colors.background1, colors.background2]} style={{ padding: 10, height}}>
                        <View style={{flex: 1}}>
                            <Header navigation={navigation} showHome={true}/>
                            <ScrollView>
                                {this[stage]}
                            </ScrollView>
                        </View>
                </LinearGradient>
            </ScrollView>
            </View>
        )
    }

    saveToastRef = (ref) => {
        this.toast = ref;
    }

    handleReferralChange = (refcode) => {
        this.setState({ refcode });
    }

    handleNameChange = (name) => {
        this.setState({name});
    }

    handleUserDataSubmit = () => {
        const { props: { number, token, registerUser, userRegistered, navigation }, state: { otp, name, refcode } } = this;
        if (this.allRequiredDataProvided()) {
            const data = {
                phonenumber: number,
                otp,
                token,
                name,
                refcode
            };
            registerUser({ data, successCallback: userRegistered, navigation, navigateTo: 'Home', toast: this.toast});
        }
    }

    allRequiredDataProvided = () => {
        const { name, otp } = this.state;

        if (name) {
            if (otp) {
                return true;
            } else {
                this.toast.show(OTP, 3000);
                return false
            }
        } else {
            this.toast.show(NAME, 3000);
            return false
        }
    }

    handleMobileNumberSubmit = (number) => {
        const payload = { phonenumber: number },
            url = API_PATH + '/getmobileotp';

        if (number.length !== 10) {
            this.toast.show('Invalid mobile number', 500);
        }else{
            this.props.makeAPICall({ url, payload, successCallback: this.handleOTPCallSuccess, errorCallback: this.handleOTPCallError });  
        }   
    }

    handleOTPSubmit(otp) {
        const { number, token} = this.state;
        const payload = { phonenumber: number, otp, token },
            url = API_PATH + '/loginguestcustomer';
        if (otp.length !== 6) {
            this.toast.show('Invalid OTP');
        } else{
            this.props.makeAPICall({ url, payload, successCallback: this.handleOTPSubmitSuccess, errorCallback: this.handleOTPSubmitError});
        }
    }

    handleOTPSubmitSuccess = (response) => {
        const { fetchedUser, navigation} = this.props;
        if(response){
            fetchedUser(response);
            navigation.navigate('Home');
        }
    }

    handleOTPSubmitError = ({ message }) => {
        this.toast.show(message || 'Wrong OTP Provided', 500);
    }

    handleOTPCallError = ({ message }) => {
        this.toast.show(message, 500);
    }

    handleOTPCallSuccess = (response) => {
        const { isNewUser, token } = response;

        if(isNewUser){
            this.setState({ token, stage: 'stageZero' });
        }else{
            this.setState({ token, stage: 'stageTwo' });
        }
        
        this.props.saveLoginData({
            isNewUser,
            number: this.state.number,
            token
        });
    }
}

function mapStateToProps(state) {
    return {
        token: state.userDetails.token,
        number: state.userDetails.number,
        isNewUser: state.userDetails.isNewUser,
        source: state.misc.userAgent
    };
}

function mapDispatchToProps(dispatch) {
    return {
        saveLoginData: (data) => {
            dispatch(saveLoginData(data));
        },
        makeAPICall: (data) => {
            dispatch(makeAPICall(data));
        },
        fetchedUser: (details) => {
            dispatch(fetchedUser(details));
        },
        userRegistered: () => {
            dispatch(userRegistered());
        },
        registerUser: (option) => {
            dispatch(registerUser(option));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = {
    content: {
        marginTop: 20,
        paddingVertical: 25,
        paddingHorizontal: 25,
        height: 250,
        justifyContent: 'center'
    },
    buttonMargin: {
        marginTop: 30
    }
}

