const { methods } = require('http-constants')
const imsLib = require('@adobe/aio-lib-ims')
const axios = require('axios')

async function query (params, opts) {
  const token = params.COMMERCE_ACCESS_TOKEN || await getImsToken(params)

  opts.headers = opts.headers || {}
  opts.headers.Authorization = `Bearer ${token}`

  try {
    return (await axios({
      baseURL: params.COMMERCE_BASE_URL,
      ...opts
    })).data
  } catch (err) {
    throw new Error(
      err.response ?
        err.response.data.message :
        err.message
    )
  }
}

async function getImsToken (params) {
  const keyPrefix = 'OAUTH_'
  const contextName = 'ims_ctx'

  const context = Object.fromEntries(
    Object.entries(params)
      .filter(([key]) => key.startsWith(keyPrefix))
      .map(([key, value]) => [key.toLowerCase().slice(keyPrefix.length), value])
  )
  await imsLib.context.set(contextName, context)

  return imsLib.getToken(contextName)
}

exports.fetchOrders = async (params, data = {}) =>
  query(params, {
    method: methods.GET,
    url: '/V1/orders',
    params: data
  })

exports.invoiceOrder = async (params, data = {}) =>
  query(params, {
    method: methods.POST,
    url: `/V1/order/${data.order_id}/invoice`,
    data: {
      capture: true
    }
  })

exports.shipOrder = async (params, data = {}) =>
  query(params, {
    method: methods.POST,
    url: `/V1/order/${data.order_id}/ship`
  })
