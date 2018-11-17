import React from 'react';
import { View, ScrollView } from 'react-native';
import { colors } from './lib/src/styles/index.style';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Header from './lib/Header';
import { makeAPICall, getUserDetails } from '../actions';
import { API_PATH } from '../constants';
import CopyClipboard from './lib/CopyClipboard';
import Overlay from './lib/Overlay';
import Text from './lib/LPText';

class Offers extends React.Component {
    state = {
        customerCouponList: []
    }

    getoffer = ({ couponCode, percentDiscount, amountDiscount, minimumAmount, complementaryOffer, validthru}) => {
        return (
            <View style={styles.item}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row' }}><Text style={{ ...styles.bold, flex: 5}}>{'Coupon Code: ' + couponCode}</Text><CopyClipboard data={couponCode} /></View>
                </View>
                <View>
                    {percentDiscount ? <Text style={styles.bolder}>{percentDiscount} <Text style={styles.normal}>{'Off'}</Text> </Text> : null}
                    {amountDiscount ? <Text style={styles.bolder}>{amountDiscount} <Text style={styles.normal}>{'Off'}</Text> </Text> : null}
                </View>
                <View>
                    {complementaryOffer ? <Text style={styles.bold}>{'Complimentary Offer ' + complementaryOffer}</Text> : null}
                    <Text style={styles.bold}>{'Minimum Booking Amount:-  Rs.' + minimumAmount}</Text>
                </View>
                <View style={{justifyContent: 'flex-end', marginTop: 10}}>
                    <Text style={styles.small}>Valid till: {validthru || 'Limited Period'}</Text>
                </View>
            </View>
        )
    }

    get offerList() {
        const { customerCouponList } = this.state;

        if(Array.isArray(customerCouponList) && customerCouponList.length > 0){
            return (
                
                    <View style={styles.appointments}>
                        { customerCouponList.map(ele => this.getoffer(ele)) }
                    </View>
                
            )
        }else{
            return null;
        }     
    }

    componentDidMount() {
        url = API_PATH + '/getmycoupons';
        this.props.makeAPICall({ url, payload: {}, successCallback: this.handleOfferCallSuccess, errorCallback: this.handleOfferCallError });

    }

    handleOfferCallError = () => {
        //this.props.navigation.navigate('Login');
    }

    handleOfferCallSuccess = (data) => {
        this.setState({ customerCouponList: data.customerCouponList });
    }

    render() {
        const  { navigation } = this.props;

        return (
            <ScrollView style={{ flex: 1 }}>
                <Overlay />
                <LinearGradient style={{ flex: 1 }} colors={[colors.background1, colors.background2]}>
                    <Header navigation={navigation} backgroundColor='transparent' showHome={true}/>
                    <View style={styles.content}>
                        { this.offerList }
                    </View>
                </LinearGradient>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {
        userDetails: state.userDetails
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUserDetails: () => {
            dispatch(getUserDetails());
        },
        makeAPICall: (data) => {
            dispatch(makeAPICall(data));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Offers);

const styles = {
    content: {
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 25,
        paddingBottom: 25,
        flex: 1
    },
    appointments: {
        flex: 1
    },
    small: {
        fontSize: 10
    },
    normal: {
        fontSize: 17
    },  
    bold: {
        fontWeight: '900',
        fontSize: 15,
    },
    bolder: {
        fontSize: 30,
        fontWeight: '900'
    },
    header: {
        alignItems: 'center',
        height: 30
    },
    center: {
        alignItems: 'center'
    },
    bold: {
        fontWeight: '900'
    },
    credits: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 20,
        padding: 10,
        borderRadius: 3,
        elevation: 15,
        position: 'absolute',
        marginTop: 200
    },
    item: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 3,
        elevation: 5,
        margin: 10,
        height: 150
    }
}

