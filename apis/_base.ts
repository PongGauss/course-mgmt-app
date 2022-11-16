import axios from "axios";
import {
  getAuthenTokenFromStorage,
} from "../apis/auth";

const server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

server.interceptors.request.use((config) => {
  if (config.url !== "/auth/signin" && config.url !== "/auth/signup") {
    let token: string | null;
    token = getAuthenTokenFromStorage();
    config.headers!["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const fetcher = (url: string): any =>
  server.get(url).then((res: any) => res.data);
export const patcher = (url: string, params: any): any =>
  server.patch(url, params).then((res: any) => res);
export const poster = (url: string, params: any): any =>
  server.post(url, params).then((res: any) => res);
export const deletor = (url: string): any =>
  server.delete(url).then((res: any) => res);
