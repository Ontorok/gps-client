import axios from 'axios';

export const axiosInstance = axios.create({
  //baseURL: process.env.REACT_APP_BASE_URL //YOUR_API_URL HERE
  baseURL:  "http://ec2-3-83-240-253.compute-1.amazonaws.com:4000/api"
});

export const privateAxiosInstance = axios.create({
  //baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: "http://ec2-3-83-240-253.compute-1.amazonaws.com:4000/api",
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});
