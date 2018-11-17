import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView} from 'react-native';
import MyToast from './lib/Toast';
import ActivityHeader from './lib/ActivityHeader';
import FooterButton from './lib/FooterButton';
import ServiceMenu from './lib/ServiceMenu';
import MyIcon from './lib/MyIcon';
import { MIN_BOOKING } from '../constants';
import Text from './lib/LPText';

class FullCart extends React.Component {
    render() {
        const { bookingDetails: { services }, navigation, noHeaderFooter, hideControl } = this.props,
            objKeys = Object.keys(services);

        return (
            <View style={styles.services}>
                <MyToast handleToastRef={this.saveToastRef} />
                {!noHeaderFooter ? <ActivityHeader navigation={navigation} heading='CART'/> : null}
                {objKeys.length > 0 ? this.renderNonEmptyCartContent(objKeys, services, hideControl) : this.renderEmptyCartContent()}
                {!noHeaderFooter ? <FooterButton content="Book Now" handleButtonPress={this.handleButtonPress} inActive={objKeys.length === 0}/> : null }
            </View>
        )
    }

    renderEmptyCartContent() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <MyIcon name='shopping-cart'
                        style={styles.icon}
                    />
                    <Text>Your cart is empty, please add services.</Text>
                </View>
            </View>
        )
    }

    renderNonEmptyCartContent(objKeys, services, hideControl) {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.card}>
                    {objKeys.map(key => {
                        return <ServiceMenu key={key} itemDetail={{ item: services[key], id: key }} count={services[key] ? services[key].count : 0} hideControl={hideControl}/>
                    })}
                </View>
            </ScrollView>
        )
    }

    handleButtonPress = () => {
        const { bookingDetails: { total, minBooking }, navigation } = this.props;
        if (total >= minBooking) {
            navigation.navigate('UserDetails');
        } else {
            this.toast.show(MIN_BOOKING, 3000);
        }
    }

    saveToastRef = (toast) => {
        this.toast = toast;
    }
}

function mapStateToProps(state) {
    return {
        bookingDetails: state.bookingDetails
    };
}

export default connect(mapStateToProps)(FullCart);

const styles = {
    services: {
        flex: 1
    },
    icon: {
        color: '#ccc',
        fontSize: 100
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        flex: 1,
        elevation: 5,
        backgroundColor: '#fff',
        width: '100%',
        padding: 10
    }
}
