import { createContext, useReducer, ReactNode, useContext } from "react";
import { authReducer, AuthState, AuthInitialState, User } from "./authReducer";
import { apiAsgardJessica } from "../api/apiAsgardJessica"; // Ajusta ruta
import { DataUserResponse } from "../interfaces/apiPrivada";

export interface AuthContextProps {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (data: DataUserResponse) => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, dispatch] = useReducer(authReducer, AuthInitialState);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'setLoading', payload: true });
    try {
      const response = await apiAsgardJessica.post('/users/login', { email, password });
      // Ajusta según lo que retorne tu backend: { user: {...}, token: "..." }
      dispatch({ type: 'signIn', payload: { user: response.data.user, token: response.data.token } });
    } catch (error) {
      dispatch({ type: 'setLoading', payload: false });
      throw new Error("Credenciales inválidas");
    }
  };

  const register = async (data: DataUserResponse) => {
    dispatch({ type: 'setLoading', payload: true });
    try {
      const response = await apiAsgardJessica.post('/users', data);
      dispatch({ type: 'signUp', payload: { user: response.data, token: response.data.token } });
    } catch (error) {
      dispatch({ type: 'setLoading', payload: false });
      throw error;
    }
  };

  const updateUser = (data: Partial<User>) => dispatch({ type: 'updateUser', payload: data });
  const logout = () => dispatch({ type: 'logout' });

  return (
    <AuthContext.Provider value={{ authState, login, register, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
