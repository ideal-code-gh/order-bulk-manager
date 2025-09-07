const { validateData } = require('./validator')
const { sendData } = require('./sender')
const { HTTP_OK, HTTP_INTERNAL_ERROR } = require('../../constants')

async function main(params) {
  try {
    validateData(params)
    sendData(params)
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

exports.main = main
