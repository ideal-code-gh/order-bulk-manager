const { wrapper } = require('/lib/action-wrapper')
const { publishToQueue } = require('/lib/backend')

exports.main = (params) => wrapper(async () => {
  await publishToQueue(params, {
    operation: params.massActionId.split('::')[1],
    order_ids: params.selectedIds || [],
  })
})
