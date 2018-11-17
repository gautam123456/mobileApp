import React from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { colors } from './src/styles/index.style';
import MyIcon from './MyIcon';
import { ROUTES } from '../../constants';
import Text from './LPText';
const IMG_PATH = '../../assets/images/logo.png';

class HeaderNav extends React.Component {

    handleToggleButtonPress = () => {
        this.props.navigation.openDrawer(ROUTES.DRAWER_OPEN);
    }

    handleHomePress = () => {
        this.props.navigation.navigate(ROUTES.HOME);
    }

    handleNotificationPress = () => {
        this.props.navigation.navigate(ROUTES.NOTIFICATIONS);
    }

    handleCartPress = () => {
        this.props.navigation.navigate(ROUTES.CART);
    }

    render() {
        const { servicesCount, backgroundColor, showHome, notifications, showNotification } = this.props,
            notificationsCount = notifications ? notifications.length : 0;

        return (
                    <View style={{width: '100%'}}>
                        <View style={[styles.header, { backgroundColor: backgroundColor || colors.background1}]}>
                            <View style={styles.toggle}>
                                <MyIcon name='menu'
                                    onPress={this.handleToggleButtonPress}
                                    style={styles.toggleIcon}
                                />
                            </View>
                            <View style={styles.img}>
                                <Image style={styles.logo}
                                   source={require(IMG_PATH)} />
                            </View>

                            {showNotification && notificationsCount ? 
                            <View style={styles.ph}>
                                <MyIcon name='notifications'
                                    onPress={this.handleNotificationPress}
                                />
                                <Text style={styles.count}>{notificationsCount}</Text>
                            </View> : null}

                            {showHome ? 
                            <View style={styles.ph}>
                                <MyIcon name='home'
                                    onPress={this.handleHomePress}
                                    />
                            </View> : 
                            <View style={styles.ph}>
                                <MyIcon name='shopping-cart'
                                    onPress={this.handleCartPress}
                                />
                            {servicesCount ? <Text style={styles.count}>{servicesCount}</Text> : null}    
                            </View>}

                        </View>
                    </View>

        );
    }
}

function mapStateToProps(state) {
    return {
        name: state.userDetails,
        servicesCount: state.bookingDetails.servicesCount,
        notifications: state.userDetails.notifications
    };
}

export default connect(mapStateToProps)(HeaderNav);

const styles = {
    header: {
        alignItems: 'center',
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 0,
        width: '100%',
        height: 70,
        paddingHorizontal: 10,
        paddingRight: 17
    },
    toggleIcon: {
        fontSize: 30,
        color: '#fff',
    },
    img: {
        flex: 5,
        alignItems: 'center'
    },
    logo: {
        height: 25,
        width: 120
    },
    ph: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    toggle: {
        flex: 1
    },
    count: {
        backgroundColor: colors.background2,
        borderRadius: 9,
        lineHeight: 17,
        color: '#fff',
        height: 17,
        fontWeight: '600',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        marginLeft: -7
    }
}
