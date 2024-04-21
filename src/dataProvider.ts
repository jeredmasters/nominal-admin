import jsonServerProvider from "ra-data-json-server";
import simpleRestProvider from 'ra-data-json-server';
import { fetchUtils } from "react-admin";
import jwt from 'jwt-encode';


export const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  console.log("httpClient")

  options.headers = new Headers({ Accept: 'application/json' });

  const admin_public_key = localStorage.getItem('admin_public_key');
  const admin_secret_key = localStorage.getItem('admin_secret_key');

  if (admin_public_key && admin_secret_key) {
    const header = {
      typ: 'JWT',
      alg: 'HS512'
    };
    var token = jwt({ public_key: admin_public_key }, admin_secret_key);
    options.headers.set('Authorization', `Bearer ${token}`);
    console.log(url, "SET Authorization", token)
  }
  return fetchUtils.fetchJson(url, options);
};
export const dataProvider = simpleRestProvider('http://localhost:4001/auth', httpClient);


// export const dataProvider = jsonServerProvider(
//   'http://localhost:4001'
// );
