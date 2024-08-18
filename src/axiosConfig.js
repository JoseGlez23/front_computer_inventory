import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://integradora2.onrender.com/api/computadoras',
});

export default instance;
