import axios from 'axios';

const localStorageKey = {
  token: '__app_token',
};

async function dataProvider(url, { body, ...restConfig } = {}) {
  let config = { method: 'GET' };
  try {
    if (body) {
      config = { method: 'POST', body };
    }

    config = { ...config, ...restConfig };

    const response = await axios({ url, ...config });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    return Promise.reject(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export { dataProvider, localStorageKey };
