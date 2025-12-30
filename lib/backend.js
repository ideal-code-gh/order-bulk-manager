import axios from 'axios'
import { methods } from 'http-constants'

async function query (params, opts) {
  const token = params.BACKEND_ACCESS_TOKEN

  opts.headers = opts.headers || {}
  opts.headers.Authorization = `Bearer ${token}`

  try {
    return (await axios({
      baseURL: params.BACKEND_BASE_URL,
      ...opts,
    })).data
  } catch (err) {
    throw new Error(
      err.response ?
        err.response.data.message :
        err.message,
    )
  }
}

export default {
  tenantRegister: async (params, data = {}) => {
    return query(params, {
      method: methods.POST,
      url: '/tenant/register',
      data: data,
    })
  },

  publishToQueue: async (params, data = {}) => {
    return query(params, {
      method: methods.POST,
      url: '/order-actions/publish',
      data: data,
    })
  },
}
