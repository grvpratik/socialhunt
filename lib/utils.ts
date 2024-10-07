import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// Utility functions
const LOCAL_STORAGE_KEYS = {
  TOKEN: "app_token",
} as const;


export const storage = {
  getToken: () =>
    typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)
      : null,
  setToken: (token: string) =>
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token),
  removeToken: () => localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN),
};
