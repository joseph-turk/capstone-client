import axios from 'axios'

let instance = axios.create({
  baseURL: process.env.apiUrl || 'http://68.183.136.53'
})

export default instance
