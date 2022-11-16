import { SignUpReq, LoginReq, ProfileUpdateReq } from "./dtos/auth.dto";
import { fetcher, patcher, poster } from "./_base";

export const getAuthenTokenFromStorage = (): string | null => {
  const res =
    typeof window !== "undefined"
      ? window.localStorage.getItem('AUTHEN_KEY')
      : null;
  return res && res !== "" && res !== "null" && res !== null ? res : null;
};

export const setAuthenTokenToStorage = (token: string) => {
  window.localStorage.setItem(
    'AUTHEN_KEY',
    token
  );
};

export const removeAuthenTokenFromStorage = () => {
  window.localStorage.removeItem('AUTHEN_KEY');
};

export const signup = async (
  user: SignUpReq
): Promise<any> => {
  const res = await poster(`/auth/signup`, user);
  return res;
};

export const getProfile = async (
): Promise<any> => {
  const res = await fetcher(`/auth/me`);
  return res;
};

export const login = async (login: LoginReq): Promise<any> => {
  const res = await poster(`/auth/signin`, login);
  return res;
};

export const updateProfile = async (profile: ProfileUpdateReq): Promise<any> => {
  const res = await patcher(`/auth/me`, profile);
  return res;
};