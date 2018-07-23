import { combineReducers } from 'redux';

const place = (state = 'せんがわ', action) => {
  switch (action.type) {
    case 'CHANGE_PLACE':
      return action.place;
    default:
      return state;
  }
};

const geocodeResult = (
  state = {
    address: 'st',
    location: { lat: 35.66232, lng: 139.58506 },
  },
  action,
) => {
  switch (action.type) {
    case 'GEOCODE_FETCHED':
      return {
        address: action.address,
        location: action.location,
      };
    default:
      return state;
  }
};


export default combineReducers({ place, geocodeResult });
