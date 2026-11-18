import { createContext, useReducer, ReactNode, useContext } from "react";
import { apiAsgardJessica } from "../api/apiAsgardJessica";

export interface User {
  id_user: number;
  email: string;
  nombre: string;
  paterno: string;
  materno: string;
  foto: string | null;
}

export interface RegisterData {
  email: string;
  nombre: string;
  paterno: string;
  materno: string;
  password: string;
  foto: string | null;
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
  | { type: 'setLoading'; payload: boolean }
  | { type: 'updateUser'; payload: User };

export const authReducer = (state: AuthState, action: Actions): AuthState => {
  switch (action.type) {
    case 'signIn':
      return { ...state, isLoggedIn: true, user: action.payload.user, token: action.payload.token, isLoading: false };
    case 'logout':
      return { ...state, isLoggedIn: false, user: undefined, token: undefined, isLoading: false };
    case 'setLoading':
      return { ...state, isLoading: action.payload };
    case 'updateUser':
      return { ...state, user: { ...state.user, ...action.payload } as User };
    default:
      return state;
  }
};

export interface AuthContextProps {
  authState: AuthState;
  register: (data: RegisterData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  updateUser: (data: Partial<User> & { foto?: string | null }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, dispatch] = useReducer(authReducer, AuthInitialState);

  const register = async (data: RegisterData) => {
    dispatch({ type: 'setLoading', payload: true });
    try {
      const response = await apiAsgardJessica.post("/users", data);
      dispatch({ type: 'signIn', payload: { user: response.data, token: response.data.token || 'temp-token' } });
    } catch (error: any) {
      console.error("Error en registro:", error.response?.data || error.message);
      throw error;
    } finally {
      dispatch({ type: 'setLoading', payload: false });
    }
  };

  const login = async (email: string, password: string) => {
    dispatch({ type: 'setLoading', payload: true });
    try {
      const response = await apiAsgardJessica.post("/users/login", { email, password });
      dispatch({ type: 'signIn', payload: { user: response.data, token: response.data.token || 'temp-token' } });
    } catch (error: any) {
      console.error("Error en login:", error.response?.data || error.message);
      throw error;
    } finally {
      dispatch({ type: 'setLoading', payload: false });
    }
  };

  const updateUser = async (data: Partial<User> & { foto?: string | null }) => {
    if (!authState.user) return;
    const res = await apiAsgardJessica.patch(`/users/${authState.user.id_user}`, data);
    dispatch({ type: 'updateUser', payload: res.data });
  };

  const logout = () => dispatch({ type: 'logout' });

  return (
    <AuthContext.Provider value={{ authState, register, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
