import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, TextInput, Modal, TouchableOpacity, Picker } from 'react-native';
import ActivityHeader from './lib/ActivityHeader';
import ActivityFooter from './lib/ActivityFooter';
import LPTextInput from './lib/LPTextInput';
import { colors } from './lib/src/styles/index.style';
import { EM, MO, MSG, OTP, EMAIL, TIME, NUMBER, API_PATH, CITIES, ROUTES } from '../constants'; 
import DatePicker from './lib/DatePicker';
import Button from './lib/Button';
import MyToast from './lib/Toast';
import Overlay from './lib/Overlay';
import { logIn, saveLoginData, saveBookingData, makeAPICall } from '../actions';
import Text from './lib/LPText';

class UserDetails extends React.Component {
    constructor(props) {
        super(props);

        const { userDetails, bookingDetails } = this.props,
            { number, details } = userDetails,
            { emailId, comment } = bookingDetails;

        let email = '';
        if (details) {
            email = details.email;
        }
        
        let currentTime = new Date();

        this.state = {
            toast: null,
            modalVisible: false,
            mailId: emailId || email || '',
            mobile: number || '',
            comment: comment || '',
            city: this.getUserCity(),
            timing: { time: '', year: '', month: '', date: '' },
            otp: ''
        }
    }

    getUserCity() {
        let city = CITIES[0];
        const { details } = this.props.userDetails;
        if (details && Array.isArray(details.addressList) && details.addressList.length > 0) {
            return details.addressList[0].city;
        }
        return city;
    }

    hideModal = () => {
        this.setState({ modalVisible: false });
    }

    setModalVisible = (modalVisible) => {
        this.setState({ modalVisible });
    }

    onRequestClose = () => {

    }

