import config from './const';
import i18n from '../i18n';

const login = async (userCredentials) =>
  fetch(`${config.API_BASE_URI}${config.API_BASE_PORT}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': i18n.resolvedLanguage
    },
    body: JSON.stringify(userCredentials)
  }).then((res) => res.json());

const register = async (user) =>
  fetch(`${config.API_BASE_URI}${config.API_BASE_PORT}/api/v1/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': i18n.resolvedLanguage
    },
    body: JSON.stringify(user)
  }).then((res) => res.json());

export default { login, register };
