import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const httpInstance = axios.create({
  baseURL: BASE_URL,
  responseType: 'json'
});

export { httpInstance };
