import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `http://localhost:3500`, //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json'
  }
});
