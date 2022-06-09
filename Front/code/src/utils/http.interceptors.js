import { httpInstance } from './http.instance';

const configureInitialInterceptors = (appStore) => {
  httpInstance.interceptors.request.use((conf) => {
    const state = appStore.getState();
    console.log(state);
    const updatedConf = conf;

    const { token } = state.auth;
    if (token) {
      updatedConf.headers.Authorization = `JWT ${token}`;
    }

    return updatedConf;
  });
};

export { configureInitialInterceptors };
