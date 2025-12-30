import commerce from '/lib/commerce'
import wrapper from '/lib/action-wrapper'

export const main = (params) => wrapper(async () => {
  const client = commerce.getClient(params)

  switch (params.operation) {
    case 'invoice':
      await commerce.invoiceOrder(client, {
        order_id: params.order_id,
      })
      break

    case 'ship':
      await commerce.shipOrder(client, {
        order_id: params.order_id,
      })
      break

    default:
      throw new Error('Invalid operation')
  }
})
