import { createContext, useReducer, ReactNode, useContext } from "react";
import { apiAsgardJessica } from "../api/apiAsgardJessica";

// 1. Define la interfaz exacta de lo que envías desde CrearCuentaScreen
export interface RegisterData {
  email: string;
  nombre: string;
  paterno: string;
  materno: string;
  password: string;
  foto: string | null;
}

export interface User {
  id: number;
  email: string;
  nombre: string;
  // agrega otros campos que devuelva tu backend
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | undefined;
  token: string | undefined;
  isLoading: boolean;
}

export const AuthInitialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
  token: undefined,
  isLoading: false,
};

type Actions = 
  | { type: 'signIn'; payload: { user: User; token: string } }
  | { type: 'logout' }
  | { type: 'setLoading'; payload: boolean };

export const authReducer = (state: AuthState, action: Actions): AuthState => {
  switch (action.type) {
    case 'signIn':
      return { ...state, isLoggedIn: true, user: action.payload.user, token: action.payload.token, isLoading: false };
    case 'logout':
      return { ...state, isLoggedIn: false, user: undefined, token: undefined, isLoading: false };
    case 'setLoading':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export interface AuthContextProps {
  authState: AuthState;
  register: (data: RegisterData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, dispatch] = useReducer(authReducer, AuthInitialState);

  // FUNCIÓN DE REGISTRO CORREGIDA
  const register = async (data: RegisterData) => {
    dispatch({ type: 'setLoading', payload: true });
    try {
      // ¡IMPORTANTE! Reemplaza TU_IP_DEBIAN con la IP real de tu red (ej: 192.168.1.50)
      // NO uses localhost ni 127.0.0.1 porque el celular no lo alcanzará.
        const response = await apiAsgardJessica.post("/users", data);
      
      // Asumimos que tu backend devuelve el usuario creado y un token
      dispatch({ 
        type: 'signIn', 
        payload: { 
          user: response.data, 
          token: response.data.token || 'temp-token' 
        } 
      });
    } catch (error: any) {
      console.error("Error en registro:", error.response?.data || error.message);
      throw error; // Esto permite que el catch de CrearCuentaScreen lo capture
    } finally {
      dispatch({ type: 'setLoading', payload: false });
    }
  };

  const login = async (email: string, password: string) => {
    dispatch({ type: 'setLoading', payload: true });
    try {
        const response = await apiAsgardJessica.post('/users/login', {email, password});
      dispatch({ 
        type: 'signIn', 
        payload: { user: response.data, token: response.data.token || 'temp-token' } 
      });
    } catch (error: any) {
      console.error("Error en login:", error.response?.data || error.message);
      throw error;
    } finally {
      dispatch({ type: 'setLoading', payload: false });
    }
  };

  const logout = () => dispatch({ type: 'logout' });

  return (
    <AuthContext.Provider value={{ authState, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
