import React from 'react';
import { Linking } from 'react-native';

export function formatDataInFormUrlencoded(obj) {
    if(!obj){
        return;
    }

    let formBody = [];
    for (let property in obj) {
        let encodedKey = property;
        let encodedValue = obj[property];
        formBody.push(encodedKey + "=" + encodedValue);
    }

    return formBody.join("&");
}

export function makeFetchCall({url, type, payload, successCallback, errorCallback}, dispatch, hideOverlay, showOverlay) {

    dispatch(showOverlay());
    console.log(payload);
    const body = formatDataInFormUrlencoded(payload),
        method = type || 'POST';
    let status = '';

    console.log("-----------API Call------------");
    console.log(method + " : " + url);
    console.log('Payload : ' + body);

    fetch(url, {
        method,
        body,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
        status = res.status;
            return res.json();
        }).then(details => {
            if (successCallback && details && status === 200) {
                successCallback(details);
            } else if (errorCallback && details && status !== 200) {
                if (errorCallback) {
                    errorCallback(details);
                }
            }
        dispatch(hideOverlay());
        }).catch(error => {
            console.error('API Call Error :::::::------- ', error);
            if (errorCallback) {
                errorCallback(error);
            }

            dispatch(hideOverlay());
        });
}

export function openApp(url){
    Linking.canOpenURL(url).then(supported => {
        if (!supported) {
            console.log('Can\'t handle url: ' + url);
        } else {
            return Linking.openURL(url);
        }
    }).catch(err => console.error('An error occurred', err));
}