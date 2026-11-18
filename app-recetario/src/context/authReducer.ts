import { DataUserResponse } from "../interfaces/apiPrivada"; // Ajusta la ruta

export type User = Omit<DataUserResponse, 'password'>; // No guardamos password en el estado

export interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    token: string | null;
    isLoading: boolean;
}

export const AuthInitialState: AuthState = {
    isLoggedIn: false,
    user: null,
    token: null,
    isLoading: false,
};

type Actions =
    | { type: 'signIn'; payload: { user: User; token: string } }
    | { type: 'signUp'; payload: { user: User; token: string } }
    | { type: 'logout' }
    | { type: 'updateUser'; payload: Partial<User> }
    | { type: 'setLoading'; payload: boolean }
    | { type: 'updateUser'; payload: User };

export const authReducer = (state: AuthState, action: Actions): AuthState => {
    switch (action.type) {
        case 'setLoading':
            return { ...state, isLoading: action.payload };
        case 'signIn':
        case 'signUp':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
                token: action.payload.token,
                isLoading: false,
            };
        case 'logout':
            return { ...AuthInitialState, isLoading: false };
        case 'updateUser':
            return {
                ...state,
                user: state.user ? { ...state.user, ...action.payload } : null,
            };
        case 'updateUser':
            return { ...state, user: { ...state.user, ...action.payload } as User };

        default:
            return state;
    }
};
