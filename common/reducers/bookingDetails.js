import {CART_UPDATED, COUPON_APPLIED, SAVE_BOOKING_DATA, ADDRESS_SELECTED, CLEAR_CART} from '../constants';

const initialState = {
  subTotal: 0,
  total: 0,
  servicesCount: 0,
  minBooking: 699,
  convenienceCharges: 0,
  complementaryOffer: '',
  discount: 30,
  couponCode: 'LOOK30',
  location: '',
  addressLKey: '',
  services: {},
  date: '',
  timing: '',
  serviceIds: '',
  emailId: '',
  comment: ''
};

export default function(state = initialState, action) {
  switch (action.type) {

    case CART_UPDATED:
    const {id, name, cost, count, operation, discount} = action.options;
      let services = Object.assign({}, state.services),
        newState = null;

      const costFloat = parseFloat(cost).toFixed(2),
        discountInt = parseInt(discount || 0),
        amountAfterDiscount = parseFloat(costFloat - (costFloat * discountInt/100)).toFixed(2);

      if(operation) {
          if(services[id]){
            services[id].count += 1;
          }else{
            services[id] = {
              count: 1,
              name,
              cost: costFloat,
              discount: discountInt
            }
          }

          newState = {
            servicesCount: state.servicesCount + 1,
            subTotal: parseFloat(parseFloat(state.subTotal) + parseFloat(costFloat)).toFixed(2),
            services,
            total: parseFloat(parseFloat(state.total) + parseFloat(amountAfterDiscount)).toFixed(2)
          };

      }else{

          services[id].count -= 1;
          if(services[id].count === 0){
            delete services[id];
          }
          const servicesCount = state.servicesCount - 1;

          newState = {
            servicesCount,
            subTotal: servicesCount ?  parseFloat(parseFloat(state.subTotal) - parseFloat(costFloat)).toFixed(2) : 0,
            services,
            total: servicesCount ? parseFloat(parseFloat(state.total) - parseFloat(amountAfterDiscount)).toFixed(2) : 0
          };
      }

      return Object.assign({}, state, newState);

    case COUPON_APPLIED:
      const {couponCode, refDiscount, complementaryOffer} = action.options,
        total = (state.subTotal - (state.subTotal * action.options.discount)/100);
      return Object.assign({}, state, {
        couponCode,
        discount: action.options.discount,
        total,
        complementaryOffer
      });

    case SAVE_BOOKING_DATA:
      const {options: {timing:{date, month, time, year}, mailId, comment}} = action;
      return Object.assign({}, state, {
        date: month + '/' + date + '/' + year,
        timing: time,
        emailId: mailId,
        comment
      });

    case ADDRESS_SELECTED:
      return Object.assign({}, state, {
        addressLKey: action.options.activelkey
      });

    case CLEAR_CART:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
};
