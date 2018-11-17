import React from 'react';
import { StackNavigator } from 'react-navigation';

//import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const RootStackNavigator = StackNavigator(
    {
        navigationOptions: () => ({
            headerTitleStyle: {
                fontWeight: 'normal',
            }
        }),
    }
);

export default class RouteNavigator extends React.Component {
    componentDidMount() {
        //this._notificationSubscription = this._registerForPushNotifications();
    }

    componentWillUnmount() {
        //this._notificationSubscription && this._notificationSubscription.remove();
    }

    render() {
        return <RootStackNavigator />;
    }
}
