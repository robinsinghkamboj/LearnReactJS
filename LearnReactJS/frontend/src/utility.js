import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

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

export function toastMsg(msg, type) {
  return toast(msg, { type: type });
}

export function processStatus(response) {
  let { status } = response;
  if (status == 200) {
    return response["data"]["data"];
  } else {
    return response["data"]["message"] != undefined
      ? response["data"]["message"]
      : response["data"]["error"];
  }
}
