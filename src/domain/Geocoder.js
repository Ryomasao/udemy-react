import axios from 'axios';

const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';
const API_KEY = '';

export const geocode = (place) => {
  const config = {
    params: {
      address: place,
      key: API_KEY,
    },
  };

  return (axios
    .get(GEOCODE_ENDPOINT, config)
    .then((res) => {
      const { data } = res;
      const { status } = data;
      const result = data.results[0];

      if (typeof result === 'undefined') {
        return { status };
      }

      const address = result.formatted_address;
      const { location } = result.geometry;

      return { status, address, location };
    }));
};


export const reverseGeocode = () => null;

