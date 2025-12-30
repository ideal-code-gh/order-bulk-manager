import ky from 'ky'

const errorHandler = async (error) => {
  if (error.response) {
    error.message = (await error.response.json()).message
  }
  return error
}

const restApi = {
  tenantRegister: 'tenant/register',
  publishToQueue: 'order-actions/publish',
}

export default {
  getClient: (params) => {
    return ky.create({
      prefixUrl: params.BACKEND_BASE_URL,
      headers: {
        Authorization: `Bearer ${params.BACKEND_ACCESS_TOKEN}`,
      },
      hooks: {
        beforeError: [
          errorHandler,
        ],
      },
    })
  },

  tenantRegister: async (client, params) => {
    return client.post(restApi.tenantRegister, {
      json: params,
    }).json()
  },

  publishToQueue: async (client, params) => {
    return client.post(restApi.publishToQueue, {
      json: params,
    }).json()
  },
}
