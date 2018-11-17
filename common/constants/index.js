
// Redux constants
export const FETCHED_ITEMS = 'FETCHED_ITEMS';
export const FETCHED_USER = 'FETCHED_USER';
export const NON_FETCHED_USER = 'NON_FETCHED_USER';
export const CART_UPDATED = 'CART_UPDATED';
export const TIME_SELECTED = 'TIME_SELECTED';
export const DATE_SELECTED = 'DATE_SELECTED';
export const COUPON_APPLIED = 'COUPON_APPLIED';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const SAVE_LOGIN_DATA = 'SAVE_LOGIN_DATA';
export const SAVE_BOOKING_DATA = 'SAVE_BOOKING_DATA';
export const SAVE_BOOKED_DATA = 'SAVE_BOOKED_DATA';
export const USER_REGISTERED = 'USER_REGISTERED';
export const ADDRESS_SELECTED = 'ADDRESS_SELECTED';
export const CLEAR_CART = 'CLEAR_CART';
export const UPDATE_REFETCH_FLAG = 'UPDATE_REFETCH_FLAG';
export const UPDATE_REF_COUNT = 'UPDATE_REF_COUNT';
export const TOGGLE_OVERLAY = 'TOGGLE_OVERLAY';
export const SHOW_OVERLAY = 'SHOW_OVERLAY';
export const HIDE_OVERLAY = 'HIDE_OVERLAY';
export const SET_SCREEN_WIDTH = 'SET_SCREEN_WIDTH';
export const TOGGLE_INTRODUCTION = 'TOGGLE_INTRODUCTION';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const API_PATH = 'https://api.lookplex.com/wsv1/masnepservice';
export const LOOKPLEX_URL = 'https://devxyz123.lookplex.com/';
export const S3_IMAGE_PATH = 'https://s3-us-west-2.amazonaws.com/lplexassets/images/app';
export const WHATS_APP_TEXT = `whatsapp://send?text=${'Hey! I am interested in Salon at Home Services. Kindly guide me through it'}&phone=${918826755766}`;
export const MESSENGER_TEXT = 'fb-messenger://user-thread/Lookplex?ref=w690631';
export const MESSENGER_URL = 'http://m.me/Lookplex?ref=w690631';
export const PLAYSTORE_URL = 'http://play.google.com/store/apps/details?id=com.lookplex';

// Notification Messages
export const MIN_BOOKING = 'Minimum booking amount is Rs.699, please add more services.';
export const TIME = 'Please select valid date & time slot (Between 9:00am to 6:00pm).';
export const NUMBER = 'Please provide valid mobile number.';
export const EMAIL = 'Please provide valid email address.';
export const ADDRESS = 'Please add and select address';
export const REFRESH = 'Some data lost due to your page refresh, please restart the booking flow';
export const OTP = 'Please provide 6 digit OTP sent on your mobile';
export const ADD_ADDRESS = 'Please provide your complete address';
export const LANDMARK = 'Please provide your nearest landmark';
export const CITY = 'Please select your city';
export const NAME = 'Please provide your name';
export const MIN_COUPON_AMNT = 'Minimum billing amount to avail this offer is Rs.';
export const OTP_RESENT = 'OTP successfully resent on your mobile number';
export const MATERIAL_ICONS = 'MaterialIcons';

// Notification Types
export const I = 'info';
export const E = 'error';
export const S = 'success';
export const W = 'warning';

// PlaceHolder const
export const PH = 'placeholder';
export const EM = 'Enter mail id (To receive booking details)';
export const MO = 'Enter mobile no (To receive status updates)';
export const MSG = 'Wish to share something that we can help you with? (Optional)';
export const R_CANCEL = 'Reason for cancellation';
export const CITIES = ['New Delhi', 'Noida', 'Gurgaon', 'Faridabad', 'Ghaziabad', 'Greater Noida', 'Pune', 'Hyderabad', 'Dehradun'];

//Screen Widths
export const DESKTOP_MIN = 1024, IPAD_MIN = 768, BIG_MOBILE_MIN = 640, MOBILE_MIN = 320;
export const HEADER_MAX_HEIGHT = 380;
export const HEADER_MIN_HEIGHT = 90;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const ROUTES = {
    HOME: 'Home',
    USER_DETAILS: 'UserDetails',
    ADDRESS_LIST: 'AddressList',
    ADD_ADDRESS: 'AddAddress',
    BOOKING_CONFIRM: 'BookingConfirm',
    BOOKING_CONFIRMED: 'BookingConfirmed',
    CART: 'Cart',
    CANCEL: 'Cancel',
    RESCHEDULE: 'Reschedule',
    WEB_VIEW: 'WebView',
    NOTIFICATIONS: 'Notifications',
    LOGIN: 'Login',
    MY_APPOINTMENTS: 'MyAppointments',
    OFFERS: 'Offers',
    REFER_AND_EARN: 'ReferAndEarn',
    DRAWER_OPEN: 'DrawerOpen'
}




