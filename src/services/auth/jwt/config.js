import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `http://localhost:3500/api` //YOUR_API_URL HERE
  //baseURL: `https://gps-api-app.herokuapp.com/api`, //YOUR_API_URL HERE
});

export const privateAxiosInstance = axios.create({
  baseURL: `http://localhost:3500/api`,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});
