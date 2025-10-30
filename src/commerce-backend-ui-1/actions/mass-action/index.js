const { publishToQueue } = require('/lib/backend')
const { HTTP_OK, HTTP_INTERNAL_ERROR } = require('/lib/constants')

exports.main = async function main(params) {
  try {
    await publishToQueue(params, {
      operation: params.massActionId.split('::')[1],
      order_ids: params.selectedIds || []
    })
  } catch (err) {
    return {
      statusCode: HTTP_INTERNAL_ERROR,
      body: {
        error: err.message
      }
    }
  }

  return {
    statusCode: HTTP_OK
  }
}
