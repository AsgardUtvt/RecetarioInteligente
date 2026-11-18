import axios from "axios";

export const apiAsgardJessica = axios.create({
    baseURL: 'http://192.168.100.138:3000',
});
apiAsgardJessica.interceptors.request.use((config) => {
  console.log('PETICIÓN REAL A:', (config.baseURL ?? '') + (config.url ?? ''));
  return config;
});
