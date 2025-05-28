import axios from 'axios';

const request = axios.create({
  baseURL: 'https://api.example.com',
});

export default request;