import axios from 'axios';
import firebase from 'firebase';

export class BaseApiService {
    #baseUrl = '';

    constructor(newBaseUrl) {
      if (newBaseUrl != null) this.#baseUrl = newBaseUrl;
      axios.interceptors.request.use(async (request) => {
        const token = await firebase.auth()?.currentUser?.getIdToken?.() ?? '';
        request.headers.common.Authorization = `Bearer ${token}`;
        return request;
      }, (err) => Promise.reject(err));
    }

    async get(url) {
      try {
        const result = await axios.get(`${this.#baseUrl}/${url}`);
        return {
          isSuccess: true,
          value: result.data,
          errorMessage: '',
          httpCode: result.status
        };
      } catch (ex) {
        console.log(`baseApiService (${url}): `, ex.message);
        return {
          isSuccess: false,
          value: {},
          errorMessage: ex.response.data,
          httpCode: ex.response.status
        };
      }
    }

    async getWithParams(url, params) {
      try {
        const result = await axios.get(`${this.#baseUrl}/${url}`, { params });
        return {
          isSuccess: true,
          value: result.data,
          errorMessage: '',
          httpCode: result.status
        };
      } catch (ex) {
        console.log('baseApiService: ', ex.message);
        return {
          isSuccess: false,
          value: {},
          errorMessage: ex.response.data,
          httpCode: ex.response.status
        };
      }
    }

    async deleteWithParams(url, params) {
      try {
        const result = await axios.delete(`${this.#baseUrl}/${url}`, { params });
        return {
          isSuccess: true,
          value: result.data,
          errorMessage: '',
          httpCode: result.status
        };
      } catch (ex) {
        console.log('baseApiService: ', ex.message);
        return {
          isSuccess: false,
          value: {},
          errorMessage: ex.response.data,
          httpCode: ex.response.status
        };
      }
    }

    async post(url, data, manipulateHeaders = null) {
      const realUrl = `${this.#baseUrl}/${url}`;
      try {
        const result = await axios.post(realUrl, data);
        if (manipulateHeaders != null) manipulateHeaders(result.headers);

        return {
          isSuccess: true,
          value: result.data,
          errorMessage: '',
          httpCode: result.status
        };
      } catch (ex) {
        return {
          isSuccess: false,
          value: {},
          errorMessage: ex.response.data,
          httpCode: ex.response.status
        };
      }
    }

    async delete(url, manipulateHeaders = null) {
      try {
        const result = await axios.delete(`${this.#baseUrl}/${url}`);
        if (manipulateHeaders != null) manipulateHeaders(result.headers);
        return {
          isSuccess: true,
          errorMessage: '',
          httpCode: result.status
        };
      } catch (ex) {
        return {
          isSuccess: false,
          errorMessage: ex.message,
          httpCode: ex.response.status
        };
      }
    }

    async put(url, data, manipulateHeaders = null) {
      const realUrl = `${this.#baseUrl}/${url}`;
      try {
        const result = await axios.put(realUrl, data);
        if (manipulateHeaders != null) manipulateHeaders(result.headers);

        return {
          isSuccess: true,
          value: result.data,
          errorMessage: '',
          httpCode: result.status
        };
      } catch (ex) {
        return {
          isSuccess: false,
          value: {},
          errorMessage: ex.response.data,
          httpCode: ex.response.status
        };
      }
    }

    async patch(url, data = null, manipulateHeaders = null) {
      const realUrl = `${this.#baseUrl}/${url}`;
      try {
        const result = await axios.patch(realUrl, data);
        if (manipulateHeaders != null) manipulateHeaders(result.headers);
        return {
          isSuccess: true,
          value: result.data,
          errorMessage: '',
          httpCode: result.status
        };
      } catch (ex) {
        return {
          isSuccess: false,
          value: {},
          errorMessage: ex.response.data,
          httpCode: ex.response.status
        };
      }
    }
}
