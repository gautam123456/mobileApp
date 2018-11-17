import React from 'react';
import { Image, ScrollView, View, TouchableOpacity } from 'react-native';
import { Container, Header } from 'native-base';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from './lib/src/styles/index.style';
import { connect } from 'react-redux';
import { logOut } from '../actions';
import MyIcon from './lib/MyIcon';
import LPText from './lib/LPText';
import { openApp } from '../constants/Utility';
import { PLAYSTORE_URL } from '../constants';

const IMG_PATH = '../assets/images/logo.png';
const DRAWER_OPTIONS = [{ title: 'Login', route: 'Login', icon: 'account-circle' }, { title: 'Home', route: 'Home', icon: 'home' }, { title: 'My Appointments', route: 'MyAppointments', icon: 'timer' }, { title: 'Offers', route: 'Offers', icon: 'local-offer' }, { title: 'Refer & Earn', route: 'ReferAndEarn', icon: 'person' }];

class DrawerContent extends React.Component {
    navigateToScreen = (route) => () => {
        const navigate = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigate); 
    }

    getDrawerOptions = ({ title, route, icon }) => {
        return (
            <TouchableOpacity key={title} onPress={this.navigateToScreen(route)}>
                <View style={styles.menu}>
                    <MyIcon name={icon}
                        style={styles.icon}
                    />
                    <LPText style={styles.text}>
                        {title}
                    </LPText>
                </View>
            </TouchableOpacity>
        )
    }

    handleLogoutPress = () => {
        this.props.logOut();
    }

    handleRatingPress = () => {
        openApp(PLAYSTORE_URL);
    }

    render() {
        const { isLoggedIn } = this.props,
            clonedDrawerOption = [].concat(DRAWER_OPTIONS);

        if(isLoggedIn){
            clonedDrawerOption.shift();
        }

        return (
            <LinearGradient style={styles.bg} colors={[colors.background1, colors.background1, colors.background2]}>
                <ScrollView>
                    <Container>
                        <Header style={styles.headerStyles}>
                            <Image style={styles.drawerImage} source={require(IMG_PATH)} />
                        </Header>
                        <View>
                            {clonedDrawerOption.map(ele => {
                                return this.getDrawerOptions(ele);
                            })}
                        </View>
                        <TouchableOpacity onPress={this.handleRatingPress}>
                            <View style={styles.menu}>
                                <MyIcon name='star'
                                    style={styles.icon}
                                />
                                <LPText style={styles.text}>
                                    Rate us
                                </LPText>
                            </View>
                        </TouchableOpacity>
                        {isLoggedIn ? <TouchableOpacity onPress={this.handleLogoutPress}>
                            <View style={styles.menu}>
                                <MyIcon name='account-circle'
                                    style={styles.icon}
                                />
                                <LPText style={styles.text}>
                                    Logout
                                </LPText>
                            </View>
                        </TouchableOpacity> : null}
                    </Container>
                </ScrollView>
            </LinearGradient>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.userDetails.isLoggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logOut: () => {
            dispatch(logOut());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

const styles = {
    drawerImage: {
        height: 30,
        width: 150
    },
    headerStyles: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    footerView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    footerText: {
        color: '#fff',
        fontSize: 15
    },
    bg: {
        flex: 1
    },
    menu: {
        paddingHorizontal: 20, paddingVertical: 17, flexDirection: 'row', alignItems: 'center'
    },
    icon: {
        fontSize: 20,
        marginRight: 10
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '900'
    }
}
