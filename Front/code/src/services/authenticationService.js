import { postRequest } from '../utils/http';
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

const activateAccount = async (token) => {
  const response = await fetch(
    `${config.API_BASE_URI}${config.API_BASE_PORT}/api/v1/auth/activate/${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    }
  );

  if (response.status === 204) {
    return Promise.resolve();
  }

  throw await response.json();
};

const unblockAccount = async (token) => {
  const response = await fetch(
    `${config.API_BASE_URI}${config.API_BASE_PORT}/api/v1/auth/unlock/${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    }
  );

  if (response.status === 204) {
    return Promise.resolve();
  }

  throw await response.json();
};

// const forgotPassword = async (email) => {
//   const response = await fetch(`${config.API_BASE_URI}${config.API_BASE_PORT}/api/v1/auth/forgot`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept-Language': i18n.resolvedLanguage
//     },
//     body: JSON.stringify(email)
//   });
//   console.log(response);
//   if (response.status === 200) {
//     return Promise.resolve(await response.json());
//   }

//   throw await response.json();
// };
export const forgotPassword = async (email) => postRequest(`/auth/forgot`, { email });

export const recoverPassword = async ({ token, password }) => {
  console.log(token);
  console.log(password);
  return postRequest(`/auth/recovery/${token}`, { password });
};

export default { login, register, activateAccount, unblockAccount };
