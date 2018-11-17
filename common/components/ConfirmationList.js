/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import { couponApplied } from '../actions';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Coupons from './lib/Coupons';
import Text from './lib/LPText';

class ConfirmationList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            complementaryOffer: '',
            amountDiscount: ''
        }
    }

    renderComplementaryOffer(propsComplementaryOffer) {
        const { complementaryOffer: stateComplementaryOffer, amountDiscount } = this.state;

        let complementaryOffer;

        if (amountDiscount) {
            if (stateComplementaryOffer) {
                complementaryOffer = stateComplementaryOffer;
            } else {
                complementaryOffer = null;
            }
        } else {
            complementaryOffer = propsComplementaryOffer;
        }

        if (!complementaryOffer) {
            return null;
        }

        return (
            <View style={styles.row}>
                <Text style={styles.bold}>Complimentary Offer</Text>
                <Text style={{ textAlign: 'right' }}>{complementaryOffer}</Text>
            </View>
        )
    }

    renderDiscount(discount, subTotal, refDiscount, padding) {
        const { amountDiscount } = this.state;

        let discountText, discountValue;

        if (amountDiscount) {
            discountText = `Discount`;
            discountValue = amountDiscount;
        } else {
            discountText = `Discount (${discount}%)`;
            discountValue = parseFloat(discount * (subTotal - refDiscount) / 100).toFixed(2);
        }

        return (
            <View style={styles.row}>
                <Text style={styles.bold}>{discountText}</Text>
                <Text style={padding}> Rs.{discountValue}</Text>
            </View>
        )
    }

    getTotalBillingAmount(subTotal, refDiscount, discount, padding) {
        const { amountDiscount } = this.state;
        let totalValue;
        if (amountDiscount) {
            totalValue = parseFloat((subTotal - refDiscount) - amountDiscount).toFixed(2);
        } else {
            totalValue = parseFloat((subTotal - refDiscount) - (discount * (subTotal - refDiscount) / 100)).toFixed(2);
        }

        return (
            <View style={styles.row}>
                <Text style={styles.bold}>Total Billing Amount </Text>
                <Text style={padding}> Rs.{totalValue} </Text>
            </View>
        )
    }

    render() {
        const then = this,
            { bookingDetails: { services, discount, complementaryOffer, total, subTotal }, userDetails: { details } } = this.props,
            refCount = details ? details.refCount : 0,
            objKeys = Object.keys(services),
            margin = { marginBottom: 60 },
            padding = { paddingTop: 0 },
            refDiscount = refCount ? 200 : 0;

        return (
            <View>
                <View style={styles.row}><Text style={styles.bold}>Sub Total</Text><Text>Rs.{subTotal}</Text></View>
                <View style={styles.row}><Text style={styles.bold}>Referral Discount</Text><Text>Rs.{parseFloat(refDiscount).toFixed(2)}</Text></View>
                {this.renderDiscount(discount, subTotal, refDiscount, padding)}
                {this.renderComplementaryOffer(complementaryOffer)}
                {this.getTotalBillingAmount(subTotal, refDiscount, discount, padding)}
                <View style={{height: 20}}></View>
                <Coupons showNotification={this.props.showNotification} amountCouponCodeApplied={this.amountCouponCodeApplied} />
            </View>
        )
    }

    amountCouponCodeApplied = ({ amountDiscount, complementaryOffer, amountCouponCodeApplied }) => {
        this.setState({ amountDiscount, complementaryOffer });
        this.props.amountCouponCodeApplied({ amountCouponCodeApplied });
    }
}

function mapStateToProps(state) {
    return {
        userDetails: state.userDetails,
        bookingDetails: state.bookingDetails
    };
}

function mapDispatchToProps(dispatch) {
    return {
        couponApplied: (data) => {
            dispatch(couponApplied(data));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationList);

const styles = {
    row: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bold: {
        fontWeight: '900'
    }
}