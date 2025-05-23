/**
 * Get a cookie value on the client side
 */
export function getCookie(key: string): string | undefined {
  // Check if window is defined (client-side)
  if (typeof window === "undefined") {
    return undefined;
  }

  const cookies = document.cookie.split(";");
  const cookie = cookies.find((c) => c.trim().startsWith(`${key}=`));

  if (!cookie) {
    return undefined;
  }

  return cookie.split("=")[1];
}

interface CookieOptions {
  days?: number;
  path?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

/**
 * Set a cookie value on the client side
 */
export function setCookie(
  key: string,
  value: string,
  options: CookieOptions = {}
) {
  // Check if window is defined (client-side)
  if (typeof window !== "undefined") {
    const { days = 30, path = "/", secure = false, sameSite = "lax" } = options;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();

    let cookieString = `${key}=${value}; expires=${expires}; path=${path}`;

    if (secure) cookieString += "; secure";
    if (sameSite) cookieString += `; samesite=${sameSite}`;

    document.cookie = cookieString;
  }
}

/**
 * Delete a cookie on the client side
 */
export function deleteCookie(key: string) {
  if (typeof window !== "undefined") {
    document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  }
}
