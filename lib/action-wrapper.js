export default async (fn) => {
  let result

  try {
    result = await fn()
  } catch (err) {
    return {
      statusCode: 500,
      body: {
        error: err.message,
      },
    }
  }

  return {
    statusCode: 200,
    body: result || [],
  }
}
