import cookies from "react-cookies";

export const AUTH_COOKIE_NAME = "dmcc";

export const isAuthenticated = (): boolean => {
  return !!cookies.load(AUTH_COOKIE_NAME);
};

export const removeAuthCookie = (): void => {
  cookies.remove(AUTH_COOKIE_NAME);
};
