import { httpInstance } from './http.instance';

const getRequest = async (url, params) => {
  try {
    return await httpInstance.get(url, { params });
  } catch (e) {
    throw e.response?.data;
  }
};

// const getFileRequest = async (url, fileMIME, params) => {
//   try {
//     return await httpInstance.get(url, {
//       responseType: 'arraybuffer',
//       headers: {
//         Accept: fileMIME,
//       },
//       params,
//     });
//   } catch (e) {
//     throw e.response?.data;
//   }
// };

const postRequest = async (url, data) => {
  try {
    return await httpInstance.post(url, data);
  } catch (e) {
    throw e.response?.data;
  }
};

const putRequest = async (url, data, params) => {
  try {
    return await httpInstance.put(url, data, { params });
  } catch (e) {
    throw e.response?.data;
  }
};

const deleteRequest = async (url, data, params) => {
  try {
    return await httpInstance({ method: 'DELETE', url, data, params });
  } catch (e) {
    throw e.response?.data;
  }
};

export { getRequest, postRequest, putRequest, deleteRequest };
