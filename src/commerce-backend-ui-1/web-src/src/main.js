import { register } from '@adobe/uix-guest'

const extensionId = 'order-bulk-manager'
const frontBaseURL = process.env.FRONTEND_BASE_URL

register({
  id: extensionId
}).then(async () => {
  const {
    default: App
  } = await import(`${frontBaseURL}/${extensionId}.js`)

  App({
    backend: {
      baseURL: process.env.BACKEND_BASE_URL,
      accessToken: process.env.BACKEND_ACCESS_TOKEN
    }
  })
})
