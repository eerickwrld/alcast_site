import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get a cookie value by name
 * @param name Cookie name
 * @returns Cookie value or empty string if not found
 */
export function getCookie(name: string): string {
  if (typeof window === 'undefined') return '';
  
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='))
    ?.split('=')[1];
    
  return cookieValue || '';
}

/**
 * Set a cookie with a given name, value and expiration days
 * @param name Cookie name
 * @param value Cookie value
 * @param days Number of days until expiration
 */
export function setCookie(name: string, value: string, days: number): void {
  if (typeof window === 'undefined') return;
  
  let expires = '';
  
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  
  document.cookie = `${name}=${value}${expires}; path=/`;
}

/**
 * Delete a cookie by setting its expiration to the past
 * @param name Cookie name
 */
export function deleteCookie(name: string): void {
  if (typeof window === 'undefined') return;
  
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}
