import axios from "axios";

const Endpoint = 'https://todo.api.devcode.gethired.id' as const;

export const request = axios.create({
  baseURL: Endpoint,
  headers: {
    'Content-type': 'application/json'
  }
})