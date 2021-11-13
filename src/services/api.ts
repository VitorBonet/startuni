import axios, { AxiosError } from 'axios';
import { request } from 'http';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

let isRefreshing = false;
let failedRequestsQueue = [];

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);
  const tokenCookie = cookies['nextauth.token'];
  let headers = {};
  if (tokenCookie) {
    headers = {
      Authorization: `Baerer ${tokenCookie}`
    }
  }

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers
  });
  
  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        cookies = parseCookies(ctx);

        const { 'nextauth.refreshToken': refreshToken } = cookies;
        const originalConfi = error.config;

        if (!isRefreshing) {
          api.post('sessions/refreshToken', {
            refreshToken,
          }).then(response => {
            const { token } = response.data;
    
            setCookie(ctx, 'nextauth.token', token, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/'
            });
      
            setCookie(ctx, 'nextauth.refreshToken', response.data.refreshToken, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/'
            });
    
            api.defaults.headers['Authorization'] = `Baerer ${token}`;

            failedRequestsQueue.forEach(request => request.onSuccess(token));
            failedRequestsQueue = [];
          }).catch(err => {
            failedRequestsQueue.forEach(request => request.onFailure(err));
            failedRequestsQueue = [];

            if(process.browser){
              signOut();
            }
          }).finally(() => {
            isRefreshing = false;
          });

          isRefreshing = true;
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfi.headers['Authorization'] = `Baerer ${token}`;

              resolve(api(originalConfi))
            },
            onFailure: (err: AxiosError) => {
              reject(err);
            }
          })
        })
        
      } else {
        if(process.browser){
          signOut();
        } else {
          console.log(error.response);
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(error);
    } else {
      return Promise.reject(error.response);
    }
  })

  return api;
}
