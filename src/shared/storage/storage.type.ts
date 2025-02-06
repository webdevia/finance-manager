export type Listener = (newValue: string) => void;

export interface IStorage {
  get(): string;
  set(value: string): void;
  remove(): void;
  subscribe(listener: Listener): void;
  unsubscribe(listener: Listener): void;
  handleStorageEvent(event: StorageEvent): void;
  notifyListeners(newValue: string): void;
}
