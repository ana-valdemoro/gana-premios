import config from './const';

const saveLopd = async (lopd, token) =>
  fetch(`${config.API_BASE_URI}${config.API_BASE_PORT}/api/v1/auth/lopd`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`
    },
    body: JSON.stringify(lopd)
  }).then((res) => res.json());

const downloadLopd = async (token) => {
  const response = await fetch(`${config.API_BASE_URI}${config.API_BASE_PORT}/api/v1/auth/lopd`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`
    }
  });
  const fileNameWithQuotes = response.headers.get('content-disposition').split('filename=')[1];
  console.log(fileNameWithQuotes);
  const filename = fileNameWithQuotes.substring(1, fileNameWithQuotes.length - 1);
  console.log(filename);
  const blob = await response.blob();
  return { blob, filename };
};

const updateProfile = async (dataToUpdate, token) => {
  const response = await fetch(
    `${config.API_BASE_URI}${config.API_BASE_PORT}/api/v1/auth/profile`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify(dataToUpdate)
    }
  );
  return response.json();
};

export default { saveLopd, downloadLopd, updateProfile };
