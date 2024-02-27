import axios, { AxiosResponse } from 'axios'

const smwApiClient = axios.create({
    baseURL: 'https://api.smw.juanpanasiti.com.ar/api/v1'
})

// Request Interceptor
smwApiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Response Interceptor
  smwApiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      const newToken = response.headers['renewed-token'];
      if (newToken) {
        localStorage.setItem('token', newToken);
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default smwApiClient;