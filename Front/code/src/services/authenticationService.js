import config from './const';

const login = async (userCredentials) =>
  fetch(`${config.API_BASE_URI}${config.API_BASE_PORT}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userCredentials)
  }).then((res) => res.json());

export default { login };
