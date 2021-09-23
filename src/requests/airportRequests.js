import axios from 'axios';

const baseUrl = 'https://www.air-port-codes.com/api/v1/autocomplete';

// eslint-disable-next-line import/prefer-default-export
export const getAirportsRequest = (keyword) =>
  axios(`${baseUrl}?term=${keyword}`, {
    headers: { 'APC-Auth': process.env.AIRPORT_PUB_KEY },
  });
