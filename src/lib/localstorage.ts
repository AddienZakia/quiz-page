export function setLocalstorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('localStorage set error:', err);
  }
}

export function getLocalstorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;

    return JSON.parse(item) as T;
  } catch (err) {
    console.error('localStorage get error:', err);
    return fallback;
  }
}

export function removeLocalstorage(key: string) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}
