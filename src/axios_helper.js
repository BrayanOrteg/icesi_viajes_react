import axios from 'axios';

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
};

export const setUser = (user) => {
 
  window.localStorage.setItem("user", user);
};

export const getUser = () => {
  return window.localStorage.getItem('user');
};

export const setUserId = (userId) => {

  window.localStorage.setItem("user_id", userId);

};

export const getUserId = () => {
  return window.localStorage.getItem('user_id');
};

export const setUserRole = (role) => {
 
  window.localStorage.setItem("role", role);
};

export const getUserRole = () => {
  return window.localStorage.getItem('role');
};

axios.defaults.baseURL = 'http://localhost:9091';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method, url, data) => {

    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data});
};