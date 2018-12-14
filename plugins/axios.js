import axios from 'axios'

let instance = axios.create({
  baseURL: process.env.apiUrl
})

export default instance
