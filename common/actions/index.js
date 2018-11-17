import {
  FETCHED_ITEMS, FETCHED_USER, NON_FETCHED_USER,
  SAVE_LOGIN_DATA, USER_REGISTERED, CART_UPDATED,
  SAVE_BOOKING_DATA, ADDRESS_SELECTED, COUPON_APPLIED,
  SAVE_BOOKED_DATA, CLEAR_CART, UPDATE_REFETCH_FLAG,
  UPDATE_REF_COUNT, E, TOGGLE_OVERLAY, TOGGLE_INTRODUCTION,
  TOGGLE_DRAWER, SET_SCREEN_WIDTH, SHOW_OVERLAY, HIDE_OVERLAY, API_PATH, ADD_NOTIFICATION
} from '../constants';

import { makeFetchCall } from '../constants/Utility';

function fetchedItems(items) {
  return {
    type: FETCHED_ITEMS,
    items
  };
}

export function fetchedUser(details) {
  return {
    type: FETCHED_USER,
    details
  };
}

export function addNotification(notification) {
  return {
    type: ADD_NOTIFICATION,
    notification
  };
}

function nonFetchedUser() {
  return {
    type: NON_FETCHED_USER
  };
}

function saveUserLoginData(data) {
  return {
    type: SAVE_LOGIN_DATA,
    data
  };
}

function noMoreNewUser() {
  return {
    type: USER_REGISTERED
  };
}

function bookingDetailsUpdated(options) {
  return {
    type: CART_UPDATED,
    options
  };
}

function saveUserBookingData(options) {
  return {
    type: SAVE_BOOKING_DATA,
    options
  };
}

function userAddressSelected(options) {
  return {
    type: ADDRESS_SELECTED,
    options
  };
}

function couponCodeApplied(options) {
  return {
    type: COUPON_APPLIED,
    options
  };
}
function saveSuccessBookedData(data) {
  return {
    type: SAVE_BOOKED_DATA,
    data
  };
}

function clearedCart() {
  return {
    type: CLEAR_CART
  };
}

function reFetchDetails(flag) {
  return {
    type: UPDATE_REFETCH_FLAG,
    flag
  };
}

function updateRefCount() {
  return {
    type: UPDATE_REF_COUNT
  };
}

// function toggleLoader2(showLoader) {
//   return {
//     type: TOGGLE_LOADER,
//     showLoader
//   }
// }

export function getItems() {
  return (dispatch) => {
    let url = `https://static.lookplex.com/data/services.json?v=` + new Date().getTime(),
      type = 'GET'
      payload = {},
      successCallback = (items) => {
        return dispatch(fetchedItems(items));
      };

    return makeFetchCall({ url, type, payload, successCallback }, dispatch, hideOverlay, showOverlay);  
  };
}

export function getUserDetails() {
  return (dispatch) => {

    let url = `${API_PATH}/isloggedinnew`,
      type = 'GET'
      payload = {};

    let errorCallback = () => {
        return dispatch(nonFetchedUser());
      };

      let successCallback = (details) => {
        return dispatch(fetchedUser(details));
      };
    return makeFetchCall({ url, type, payload, successCallback, errorCallback }, dispatch, hideOverlay, showOverlay);  
  };
}

export function logOut() {
  return (dispatch) => {

    let url = `${API_PATH}/custlogout`,
      type = 'GET'
    payload = {};

    let errorCallback = () => {
      
    };

    let successCallback = () => {
      return dispatch(nonFetchedUser());
    };

    return makeFetchCall({ url, type, payload, successCallback, errorCallback }, dispatch, hideOverlay, showOverlay);
  };
}

export function logIn(data, showNotification, navigateTo = '', navigation, toast) {
  return (dispatch) => {

    let url = `${API_PATH}/loginguestcustomer`,
      type = 'POST'
    payload = data;

    let errorCallback = (e) => {
      toast.show(e.message, 3000);
    };

    let successCallback = (details) => {
      navigation.navigate(navigateTo);
      return dispatch(fetchedUser(details));
    };

    return makeFetchCall({ url, type, payload, successCallback, errorCallback }, dispatch, hideOverlay, showOverlay);
  };
}

export function registerUser({ data, successCallback: successCallback2, navigation, navigateTo, toast}) {
  return (dispatch) => {

    let url = `${API_PATH}/saveguestcustomer`,
      type = 'POST'
      payload = data;

    let errorCallback = (e) => {
      toast.show(e.message, 3000);
    };

    let successCallback = (details) => {
      navigateTo && navigation ? navigation.navigate(navigateTo) : null;
      successCallback2();
      return dispatch(fetchedUser(details));
    };

    return makeFetchCall({ url, type, payload, successCallback, errorCallback }, dispatch, hideOverlay, showOverlay);
  };
}

export function saveLoginData(data) {
  return (dispatch) => {
    return dispatch(saveUserLoginData(data));
  };
}

export function userRegistered() {
  return (dispatch) => {
    return dispatch(noMoreNewUser());
  };
}

export function bookingDetailsChanged(options) {
  return (dispatch) => {
    return dispatch(bookingDetailsUpdated(options));
  };
}

export function saveBookingData(options) {
  return (dispatch) => {
    return dispatch(saveUserBookingData(options));
  };
}

export function addressSelected(options) {
  return (dispatch) => {
    return dispatch(userAddressSelected(options));
  };
}

export function couponApplied(options) {
  return (dispatch) => {
    return dispatch(couponCodeApplied(options));
  };
}

export function saveBookedData(data) {
  return (dispatch) => {
    return dispatch(saveSuccessBookedData(data));
  };
}

export function clearCart() {
  return (dispatch) => {
    return dispatch(clearedCart());
  };
}

export function reFetchUserDetails(flag) {
  return (dispatch) => {
    return dispatch(reFetchDetails(flag));
  };
}

export function updateRefCounts() {
  return (dispatch) => {
    return dispatch(updateRefCount());
  };
}

// export function toggleLoader(data) {
//   return (dispatch) => {
//     return dispatch({
//       type: TOGGLE_LOADER,
//       showLoader: data.showLoader
//     });
//   };
// }

export function toggleOverlay(data) {
  return (dispatch) => {
    return dispatch({
      type: TOGGLE_OVERLAY,
      showOverlay: data.showOverlay
    });
  };
}

export function toggleIntroduction(data) {
  return (dispatch) => {
    return dispatch({
      type: TOGGLE_INTRODUCTION,
      showInroduction: data.showInroduction
    });
  };
}

export function toggleDrawer(data) {
  return (dispatch) => {
    return dispatch({
      type: TOGGLE_DRAWER,
      showDrawer: data.showDrawer
    });
  };
}

export function setScreenWidth() {
  return (dispatch) => {
    return dispatch({
      type: SET_SCREEN_WIDTH
    });
  };
}

function showOverlay() {
  return {
    type: SHOW_OVERLAY
  };
}

function hideOverlay() {
  return {
    type: HIDE_OVERLAY
  };
}

export function makeAPICall(obj) {
  return (dispatch) => {
    return makeFetchCall(obj, dispatch, hideOverlay, showOverlay);
  };
}


