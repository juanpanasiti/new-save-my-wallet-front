import axios, { AxiosResponse } from 'axios'

const smwApiClient = axios.create({
    baseURL: `${import.meta.env.VITE_SMW_API}/api/v2`
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
      const newToken = response.data?.token
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