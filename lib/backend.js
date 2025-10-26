const axios = require('axios')

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

exports.get = (params, url, data = {}) =>
  query(params, { method: 'get', url: url, data: data })

exports.post = (params, url, data = {}) =>
  query(params, { method: 'post', url: url, data: data })
