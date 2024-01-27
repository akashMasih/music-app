import axios from 'axios';
import { USER } from '@/hooks/useAuth'
import { isEmpty } from '@/utility/Utils';
// const token = window ? localStorage.getItem("token") ?  : "" : ""
const protectedInterceptor = axios.create({
  baseURL: `http://13.200.180.109:4000/api`,
});

// Request interceptor
protectedInterceptor.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    let accessToken = localStorage.getItem(USER)

    if (isEmpty(accessToken)) {
      return false
    }
    accessToken = JSON.parse(accessToken)
    // If token is present add it to request's Authorization Header
    if (accessToken) {
      if (config.headers) config.headers.authorization = accessToken?.token;
    }
    else {
      // localStorage.clear()
      // window.location.reload()
    }
    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);
// End of Request interceptor



// Response interceptor
protectedInterceptor.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  (error) => {
    // Handle response errors here

    if (error?.response?.status === 403) {
      localStorage.removeItem(USER)
      window.location.reload()
    }
    else {
      return Promise.reject(error);
    }
  }
);
// End of Response interceptor


const publicInterceptor = axios.create({
  // baseURL: `${process.env.NEXT_PUBLIC_API_SERVER}/api`,
  baseURL: `http://13.200.180.109:4000/api`,

});



export { protectedInterceptor as privateAxios, publicInterceptor as publicAxios };

