import {
  AdobeCommerceHttpClient,
  resolveCommerceHttpClientParams,
} from '@adobe/aio-commerce-lib-api'

const errorHandler = async (error) => {
  if (error.response) {
    error.message = (await error.response.json()).message
  }
  return error
}

const restApi = {
  orders: 'orders',
  invoiceOrder: 'order/{order_id}/invoice',
  shipOrder: 'order/{order_id}/ship',
}

const defaultSearchParams = {
  searchCriteria: '',
}

export default {
  getClient: (params, storeCode) => {
    const clientParams = resolveCommerceHttpClientParams(params)
    clientParams.config.storeViewCode = storeCode

    return new AdobeCommerceHttpClient(clientParams).extend({
      hooks: {
        beforeError: [
          errorHandler,
        ],
      },
    })
  },

  getOrders: async (client, params) => {
    return client.get(restApi.orders, {
      searchParams: params || defaultSearchParams,
    }).json()
  },

  invoiceOrder: async (client, params) => {
    const restUrl = restApi.invoiceOrder
      .replace('{order_id}', params.order_id)

    return client.post(restUrl, {
      json: {
        capture: true,
      },
    }).json()
  },

  shipOrder: async (client, params) => {
    const restUrl = restApi.shipOrder
      .replace('{order_id}', params.order_id)

    return client.post(restUrl).json()
  },
}
