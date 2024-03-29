import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:4000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const formData = axios.create({
  baseURL: 'http://localhost:4000/api/',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});