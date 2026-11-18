import axios from "axios";
import {User} from "../context/AuthContext";


export const apiAsgardJessica = axios.create({
    baseURL: 'http://192.168.100.138:3000',
});
apiAsgardJessica.interceptors.request.use((config) => {
  console.log('PETICIÓN REAL A:', (config.baseURL ?? '') + (config.url ?? ''));
  return config;
});

const updateUser = async (data: Partial<User> & { foto?: string | null }) => {
  if (!authState.user) return;
  const res = await apiAsgardJessica.patch(`/users/${authState.user.id_user}`, data);
  dispatch({ type: 'updateUser', payload: res.data }); // actualiza el estado global
};
