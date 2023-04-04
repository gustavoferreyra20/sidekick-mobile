import axios from 'axios';


const api = axios.create({
  baseURL: 'http://[2802:8010:9406:9100:41c6:96b7:8d04:577d]:3000/api/',
});

module.exports = api;