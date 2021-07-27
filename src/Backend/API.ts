import axios from 'axios';

export default class API {
  public static BASE_URL = 'http://localhost:8080/api';
  private static HEADERS = {   
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  };

  static async get<T>(url: string): Promise<T> {
    try {
      const requestResult = await axios.get(`${this.BASE_URL}${url}`);

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
      const requestResult = await axios.post(`${this.BASE_URL}${url}`, body, { headers: API.HEADERS });

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
      const requestResult = await axios.put(`${this.BASE_URL}${url}`, body);

      if(requestResult.status < 200 || requestResult.status >= 400) {
        throw new Error(`Error with request to ${url} with error code ${requestResult.status}`);
      }

    } catch(error) {
      throw new Error(error);
    }
  }

  static async delete(url: string): Promise<void> {
    try {
      const requestResult = await axios.delete(`${this.BASE_URL}${url}`);

      if(requestResult.status < 200 || requestResult.status >= 400) {
        throw new Error(`Error with request to ${url} with error code ${requestResult.status}`);
      }

    } catch(error) {
      throw new Error(error);
    }
  }
}