import axios from 'axios';
import { Session } from '../Redux/store';
import store from '../Redux/store';

export default class API {
  public static BASE_URL = 'http://localhost:8080/api';
  private static HEADERS = {   
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  };

  private static getToken(): string | null {
    const session = store.store.getState().sessionReducer as Session;
    console.log("api session", session);
    if(session) {
      return session.accessToken;
    }
    return null;
  }

  static async get<T>(url: string): Promise<T> {
    try {
      const requestResult = await axios.get(`${this.BASE_URL}${url}`, { headers: { ...API.HEADERS, AccessToken: API.getToken() } });

      if(requestResult.status < 200 || requestResult.status >= 400) {
        throw new Error(`Error with request to ${url} with error code ${requestResult.status}`);
      }

      return requestResult.data;
    } catch(error) {
      throw new Error(error);
    }
  }

  static async post<T, ReturnType = void>(url: string, body: T): Promise<ReturnType> {
    try {
      const requestResult = await axios.post(`${this.BASE_URL}${url}`, body, { headers: { ...API.HEADERS, AccessToken: API.getToken() } });

      if(requestResult.status < 200 || requestResult.status >= 400) {
        throw new Error(`Error with request to ${url} with error code ${requestResult.status}`);
      }

      return requestResult.data;
    } catch(error) {
      throw new Error(error);
    }
  }

  static async put<T>(url: string, body: T): Promise<void> {
    try {
      const requestResult = await axios.put(`${this.BASE_URL}${url}`, body, { headers: { ...API.HEADERS, AccessToken: API.getToken() } });

      if(requestResult.status < 200 || requestResult.status >= 400) {
        throw new Error(`Error with request to ${url} with error code ${requestResult.status}`);
      }

    } catch(error) {
      throw new Error(error);
    }
  }

  static async delete(url: string): Promise<void> {
    try {
      const requestResult = await axios.delete(`${this.BASE_URL}${url}`, { headers: { ...API.HEADERS, AccessToken: API.getToken() } });

      if(requestResult.status < 200 || requestResult.status >= 400) {
        throw new Error(`Error with request to ${url} with error code ${requestResult.status}`);
      }

    } catch(error) {
      throw new Error(error);
    }
  }
}