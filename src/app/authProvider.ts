import { AuthProvider, HttpError } from "react-admin";
import data from "../users.json";
import axios from "axios";
import { API_BASE } from "../config";
import { httpClientAuth } from "./dataProvider";


/**
 * This authProvider is only for test purposes. Don't use it in production.
 */
export const authProvider_: AuthProvider = {
  login: ({ username, password }) => {

    return axios({
      url: API_BASE + "/login",
      method: 'post',
      data: {
        email: username,
        password: password
      }
    }).then(response => {
      const { admin_user_id, public_key, secret_key } = response.data;
      localStorage.setItem("admin_user_id", admin_user_id);
      localStorage.setItem("admin_public_key", public_key);
      localStorage.setItem("admin_secret_key", secret_key);
      return true
    }).catch(e => {
      console.error(e);
      throw e
    })

  },
  logout: () => {
    console.log("LOGOUT")
    // localStorage.removeItem("admin_user_id");
    // localStorage.removeItem("admin_public_key");
    // localStorage.removeItem("admin_secret_key");

    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: async () => {
    console.log("checkAuth")
    const admin_public_key = localStorage.getItem("admin_public_key");
    const admin_secret_key = localStorage.getItem("admin_secret_key");

    if (!admin_public_key || !admin_secret_key) {
      throw new Error("Not authenticated");
    }

    const response = await httpClientAuth("/status");

    if (response.status !== 200) {
      throw new Error("Auth Expired");
    }
  },
  getPermissions: () => {
    return Promise.resolve(undefined);
  },
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;

    return Promise.resolve(user);
  },
};

export const authProvider2 = {
  login: () => {
    return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem('username');
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
  checkError: () => {
    return Promise.resolve();
  },
  getIdentity: () =>
    Promise.resolve({
      id: 'user',
      fullName: 'John Doe',
    }),
  getPermissions: () => Promise.resolve(''),
};
