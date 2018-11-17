import React from 'react';
import { View, Animated, ScrollView, StatusBar } from 'react-native';
//import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import Services from './Services';
import Overlay from './lib/Overlay';
import { makeAPICall, saveUserDetails } from '../actions';
import HomeView from './lib/src/index';
import Footer from './Footer';
import Cart from './Cart';
import MyIcon from './lib/MyIcon';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, HEADER_SCROLL_DISTANCE, ROUTES } from '../constants';
import MyToast from './lib/Toast';
import { colors } from './lib/src/styles/index.style';
import Chats from './Chats';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toast: null,
            scrollY: new Animated.Value(0),
            showChat: false
        }
    }

    static navigationOptions = {
        drawerIcon: (
            <MyIcon name='home'
                style={{fontSize: 20}}
            />
        )
    }

    componentDidMount() {
        this.refs.scrollView.scrollTo(0);
        //this.pushNotificationSubscription()
    }

    componentWillUnmount() {
        this.pushNotificationUnSubscription();
    }

    pushNotificationUnSubscription() {
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
    }

    // async pushNotificationSubscription() {
    //     const notificationOpen = await firebase.notifications().getInitialNotification();
    //     if (notificationOpen) {
    //         this.props.navigation.navigate(ROUTES.NOTIFICATIONS, { notification: notificationOpen.notification.data });
    //     }
    //     const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
    //         .setDescription('My apps test channel');
    //     // Create the channel
    //     firebase.notifications().android.createChannel(channel);

    //     this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
    //         console.log('onNotificationDisplayed', notification);
    //         // Process your notification as required
    //         // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    //     });

    //     this.notificationListener = firebase.notifications().onNotification((notification) => {
    //         notification.android.setChannelId('test-channel').android.setSmallIcon('ic_launcher');
    //         firebase.notifications().displayNotification(notification);
    //     });

    //     this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    //         this.props.navigation.navigate(ROUTES.NOTIFICATIONS, { notification: notificationOpen.notification.data });
    //         firebase.notifications().removeDeliveredNotification(notificationOpen.notification.notificationId);
    //     });
    // }

    render() {
        const {navigation} = this.props,
            { toast, showChat } = this.state,
            headerHeight = this.state.scrollY.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE],
                outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
                extrapolate: 'clamp',
            });
            // imageTranslate = this.state.scrollY.interpolate({
            //     inputRange: [0, HEADER_SCROLL_DISTANCE],
            //     outputRange: [0, -50],
            //     extrapolate: 'clamp',
            // }),
            // imageOpacity = this.state.scrollY.interpolate({
            //     inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            //     outputRange: [1, 1, 0],
            //     extrapolate: 'clamp',
            // });

        return (
            <View style={{flex: 1}}>
                <StatusBar
                    translucent
                    backgroundColor={colors.background1}
                    animated
                />
                <Overlay />
                <MyToast handleToastRef={this.saveToastRef} />
                <View style={{ flex: 1}}>
                    <ScrollView style={{flex: 1}}
                        ref='scrollView'
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                        )}>
                        <View style={styles.scrollViewContent}>
                            <Services />
                            <HomeView navigation={navigation} isBanner={false} />
                            <Footer navigation={navigation}/>
                        </View>
                    </ScrollView>
                    <Animated.View style={[styles.header, { height: headerHeight }]}>
                        <HomeView navigation={navigation} isBanner={true} />
                    </Animated.View>
                </View>
                {showChat ? 
                    <Chats navigation={navigation} toggleChatComponent={this.toggleChatComponent} /> : 
                    <Cart navigation={navigation} toast={toast} toggleChatComponent={this.toggleChatComponent} />
                }
                
            </View>
        );
    }

    toggleChatComponent = (showChat) => {
        this.setState({showChat});
    }

    saveToastRef = (toastRef) => {
        this.setState({toast: toastRef});
    }

    handleToggleButtonPress = () => {
        this.props.navigation.openDrawer(ROUTES.DRAWER_OPEN);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        makeAPICall: (data) => {
            dispatch(makeAPICall(data));
        },
        saveUserDetails: (data) => {
            dispatch(saveUserDetails(data));
        }
    };
}

export default connect(null, mapDispatchToProps)(Home);

const styles = {
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#03A9F4',
        overflow: 'hidden',
    },
    bar: {
        marginTop: 28,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
    },
}