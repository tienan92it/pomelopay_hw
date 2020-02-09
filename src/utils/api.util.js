import FormData from 'react-native/Libraries/Network/FormData';
import {AsyncStorage} from 'react-native';

/**
 * Generate search string from params object
 * @param {Object} params
 * @returns {string} result
 */
export const genFormBody = params => {
  const formBody = [];
  for (const property in params) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(params[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  return formBody.join('&');
};

/**
 * Api with method GET and provided params
 * @param {string} url
 * @param {object} params
 * @returns {Promise} Promise
 */
export const getApiWithParams = async (url = '', params = {}) => {
  url = `${url}?${genFormBody(params)}`;
  const headers = await getHeaders();
  // console.log('getApiWithParams...', url);
  return fetch(url, {
    headers,
  }).then(res => res.json());
};

/**
 * Api with method POST and provided params
 * @param {String} url
 * @param {Object} params
 */
export const postApiWithParams = (url = '', params = {}) => {
  // console.log('postApiWithParams...', url, params);
  const formdata = new FormData();
  Object.keys(params).forEach(key => {
    formdata.append(key, params[key]);
  });
  return fetch(url, {
    method: 'POST', // or 'PUT'
    body: formdata, // data can be `string` or {object}!
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res.json());
};

/**
 * Api with method POST and provided json
 * @param {String} url
 * @param {Object} body
 */
export const postApiWithJson = async (url = '', body = {}) => {
  // console.log('postApiWithJson...', url, body);
  const headers = await getHeaders();
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then(res => res.json());
};

/**
 * Api with method POST, basic auth and provided json
 * @param {String} url
 * @param {String} auth
 * @param {Object} body
 */
export const postApiBasicAuthWithJson = async (
  url = '',
  auth = '',
  body = {},
) => {
  const headers = new Headers({
    Authorization: `Basic ${auth}`,
    'Content-Type': 'application/json',
  });
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then(res => res.json());
};

/**
 * Api with method POST and no params
 * @param {String} url
 */
export const postApiWithoutParams = (url = '') => {
  // console.log('postApiWithoutParams...', url);
  return fetch(url, {
    method: 'POST', // or 'PUT'
  }).then(res => res.json());
};

async function getHeaders() {
  const token = await AsyncStorage.getItem('TOKEN');
  if (token) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    };
  }
  return {
    'Content-Type': 'application/json',
  };
}
