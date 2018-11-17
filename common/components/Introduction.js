import React from 'react';
import { connect } from 'react-redux';
import { toggleIntroduction, getItems, getUserDetails } from '../actions';
import { StyleSheet, Dimensions, View, NetInfo, Alert } from 'react-native';
import DrawerNavigator from './DrawerNavigator';
import AppIntroSlider from 'react-native-app-intro-slider';
//import CodePush from "react-native-code-push";
import MyIcon from './lib/MyIcon';
import { colors } from './lib/src/styles/index.style';

const height = Dimensions.get('window').height + 50,
    width = Dimensions.get('window').width;
;

const styles = StyleSheet.create({
    image: {
        width,
        height
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(252,92,125,.5)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const slides = [
    {
        image: require('../assets/images/intro/2.png'),
        imageStyle: styles.image
    },
    {
        image: require('../assets/images/intro/3.png'),
        imageStyle: styles.image
    },
    {
        image: require('../assets/images/intro/4.png'),
        imageStyle: styles.image
    }
];

class Introduction extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = { restartAllowed: true };
    // }

    // componentDidMount() {
    //     this.codePushSyncProcess();
    // }

    // codePushSyncProcess() {
    //     codePush.sync({
    //         updateDialog: false,
    //         installMode: codePush.InstallMode.IMMEDIATE
    //     });
    // }

    // codePushStatusDidChange(syncStatus) {
    //     switch (syncStatus) {
    //         case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
    //             this.setState({ syncMessage: "Checking for update." });
    //             break;
    //         case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
    //             this.setState({ syncMessage: "Downloading package." });
    //             break;
    //         case CodePush.SyncStatus.AWAITING_USER_ACTION:
    //             this.setState({ syncMessage: "Awaiting user action." });
    //             break;
    //         case CodePush.SyncStatus.INSTALLING_UPDATE:
    //             this.setState({ syncMessage: "Installing update." });
    //             break;
    //         case CodePush.SyncStatus.UP_TO_DATE:
    //             this.setState({ syncMessage: "App up to date.", progress: false });
    //             break;
    //         case CodePush.SyncStatus.UPDATE_IGNORED:
    //             this.setState({ syncMessage: "Update cancelled by user.", progress: false });
    //             break;
    //         case CodePush.SyncStatus.UPDATE_INSTALLED:
    //             this.setState({ syncMessage: "Update installed and will be applied on restart.", progress: false });
    //             break;
    //         case CodePush.SyncStatus.UNKNOWN_ERROR:
    //             this.setState({ syncMessage: "An unknown error occurred.", progress: false });
    //             break;
    //     }
    // }

    // codePushDownloadDidProgress(progress) {
    //     this.setState({ progress });
    // }

    // toggleAllowRestart() {
    //     this.state.restartAllowed
    //         ? CodePush.disallowRestart()
    //         : CodePush.allowRestart();

    //     this.setState({ restartAllowed: !this.state.restartAllowed });
    // }

    // getUpdateMetadata() {
    //     CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
    //         .then((metadata) => {
    //             this.setState({ syncMessage: metadata ? JSON.stringify(metadata) : "Running binary version", progress: false });
    //         }, (error) => {
    //             this.setState({ syncMessage: "Error: " + error, progress: false });
    //         });
    // }

    /** Update is downloaded silently, and applied on restart (recommended) */
    componentDidMount() {
            // CodePush.sync(
            //     {}
            // );

        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
        this.checkInternetConnection();
    }

    checkInternetConnection(isRetry) {
        NetInfo.isConnected.fetch().done(
            isConnected => { 
                if(!isConnected){
                    Alert.alert(
                        'There is no internet connection',
                        'Please connect and re-launch the app',
                        [
                            { text: 'RETRY', onPress: () => this.checkInternetConnection(true) }
                        ],
                        { cancelable: false }
                    )
                } else if (isRetry){
                    this.handleConnectionChange();
                }
            }
        );
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    handleConnectionChange = () => {
        const { getItems, getUserDetails } = this.props;
        getItems();
        getUserDetails();
    }

    // componentWillUnmount() {
    //     this.pushNotificationUnSubscription();
    // }

    // pushNotificationUnSubscription() {
    //     this.notificationDisplayedListener();
    //     this.notificationListener();
    //     this.notificationOpenedListener();
    // }

    // async pushNotificationSubscription() {
    //     const notificationOpen = await firebase.notifications().getInitialNotification();
    //     if (notificationOpen) {
    //         this.props.navigation.navigate(ROUTES.NOTIFICATIONS, {notification: notificationOpen.notification.data});
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
    //         firebase.notifications().removeDeliveredNotification(notification.notificationId);

    //     });
    // }
    
    _onDone = () => {
        this.props.toggleIntroduction({ showInroduction: false});
    }

    _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <MyIcon name='arrow-forward'
                    style={{ backgroundColor: 'transparent', color: colors.background1, fontSize: 24 }}
                />
            </View>
        );
    }

    get renderRealApp() {
        if (!this.props.showInroduction) {
            return <DrawerNavigator />;
        } else {
            return <AppIntroSlider slides={slides} onDone={this._onDone} renderNextButton={this._renderNextButton} renderDoneButton={this._renderNextButton}/>;
        }
    }

    render() {
        return this.renderRealApp;
    }
}

function mapStateToProps(state) {
    return {
        showInroduction: state.misc.showInroduction
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleIntroduction: (options) => {
            dispatch(toggleIntroduction(options));
        },
        getItems: () => {
            dispatch(getItems());
        },
        getUserDetails: () => {
            dispatch(getUserDetails());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Introduction);

// const App = connect(mapStateToProps, mapDispatchToProps)(Introduction),
//     codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };

//export default CodePush(codePushOptions)(App);
