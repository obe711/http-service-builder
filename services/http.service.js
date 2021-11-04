const axios = require('axios');
const qs = require("qs");

module.exports.createHttpCaller = (baseURL) => {
  return axios.create({
    withCredentials: false,
    baseURL,
    paramsSerializer: params => {
      return qs.stringify(params)
    }
  });
};

module.exports.createAuthCaller = (baseURL, token) => {
  return axios.create({
    withCredentials: false,
    baseURL,
    headers: {
      common: {
        'x-api-key': token
      }
    },
    paramsSerializer: params => {
      return qs.stringify(params)
    }
  });
};