    render() {
        const { mailId, mobile, modalVisible, comment, city, toast } = this.state,
            { navigation, isLoggedIn } = this.props;

        return (
            <View style={styles.services}>
                <ActivityHeader navigation={navigation} heading='ENTER BOOKING DETAILS' />
                <MyToast handleToastRef={this.saveToastRef} position={'top'}/>
                <Overlay />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={this.onRequestClose}
                >
                    <View style={styles.container}>
                        <View style={styles.card}>
                            <TouchableOpacity onPress={this.hideModal}><View><Text>X</Text></View></TouchableOpacity>
                            <View style={{ height: 120, justifyContent: 'space-around', marginTop: 150 }}>
                                <LPTextInput iconName='phone-iphone' placeholder={OTP} handleChangeInput={this.handleOTPChange} color={colors.fontColor} />
                                <Button content='Login' handleButtonPress={this.handleOTPButtonPress} />
                            </View>
                        </View>
                    </View>
                </Modal>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.container}>
                        <View style={styles.card}>
                            <View style={{height: 160, justifyContent: 'space-around'}}>
                                <LPTextInput iconName='account-box' placeholder={EM} keyboardType='email-address' value={mailId} handleChangeInput={this.handleEmailChange} color={colors.fontColor} />
                                {!isLoggedIn ? <LPTextInput iconName='phone-iphone' placeholder={MO} value={mobile} handleChangeInput={this.handleNumberChange} color={colors.fontColor} /> : null}
                                <Picker
                                    selectedValue={city}
                                    style={{ fontSize: 8, marginTop: 5, color: '#777' }}
                                    onValueChange={this.saveCity}>
                                    {CITIES.map(ele => {
                                        return <Picker.Item label={ele} value={ele} />;
                                    })}
                                </Picker>
                            </View>
                            <DatePicker scheduleHandler={this.scheduleHandler} toast={toast} city={city}/>
                            <View style={styles.textAreaContainer} >
                                <TextInput
                                    style={styles.textArea}
                                    underlineColorAndroid="transparent"
                                    placeholder={MSG}
                                    placeholderTextColor={"grey"}
                                    numberOfLines={7}
                                    multiline={true}
                                    onChangeText={this.onChangeCommentInput}
                                    value={comment}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <ActivityFooter next={this.handleNextClick} prev={this.handlePrevClick}/>
            </View>
        )
    }

    saveToastRef = (ref) => {
        this.setState({toast: ref});
    }

    saveCity = (city) => {
        this.setState({city});
    }

    scheduleHandler = (timing) => {
        this.setState({ timing });
    }

    handleOTPChange = (otp) => {
        this.setState({otp});
    }

    handleOTPButtonPress = () => {
        const { otp, toast } = this.state,
            { userDetails: { token, number }, navigation, logIn } = this.props;

        if(otp.length === 6){
            logIn({ phonenumber: number, otp, token }, null, 'AddressList', navigation, toast);
            this.setState({ modalVisible: false });
        }else{
            toast.show('Invalid OTP', 3000);
        }
    }

    handleNextClick = () => {
        const { mailId, timing, timing: { time, year, month, date }, mobile, comment, toast } = this.state,
            { isLoggedIn, navigation, saveBookingData } = this.props;

        if (isLoggedIn) {
            if (this.isValidEmailId(mailId)) {
                if (time && year && month && date) {
                    saveBookingData({ mailId, timing, comment });
                    navigation.navigate('AddressList');
                } else {
                    toast.show(TIME, 3000);
                }
            } else {
                toast.show(EMAIL, 3000);
            }
        } else {
            if (this.isValidEmailId(mailId)){
                if (mobile) {
                    if (timing.time) {
                        saveBookingData({ mailId, timing, comment });
                        this.login();
                    } else {
                        toast.show(TIME, 3000);
                    }
                } else {
                    toast.show(NUMBER, 3000);
                }
            } else {
                toast.show(EMAIL, 3000);
            }
        }
    }

    handleOTPSubmitSuccess = (data) => {
        const { navigation, saveLoginData } = this.props,
            { mobile } = this.state;

        saveLoginData({
            isNewUser: data.isNewUser,
            number: mobile,
            token: data.token
        });

        if (data.isNewUser == true) {
            navigation.navigate('AddAddress');
        } else {
            this.setModalVisible(true);
        } 
    }

    login = () => {
        const { mobile, toast } = this.state;

        const payload = { phonenumber: mobile },
            url = API_PATH + '/getmobileotp';

        const handleOTPSubmitError = (e) => {
            toast.show(e.message, 3000);
        }

        if (mobile.length !== 10) {
            toast.show('Invalid Mobile Number', 3000);
        } else {
            this.props.makeAPICall({ url, payload, successCallback: this.handleOTPSubmitSuccess, errorCallback: handleOTPSubmitError });
        }
    }

    handlePrevClick = () => {
        this.props.navigation.navigate(ROUTES.HOME)
    }

    dateSelected = (timing) => {
        if(this.isValidTiming(timing)){
            let hour = timing.getHours(),
                meridian = 'AM';

            if (hour > 12){
                hour = hour - 12;
                meridian = 'PM'
            }

            hour = hour + '';
            let minutes = timing.getMinutes() + '';

            if (minutes.length === 1) {
                minutes = '0' + minutes;
            }

            if (hour.length === 1) {
                hour = '0' + hour;
            }
            let timeString = `${hour}:${minutes}_${meridian}`;

            this.setState({ timing: {time: timeString, date: timing.getDate(), year: timing.getFullYear(), month: timing.getMonth() + 1} });
        }else{
            this.state.toast.show('Invalid time selected', 3000);
        }
    }

    isValidTiming(bookingTime) {
        let currentTime = new Date(),
            hourDifference = (bookingTime - currentTime) / 3600000,
            bookingHourTime = bookingTime.getHours(),
            bookingMinuteTime = bookingTime.getMinutes();

        if (bookingTime > currentTime && hourDifference > 2 && bookingHourTime < 16 && bookingHourTime > 9){
            return true;
        }

        return false;
    }

    handleEmailChange = (mailId) => {
        this.setState({ mailId });
    }

    onChangeCommentInput = (comment) => {
        this.setState({ comment });
    }

    handleNumberChange = (mobile) => {
        this.setState({ mobile });
        mobile = mobile + '';

        if(mobile.length === 10){
            this.recordeNumber(mobile);
        }
    }

    recordeNumber = (mobile) => {
        const { makeAPICall, source } = this.props;
        makeAPICall({ url: '/recordcontactnumber', type: 'POST', payload: { phonenumber: mobile, source }, noLoader: true });
    }

    isValidEmailId = (email) => {
        if(!email){
            return false;
        }
        email = email + '';
        let atpos = email.indexOf('@'),
            space = email.indexOf(' '),
            dotpos = email.lastIndexOf('.');

        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length || space > -1) {
            return false;
        }
        return true;
    }
}

function mapStateToProps(state) {
    return {
        userDetails: state.userDetails,
        source: state.misc.userAgent,
        bookingDetails: state.bookingDetails,
        isLoggedIn: state.userDetails.isLoggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        saveLoginData: (data) => {
            dispatch(saveLoginData(data));
        },
        saveBookingData: (data) => {
            dispatch(saveBookingData(data));
        },
        logIn: (data, notfn, navigateTo, navigation, toast) => {
            dispatch(logIn(data, notfn, navigateTo, navigation, toast));
        },
        makeAPICall: (data) => {
            dispatch(makeAPICall(data));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);

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
        padding: 5,
        marginTop: 30
    },
    textArea: {
        height: 100
    }
}
