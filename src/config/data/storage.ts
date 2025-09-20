export function loadState<T>(key: string): T | undefined {
  try {
    const serializedState = localStorage.getItem(key);

    if (!serializedState) return undefined;

    return JSON.parse(serializedState) as T;
  } catch (e) {
    return undefined;
  }
}

export function saveState<T>(key: string, state: T): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {}
}
