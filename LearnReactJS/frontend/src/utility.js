export function PushToURL(props, url) {
  return props.history.push(url);
}

export function readLocalStorage(key) {
  let data = localStorage.getItem(key);
  return JSON.parse(data);
}

export function setItemLocalStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalStorageItem(key) {
  return localStorage.removeItem(key);
}

export function navigateTo(props, url) {
  return props.history.push(url);
}
