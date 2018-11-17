import { FETCHED_ITEMS, SAVE_BOOKED_DATA, HIDE_OVERLAY, SHOW_OVERLAY, TOGGLE_OVERLAY, TOGGLE_INTRODUCTION } from '../constants';

const initialState = {
    items: null,
    source: '',
    bookingID: '',
    moneySaved: 0,
    finalAmount: 0,
    showLoader: false,
    showOverlay: false,
    showInroduction: true,
    userAgent: 'android-app'
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCHED_ITEMS:
            const { items, source } = action;
            return {...state, ...{
                items,
                source
            }};

        case SAVE_BOOKED_DATA:
            const { data: { moneySaved, finalAmount, bookingID } } = action;
            return {...state, ...{
                bookingID,
                moneySaved,
                finalAmount
            }};

        case HIDE_OVERLAY:
            return {...state, ...{
                showOverlay: false
            }};

        case SHOW_OVERLAY:
            return {...state, ...{
                showOverlay: true
            }};
        
        case TOGGLE_OVERLAY:
            return {...state, ...{
                showOverlay: action.showOverlay
            }};

        case TOGGLE_INTRODUCTION:
            return {
                ...state, ...{
                    showInroduction: action.showInroduction
                }
            };

        default:
            return state;
    }
};
