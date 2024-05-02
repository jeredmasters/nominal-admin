import jsonServerProvider from "ra-data-json-server";
import simpleRestProvider from 'ra-data-json-server';
import { fetchUtils } from "react-admin";
import jwt from 'jwt-encode';
import { API_BASE } from "../config";
import axios from "axios";

export interface RequestOptions {
  method?: string;
  headers?: any;
  body?: any;
}

export interface Response {
  status: number,
  headers: Headers | any,
  body: string,
  json: any
}

const getData = (body?: FormData | any) => {
  if (body && body instanceof FormData) {
    var object: any = {};
    body.forEach(function (value, key) {
      object[key] = value;
    });
    return object
  }
  return body
}

export const httpClient = (url: string, options: RequestOptions = {}): Promise<Response> => {
  if (!options.headers) {
    options.headers = {};
  }
  if (!url.startsWith('http')) {
    url = API_BASE + url;
  }

  options.headers['Accept'] = 'application/json';
  options.headers['Content-Type'] = 'application/json';

  return axios({
    url,
    data: getData(options.body),
    ...options
  }).then((response): Response => ({
    body: response.data,
    json: response.data,
    status: response.status,
    headers: response.headers
  }));// fetchUtils.fetchJson(url, options);
}

export const httpClientAuth = (url: string, options: RequestOptions = {}): Promise<Response> => {

  if (!options.headers) {
    options.headers = {};
  }
  if (!url.startsWith('/auth')) {
    url = "/auth" + url;
  }

  options.headers['Accept'] = 'application/json';

  const admin_public_key = localStorage.getItem('admin_public_key');
  const admin_secret_key = localStorage.getItem('admin_secret_key');

  if (admin_public_key && admin_secret_key) {
    const header = {
      typ: 'JWT',
      alg: 'HS512'
    };
    var token = jwt({ public_key: admin_public_key }, admin_secret_key);
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  return httpClient(url, options)
};
export const dataProvider = simpleRestProvider('', httpClientAuth);


// export const dataProvider = jsonServerProvider(
//   'http://localhost:4001'
// );
