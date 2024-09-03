import { TOKEN } from "../../utils/localStorageUtils";


export interface IAuthState {
  token: IToken | null;
  mobile: string;
}

export interface IToken {
  token: string;
  expiry: number;
}

const getPersistedToken = localStorage.getItem(TOKEN);

const token = getPersistedToken ? JSON.parse(getPersistedToken) : null;

export const AuthState: IAuthState = {
  token: token,
  mobile: "",
};
