import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  /**
   * Saves a value to local storage.
   * @param key The key under which the value is stored.
   * @param value The value to store (can be any object or array).
   */
  setItem(key: string, value: any): void {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  /**
   * Retrieves a value from local storage.
   * @param key The key under which the value is stored.
   * @returns The parsed value or null if the key doesn't exist.
   */
  getItem<T>(key: string): T | null {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) as T : null;
  }

  /**
   * Removes a value from local storage.
   * @param key The key of the item to remove.
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clears all items from local storage.
   */
  clear(): void {
    localStorage.clear();
  }
}