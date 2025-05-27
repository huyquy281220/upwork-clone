import Cookies from "js-cookie";

// Cookie configuration interface
interface CookieConfig {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

// Default cookie options
const DEFAULT_OPTIONS: CookieConfig = {
  expires: 30, // 30 days
  path: "/",
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

// Generic cookie functions
export const setCookie = (
  key: string,
  value: string,
  options: CookieConfig = {}
) => {
  const config = { ...DEFAULT_OPTIONS, ...options };
  Cookies.set(key, value, config);
};

export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

export const deleteCookie = (key: string, options: CookieConfig = {}) => {
  const config = { path: "/", ...options };
  Cookies.remove(key, config);
};

export const deleteAllCookies = (keys: string[]) => {
  keys.forEach((cookie) => deleteCookie(cookie));
};
