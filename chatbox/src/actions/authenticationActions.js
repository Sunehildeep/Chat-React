import axios from 'axios';
import { loginSuccess, loginFailure, registerSuccess, registerFailure } from '../reducers/authenticationReducer';
import { useSelector } from 'react-redux';

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const data = response.data;
      dispatch(loginSuccess(data));
      return data;
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw new Error('Failed to login');
    }
  };
};

export const register = (name, email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', { name, email, password });
      const data = response.data;
      dispatch(registerSuccess(data));
      return data;
    } catch (error) {
      dispatch(registerFailure(error.message));
      throw new Error('Failed to register');
    }
  };
};

export const isAuthenticated = () => {
    // Check redux
    const appStore = JSON.parse(localStorage.getItem('myAppStore'));
    if (appStore?.authentication?.user?.email) {
        return true;
    }
    return false;
};