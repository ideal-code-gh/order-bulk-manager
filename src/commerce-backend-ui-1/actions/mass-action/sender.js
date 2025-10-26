const { post } = require('/lib/backend')

async function sendData(params) {
  await post(params, '/api/order-queue', {
    action: params.massActionId,
    orderIds: params.selectedIds
  })
}

module.exports = {
  sendData
}
