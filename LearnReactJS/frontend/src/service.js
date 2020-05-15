import axios from "axios";

export function GetAllChannels() {
  return axios.get("http://localhost:4000/api/Channels/GetAll");
}

export function SaveChannel(obj) {
  return axios.post("http://localhost:4000/api/Channels/Save", obj);
}

export function GetChannelMessages(channelId) {
  return axios.get(`http://localhost:4000/api/${channelId}/Messages/GetAll`);
}

export function SendMessageToChannel (channelId, obj) {
    return axios.post(`http://localhost:4000/api/${channelId}/Messages/Save`, obj)
}