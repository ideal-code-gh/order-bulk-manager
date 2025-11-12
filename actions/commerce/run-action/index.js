const { wrapper } = require('/lib/action-wrapper')
const { invoiceOrder, shipOrder } = require('/lib/commerce')

exports.main = (params) => wrapper(async () => {
  switch (params.operation) {
    case 'invoice':
      await invoiceOrder(params, {
        order_id: params.order_id
      })
      break

    case 'ship':
      await shipOrder(params, {
        order_id: params.order_id
      })
      break

    default:
      throw new Error('Invalid operation')
  }
})
