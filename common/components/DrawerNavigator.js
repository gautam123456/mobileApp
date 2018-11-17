import Home from './Home';
import ReferAndEarn from './ReferAndEarn';
import MyAppointments from './MyAppointments';
import Offers from './Offers';
import Login from './Login';
import BookingConfirm from './BookingConfirm';
import BookingConfirmed from './BookingConfirmed';
import FullCart from './FullCart';
import AddAddress from './AddAddress';
import AddressList from './AddressList';
import UserDetails from './UserDetails';
import MyNotifications from './MyNotifications';
import Cancel from './Cancel';
import Reschedule from './Reschedule';
import WebView from './WebView';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import DrawerContent from './DrawerContent';
import { ROUTES } from '../constants';

const { HOME, USER_DETAILS, ADD_ADDRESS, ADDRESS_LIST, BOOKING_CONFIRM, BOOKING_CONFIRMED, CART, CANCEL, RESCHEDULE, WEB_VIEW, NOTIFICATIONS, LOGIN, MY_APPOINTMENTS, OFFERS, REFER_AND_EARN } = ROUTES;

export const BookingFlow = createStackNavigator({
    [HOME]: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    [USER_DETAILS]: {
        screen: UserDetails,
        navigationOptions: {
            header: null
        }
    },
    [ADDRESS_LIST]: {
        screen: AddressList,
        navigationOptions: {
            header: null
        }
    },
    [ADD_ADDRESS]: {
        screen: AddAddress,
        navigationOptions: {
            header: null
        }
    },
    [BOOKING_CONFIRM]: {
        screen: BookingConfirm,
        navigationOptions: {
            header: null
        }
    },
    [BOOKING_CONFIRMED]: {
        screen: BookingConfirmed,
        navigationOptions: {
            header: null
        } 
    },
    [CART]: {
        screen: FullCart,
        navigationOptions: {
            header: null
        } 
    },
    [CANCEL]: {
        screen: Cancel,
        navigationOptions: {
            header: null
        }
    },
    [RESCHEDULE]: {
        screen: Reschedule,
        navigationOptions: {
            header: null
        }
    },
    [WEB_VIEW]: {
        screen: WebView,
        navigationOptions: {
            header: null
        }
    },
    [NOTIFICATIONS]: {
        screen: MyNotifications,
        navigationOptions: {
            header: null
        }
    }
});

export const RescheduleFlow = createStackNavigator({
    [MY_APPOINTMENTS]: {
        screen: MyAppointments,
        navigationOptions: {
            header: null
        }
    },
    [RESCHEDULE]: {
        screen: Reschedule,
        navigationOptions: {
            header: null
        }
    },
    [CANCEL]: {
        screen: Cancel,
        navigationOptions: {
            header: null
        }
    }
});

export default createDrawerNavigator(
    {
        [LOGIN]: {
            screen: Login,
            navigationOptions: {
                title: 'Login'
            }
        },
        [HOME]: {
            screen: BookingFlow,
            navigationOptions: {
                title: 'Home'
            }
        },
        [MY_APPOINTMENTS]: {
            screen: RescheduleFlow,
            navigationOptions: {
                title: 'My Appointments'
            }
        },
        [OFFERS]: {
            screen: Offers,
            navigationOptions: {
                title: 'Offers'
            }
        },
        [REFER_AND_EARN]: {
            screen: ReferAndEarn,
            navigationOptions: {
                title: 'Refer & Earn'
            }
        },
        [USER_DETAILS]: {
            screen: UserDetails,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: HOME, //TODO change to Home
        contentComponent: DrawerContent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        contentOptions: {
            activeTintColor: '#ccc',
            inactiveTintColor: '#fff',
            itemsContainerStyle: {
                marginVertical: 0
            },
            iconContainerStyle: {
                opacity: 1
            }
        }
    }
);
