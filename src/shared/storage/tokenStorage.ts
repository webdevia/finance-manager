type TokenListener = (newValue: string) => void;

class TokenStorage {
  private listeners: TokenListener[] = [];
  private tokenKey = 'token';

  constructor() {
    window.addEventListener('storage', this.handleStorageEvent.bind(this));
  }

  public get(): string {
    const a = localStorage.getItem(this.tokenKey) || '';
    console.log(a);
    return a;
  }

  public set(value: string): void {
    localStorage.setItem(this.tokenKey, value);
    //this.notifyListeners(value);
  }

  public remove(): void {
    localStorage.removeItem(this.tokenKey);
    console.log('REMOVED TOKEN');
    // this.notifyListeners('');
  }

  public subscribe(listener: TokenListener): void {
    this.listeners.push(listener);
  }

  public unsubscribe(listener: TokenListener): void {
    this.listeners = this.listeners.filter((item) => item !== listener);
  }

  public handleStorageEvent(event: StorageEvent): void {
    if (event.storageArea === localStorage && event.key === this.tokenKey) {
      console.log(event);
      this.notifyListeners(event.newValue);
    }
  }

  public notifyListeners(newValue: string): void {
    this.listeners.forEach((listener) => listener(newValue));
  }
}

export const tokenStorage = new TokenStorage();
