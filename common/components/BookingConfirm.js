import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import ActivityHeader from './lib/ActivityHeader';
import Button from './lib/Button';
import ConfirmationList from './ConfirmationList';
import FullCart from './FullCart';
import MyToast from './lib/Toast';
import { makeAPICall, updateRefCounts, clearCart, saveBookedData } from '../actions';
import { API_PATH, MIN_BOOKING, REFRESH } from '../constants';

class BookingConfirm extends React.Component {
    state = {
        date: '',
        complementaryOffer: null,
        amountCouponCodeApplied: '',
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.services}>
                <MyToast handleToastRef={this.saveToastRef} position={'top'} />
                <ActivityHeader navigation={navigation} heading='CONFIRM BOOKING' />
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.card}>
                            <ConfirmationList showNotification={this.showNotification} amountCouponCodeApplied={this.amountCouponCodeApplied}/>
                        </View>
                        <View style={styles.card}>
                            <FullCart noHeaderFooter={true} hideControl={true}/>
                        </View>
                    </View>
                </ScrollView>
                <View style={{padding: 5}}>
                    <Button content="Confirm Booking" handleButtonPress={this.handleButtonPress} />
                </View>
                
            </View>
        )
    }

    saveToastRef = (ref) => {
        this.toast = ref;
    }

    handleButtonPress = () => {
        this.validateAndConfirm();
    }

    amountCouponCodeApplied = ({ amountCouponCodeApplied }) => {
        this.setState({ amountCouponCodeApplied });
    }

    showNotification = (msg) => {
        this.toast.show(msg);
    }

    validateAndConfirm = () => {
        const { userDetails, bookingDetails: { subTotal, minBooking, addressLKey, timing, date, emailId, discount, services, couponCode, comment } } = this.props,
            refCount = userDetails.details ? userDetails.details.refCount : 0,
            refDiscount = refCount ? 200 : 0,
            details = {
                date,
                timing,
                addressLKey,
                emailId,
                couponCode,
                comment
            };

        let totalAfterReferral = subTotal - refDiscount,
            total = totalAfterReferral - (totalAfterReferral * (discount / 100));

        if (total >= minBooking) {
            if (addressLKey && timing && date && emailId && services) {

                details.serviceids = '';
                const keys = Object.keys(services);
                keys.map(function (key) {
                    details.serviceids = key.split('-')[2] + '-' + services[key].count + ',' + details.serviceids;
                })
                details.serviceids = details.serviceids.substr(0, details.serviceids.length - 1);
                this.confirm(details);
            } else {
                this.toast.show(REFRESH, 3000);
            }
        } else {
            this.toast.show(MIN_BOOKING, 3000);
        }
    }

    confirm = (e) => {
        const { amountCouponCodeApplied } = this.state,
            { userAgent } = this.props;

        const payload = { datetime: e.date + '__' + e.timing, addresslkey: e.addressLKey, couponcode: amountCouponCodeApplied || e.couponCode, serviceids: e.serviceids, emailid: e.emailId, comment: e.comment, source: userAgent },
            url = API_PATH + '/sendbookingackforhome';
        
        this.props.makeAPICall({ url, payload, successCallback: this.handleBookingCallSuccess, errorCallback: this.handleBookingCallError });
    }

    handleBookingCallSuccess = (data) => {
        const { saveBookedData, updateRefCounts, clearCart, navigation } = this.props;
        saveBookedData(data);
        updateRefCounts();
        clearCart();
        navigation.navigate('BookingConfirmed');
    }

    handleBookingCallError = (e) => {
        this.toast.show(e.message);
    }
}

function mapStateToProps(state) {
    return {
        userDetails: state.userDetails,
        userAgent: state.misc.userAgent,
        bookingDetails: state.bookingDetails
    };
}

function mapDispatchToProps(dispatch) {
    return {
        makeAPICall: (data) => {
            dispatch(makeAPICall(data));
        },
        saveBookedData: (data) => {
            dispatch(saveBookedData(data));
        },
        clearCart: () => {
            dispatch(clearCart());
        },
        updateRefCounts: () => {
            dispatch(updateRefCounts());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingConfirm);

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
        padding: 10,
        marginBottom: 5
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
