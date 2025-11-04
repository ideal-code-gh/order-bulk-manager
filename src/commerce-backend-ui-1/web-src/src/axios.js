import axios from 'axios'

axios.defaults.baseURL = process.env.BACKEND_BASE_URL
axios.defaults.headers.common = {
  'Authorization': `Bearer ${process.env.BACKEND_ACCESS_TOKEN}`
}

export default axios
