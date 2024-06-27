// Types
import {RequestProps} from './types';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

// Config
import {API_URL} from '@/config/api';

/**
 * Default headers for the requests.
 */
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

/**
 * Asynchronously sends a request to the server.
 * @param path The endpoint path to which the request is sent.
 * @param props The configuration options for the request, including method, headers, and body.
 * @returns A promise that resolves with the server's response.
 * @template T The expected type of the response data.
 */
export async function request<T>(path: string, {
  method,
  baseUrl = null,
  body = {},
  params = null,
  headers = {}
}: RequestProps): Promise<AxiosResponse<T>['data']> {
  const url = baseUrl ?? API_URL;

  const fullUrl = `${url}${path}`;
  const config: AxiosRequestConfig = {
    method: method,
    url: fullUrl,
    headers: {
      ...DEFAULT_HEADERS,
      ...headers,
    },
    withCredentials: true,
    data: body ? JSON.stringify(body) : null,
    params: params,
    
  };

  try {
    const response = await axios<T>(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Function to send a POST request with file data to the server.
 * @param {string} path - The path of the request.
 * @param {T} formData - The form data to be sent in the request.
 * @returns {Promise<R>} - The response from the server.
 */
export async function requestWithFile<T, R>(method: RequestProps['method'], path: string, formData: T): Promise<R> {
  const {data: response}: AxiosResponse<{data: R}> = await axios({
    method,
    url: API_URL + path,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true
  });

  return response.data;
}

/**
 * Function to download a buffer from the server using Axios.
 * @param {string} path - The path of the request.
 * @param {RequestProps} props - The properties of the request including method, baseUrl, and headers.
 * @returns {Promise<ArrayBuffer>} - The response from the server as an ArrayBuffer.
 */
export async function downloadBuffer(path: string, {
  method,
  baseUrl = null,
  headers = {}
}: RequestProps): Promise<{file: ArrayBuffer; type: string;}> {
  const url = baseUrl ?? API_URL;
  const fullUrl = `${url}${path}`;

  try {
    const response = await axios({
      method: method,
      url: fullUrl,
      headers: {
        ...DEFAULT_HEADERS,
        ...headers,
      },
      responseType: 'arraybuffer',
      withCredentials: true,
    });

    const contentType = response.headers['content-type'];
    
    return {
      file: response.data,
      type: contentType,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 500) {
        throw new Error(error.response.statusText);
      }
      throw new Error(`Request failed with status code: ${error.response.status}`);
    } else {
      throw error;
    }
  }
}
