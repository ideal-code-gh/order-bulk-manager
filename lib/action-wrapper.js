import { codes } from 'http-constants'

export default async (fn) => {
  let result

  try {
    result = await fn()
  } catch (err) {
    return {
      statusCode: codes.INTERNAL_SERVER_ERROR,
      body: {
        error: err.message,
      },
    }
  }

  return {
    statusCode: codes.OK,
    body: result || [],
  }
}
