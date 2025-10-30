const axios = require('axios')

const methods = {
  get: 'GET',
  post: 'POST',
}

async function query (params, opts) {
  const token = params.BACKEND_ACCESS_TOKEN
  if (token) {
    opts.headers = opts.headers || {}
    opts.headers.Authorization = `Bearer ${token}`
  }

  try {
    return await axios({
      baseURL: params.BACKEND_BASE_URL,
      ...opts
    })
  } catch (err) {
    throw new Error(
      err.response ?
        err.response.data.message :
        err.message
    )
  }
}

exports.tenantRegister = (params, data = {}) =>
  query(params, {
    method: methods.post,
    url: '/api/tenant/register',
    data: data
  })

exports.publishToQueue = (params, data = {}) =>
  query(params, {
    method: methods.post,
    url: '/api/order-actions/publish',
    data: data
  })
