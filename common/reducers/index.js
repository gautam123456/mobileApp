import {combineReducers} from "redux";
import userDetails from "./userDetails";
import bookingDetails from "./bookingDetails";
import misc from "./misc";

export default combineReducers({
    userDetails,
    bookingDetails,
    misc
});
