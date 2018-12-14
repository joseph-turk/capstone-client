import axios from 'axios'

let instance = axios.create({
  baseURL: process.env.apiUrl || 'https://api.capstone-events.website'
})

export default instance
