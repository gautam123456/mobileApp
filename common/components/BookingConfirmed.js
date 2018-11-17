/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import ActivityHeader from './lib/ActivityHeader';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, BackHandler } from 'react-native';
import Button from './lib/Button';
import { ROUTES, MESSENGER_URL } from '../constants';
import { openApp } from '../constants/Utility';
import Text from './lib/LPText';

class BookinConfirmed extends React.Component {

    render() {
        const { misc: { moneySaved, finalAmount }, navigation } = this.props;

        return (
            <View style={styles.services}>
                <ActivityHeader navigation={navigation} heading='BOOKING CONFIRMED' />
                <View style={styles.container}>
                    <View style={styles.card}>
                        <TouchableOpacity onPress={this.goToMessanger} >
                            <Image
                                source={{ uri: 'https://s3-us-west-2.amazonaws.com/lplexassets/images/app/bookingConfirmed.png' }}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                        {moneySaved != 0 ? <Text style={styles.text}>Amount saved: Rs.{moneySaved}</Text>: null }
                        <Text style={styles.text}>Amount payable: Rs.{finalAmount} </Text>
                        <Text style={styles.text}>Booking details have been sent on your registered mobile number.</Text>
                        <TouchableOpacity onPress={this.navigateToReferAndEarn} >
                            <Text style={styles.text}>Refer your friends and earn. <Text style={{ textDecorationLine: 'underline', color: 'blue' }}>Know more...</Text></Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>Call 8826755766 for any query or assistance.</Text>
                        <View style={{padding: 40}}><Button content="Book more" handleButtonPress={this.handleButtonPress} /></View>
                    </View>
                </View>
            </View>
        )
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleButtonPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleButtonPress);
    }

    goToMessanger = () => {
        openApp(MESSENGER_URL);
    }

    handleButtonPress = () => {
        this.props.navigation.navigate(ROUTES.HOME);
        return true;
    }

    navigateToReferAndEarn = () => {
        this.props.navigation.navigate(ROUTES.REFER_AND_EARN);
    }
}

function mapStateToProps(state) {
    return {
        misc: state.misc
    };
}

export default connect(mapStateToProps)(BookinConfirmed);

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
    text: {
        marginBottom: 10
    },
    image: {
        height: 200,
        width: '100%',
        marginBottom: 40
    }
}