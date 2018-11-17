import React from 'react';
import { connect } from 'react-redux';
import { couponApplied, makeAPICall } from '../../actions';
import LPTextInput from './LPTextInput';
import { View, TouchableOpacity } from 'react-native';
import { MIN_COUPON_AMNT, API_PATH } from '../../constants';
import { colors } from './src/styles/index.style';
import Text from './LPText';

const ajaxObj = {};

class Coupons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerCouponList: null,
            loading: false,
            isOtherCoupon: false,
            clickedDiffPromoCode: false,
            customCoupon: {
                couponCodeC: '',
                discountC: 0,
                complimentaryOfferC: '',
                minAmountC: 699
            }
        }
    }

    componentDidMount() {
        this.getOffers();
    }

    render() {
        const { clickedDiffPromoCode, customerCouponList, isOtherCoupon, customCoupon: { couponCodeC, discountC, complimentaryOfferC, minAmountC } } = this.state,
            couponList = [];
        let refCount = 0;
        const { bookingDetails: { subTotal, couponCode }, userDetails: { details }, couponApplied, showNotification } = this.props;
        if (details) {
            refCount = details.refCount;
        }

        customerCouponList && customerCouponList.map(offer => {
            if (couponCode != 'LOOK30' && couponCode === offer.couponCode) {
                let refDiscount = refCount ? 200 : 0,
                    amountPayable = subTotal - refDiscount,
                    discountedAmount = (amountPayable - (amountPayable * (offer.discount / 100)));
                if (discountedAmount < offer.minimumAmount) {
                    couponApplied({ discount: 30, couponCode: 'LOOK30', refDiscount });
                }
            }

            let bgColor = couponCode === offer.couponCode ? { backgroundColor: '#ebeefe'} : {};

            const coupon = (
                <TouchableOpacity key={offer.couponCode} onPress={this.applyCoupon.bind(this, offer.couponCode)}>
                    <View style={{...styles.coupon ,...bgColor}} >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.bold}>Coupon Code: {offer.couponCode}</Text><Text style={{ backgroundColor: colors.background2, padding: 2, paddingHorizontal: 4, color: '#fff', borderRadius: 2}}>{couponCode === offer.couponCode ? 'Applied' : 'Apply'}</Text></View>
                        <View><Text style={styles.bold}>Discount : {offer.discount}%</Text></View >
                        {offer.complementaryOffer ? <Text style={styles.bold}>Complimentary Offer : {offer.complementaryOffer}</Text> : null}
                        <Text style={styles.bold}>Minimum billing amount after all discounts : Rs.{offer.minimumAmount}</Text>
                        <Text>{offer.validthru}</Text>
                    </View>
                </TouchableOpacity>
            );
            couponList.push(coupon);
        }, this)

        return (
            <View>
                <View>
                    {couponList}
                </View>
                <View style={{ ...styles.coupon, ...styles.center}}>
                    {!clickedDiffPromoCode ? <TouchableOpacity onPress={this.havePromoCode}>
                        {<View style={{ height: 40, padding: 9 }}><Text>Have a different promocode ?</Text></View>}
                    </TouchableOpacity>
                    
                        : <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ flex: 2 }}>Coupon Code : </Text>
                            <View style={{ flex: 4, paddingHorizontal: 5 }}>
                                <LPTextInput keyboardType='email-address' handleChangeInput={this.handleCouponChange} color={'#777'} />
                            </View>
                            <TouchableOpacity style={{ flex: 1 }} onPress={this.handleButtonPress}>
                                <View style={{ alignItems: 'center', justifyContent: 'center', maxHeight: 25, flex: 1, backgroundColor: colors.background2, borderRadius: 2 }}><Text style={{ color: '#fff'}}>{'Apply'}</Text></View>
                            </TouchableOpacity>    
                            {/* <Button style={{ flex: 2 }} content={isOtherCoupon ? 'Applied' : 'Apply'} handleButtonPress={this.handleButtonPress}/> */}
                        </View>}
                    
                    
                </View>
            </View>
        )
    }

    handleCouponChange = (couponCodeC) => {
        this.setState({customCoupon: {couponCodeC}});
    }

    handleButtonPress = () => {
        const { customCoupon: { couponCodeC } } = this.state;
        this.applyCoupon(couponCodeC);
    }

    havePromoCode = () => {
        this.setState({ clickedDiffPromoCode: true});
    }

    promoCode = (promoCode) => {
        this.promoCode = promoCode;
    }

    couponAdding = (couponCodeC) => {
        this.setState({ customCoupon: { couponCodeC } });
    }

    applyCoupon = (couponCode) => {

        this.setState({ loading: true });

        const { bookingDetails: { subTotal }, userDetails: { details: { refCount } }, couponApplied, showNotification, makeAPICall } = this.props,
            refDiscount = refCount ? 200 : 0,
            amountPayable = subTotal - refDiscount;

        
        let url = API_PATH + '/iscouponvalid',
            payload = { couponcode: couponCode }

    

        const successCallback = (data) => {
            if (data.percentDiscount) {
                let discount = data.percentDiscount.split('%');

                discount = parseInt(discount[0]);

                let discountedAmount = (amountPayable - (amountPayable * (discount / 100)));
                this.setState({ loading: false, isOtherCoupon: false });
                if (discountedAmount > data.minimumAmount) {
                    showNotification(data.status);
                    couponApplied({ discount, couponCode, refDiscount, complementaryOffer: data.complementaryOffer });
                } else {
                    showNotification(MIN_COUPON_AMNT + data.minimumAmount);
                }
                this.props.amountCouponCodeApplied({ amountDiscount: '', complementaryOffer: '', couponCode: '' });
            } else if (data.amountDiscount) {
                const { amountDiscount, complementaryOffer, status, minimumAmount } = data;
                let finalAmount = amountPayable - parseInt(amountDiscount);

                if (finalAmount > minimumAmount) {
                    showNotification(status);
                    this.props.amountCouponCodeApplied({ amountDiscount, complementaryOffer, amountCouponCodeApplied: couponCode });
                    couponApplied({ discount: 0, couponCode: 'LOOK00', refDiscount, complementaryOffer: '', isOtherCoupon: true });
                } else {
                    showNotification(MIN_COUPON_AMNT + minimumAmount);
                }
                this.setState({ loading: false, isOtherCoupon: true });
            }
        }

        const errorCallback = (e) => {
            this.setState({ discount: 0, loading: false });
            showNotification(e.message || 'Coupon is no more valid!');
        }

        makeAPICall({ url, payload, successCallback, errorCallback });

    }

    getOffers = () => {
        const successCallback = (data) => {
            this.setState({ customerCouponList: data.customerCouponList });
        }

        this.props.makeAPICall({ url: API_PATH + '/getmycoupons', payload: {}, successCallback });
        //let data = { "customerCouponList": [{ "id": 1, "couponCode": "LOOK30", "discount": "30", "validthru": null, "complementaryOffer": null, "amountDiscount": null, "percentDiscount": "30%", "minimumAmount": 800, "isInternal": false }, { "id": 22, "couponCode": "BIKINI20", "discount": "20", "validthru": null, "complementaryOffer": "Free Rica Bikini Wax", "amountDiscount": null, "percentDiscount": "20%", "minimumAmount": 1200, "isInternal": false }, { "id": 23, "couponCode": "HAIR20", "discount": "20", "validthru": null, "complementaryOffer": "Free L'oreal Hair Spa", "amountDiscount": null, "percentDiscount": "20%", "minimumAmount": 2500, "isInternal": false }], "status": "Valid user", "message": null }
        
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
        couponApplied: (data) => {
            dispatch(couponApplied(data));
        },
        makeAPICall: (data) => {
            dispatch(makeAPICall(data));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Coupons);

const styles = {
    bold: {
        fontWeight: '900'
    },
    coupon: {
        padding: 3,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 5
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
}