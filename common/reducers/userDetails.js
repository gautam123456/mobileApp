import { FETCHED_USER, NON_FETCHED_USER, SAVE_LOGIN_DATA, USER_REGISTERED, UPDATE_REFETCH_FLAG, UPDATE_REF_COUNT, ADD_NOTIFICATION } from '../constants';

const initialState = {
    isFetching: true,
    isLoggedIn: false,
    details: null,
    isNewUser: false,
    number: '',
    token: '',
    otp: '',
    referredBy: '',
    reFetchDetails: false,
    notifications: [] //[{ onClick: 'HOME', image: 'https://s3-us-west-2.amazonaws.com/lplexassets/images/app/2.jpg?v=22', title: 'Book a total relaxation - Full body massage for your hubby @ just Rs777/-', description: '(O3+ Facial + O3+ Bleach - Face & Neck + Full Face Threading + L\'Oreal Hair Spa + Rica Wax - Full Body + Rica Wax - Bikini + Body Polishing + Lotus Crystal Spa Manicure & Pedicure.)'}]
};

export default function (state = initialState, action) {
    switch (action.type) {

        case FETCHED_USER:
            return Object.assign({}, state, {
                isFetching: false,
                isLoggedIn: true,
                details: action.details
            });

        case NON_FETCHED_USER:
            return Object.assign({}, state, {
                isFetching: false,
                isLoggedIn: false,
                details: null
            });

        case SAVE_LOGIN_DATA:
            const { number, token, otp, referredBy, isNewUser } = action.data;
            return Object.assign({}, state, {
                number,
                token,
                otp,
                referredBy,
                isNewUser
            });

        case USER_REGISTERED:
            return Object.assign({}, state, {
                isNewUser: false,
                isLoggedIn: true
            });

        case UPDATE_REFETCH_FLAG:
            return Object.assign({}, state, {
                reFetchDetails: action.flag
            });

        case UPDATE_REF_COUNT:
            const nextState = Object.assign({}, state);
            nextState.details.refCount = nextState.details.refCount ? parseInt(nextState.details.refCount) - 1 : 0;
            return nextState;
        
        case ADD_NOTIFICATION:
            let notifications = [action.notification, ...state.notifications]
            if(notifications.length > 3){
                notifications.length = 3;
            }
            return { ...state, ...{ notifications } };

        default:
            return state;
    }
};
