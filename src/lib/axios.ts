import Axios, { AxiosRequestConfig } from "axios";

import { API_URL } from "config";
import { store } from "stores/store";
import storage from "utils/storage";

import { addNotification } from "components/Notifications";

export const axios = Axios.create({
  baseURL: API_URL,
});

// Intercept outgoing requests and include authorization token (JWT)
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = config.headers ?? {};
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
});

// Handle incoming responses and create  notifications accordingly
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    store.dispatch(
      addNotification({
        type: "error",
        title: "Error",
        message,
      })
    );

    return Promise.reject(error);
  }
);
