/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Image } from 'react-native';
import { MIN_BOOKING, ROUTES, S3_IMAGE_PATH } from '../constants';
import { colors } from './lib/src/styles/index.style';
import Text from './lib/LPText';
const imagePath = S3_IMAGE_PATH + '/chatIcons/';

class Cart extends React.Component {
    render() {
        const { bookingDetails: { total } } = this.props,
            { subTotal, wassup, icon, bookNow, text, filterImage } = styles;

        return (
            <View style={styles.cart}>
                <TouchableOpacity style={wassup} onPress={this.handleChatPress}>
                    <View>
                        <Image style={[filterImage]} source={{ uri: imagePath + 'comments.png?v=9' }} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={subTotal} onPress={this.handleSubTotalPress}><View><Text style={text}>{'Subtotal Rs.' + total}</Text></View></TouchableOpacity>
                <TouchableOpacity style={bookNow} onPress={this.handleBookNowPress}><View><Text style={text}>Book Now</Text></View></TouchableOpacity>
            </View>
        )
    }

    handleChatPress = () => {
        this.props.toggleChatComponent(true);
    }

    handleSubTotalPress = () => {
        this.props.navigation.navigate(ROUTES.CART);
    }

    handleBookNowPress = () => {
        if (this.isMinAmountValid()) {
            this.props.navigation.navigate(ROUTES.USER_DETAILS);
        } else {
            this.props.toast.show(MIN_BOOKING, 3000);
        }
    }

    isMinAmountValid() {
        const { bookingDetails: { minBooking, total } } = this.props;
        return (total >= minBooking);
    }
}

function mapStateToProps(state) {
    return {
        bookingDetails: state.bookingDetails,
        isLoggedIn: state.userDetails.isLoggedIn
    };
}

export default connect(mapStateToProps)(Cart);

const styles = {
    cart: {
        backgroundColor: '#111',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wassup: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subTotal: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#777'
    },
    bookNow: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background1,
        height: 50
    },
    text: {
        color: '#fff',
        fontWeight: '900',
        paddingVertical: 8
    },
    icon: {
        fontSize: 30
    },
    filterImage: {
        height: 35,
        width: 35,
        elevation: 5
    }
}