import { IStorage, Listener } from './storage.type';

class TokenStorage implements IStorage {
  private listeners: Listener[] = [];
  private tokenKey = 'token';

  constructor() {
    window.addEventListener('storage', this.handleStorageEvent.bind(this));
  }

  public get(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  public set(value: string): void {
    localStorage.setItem(this.tokenKey, value);
  }

  public remove(): void {
    localStorage.removeItem(this.tokenKey);
  }

  public subscribe(listener: Listener): void {
    this.listeners.push(listener);
  }

  public unsubscribe(listener: Listener): void {
    this.listeners = this.listeners.filter((item) => item !== listener);
  }

  public handleStorageEvent(event: StorageEvent): void {
    if (event.storageArea === localStorage && event.key === this.tokenKey) {
      this.notifyListeners(event.newValue || '');
    }
  }

  public notifyListeners(newValue: string): void {
    this.listeners.forEach((listener) => listener(newValue));
  }
}

export const tokenStorage = new TokenStorage();
