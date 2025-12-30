import backend from '/lib/backend'
import wrapper from '/lib/action-wrapper'

export const main = (params) => wrapper(async () => {
  await backend.publishToQueue(
    backend.getClient(params),
    {
      operation: params.massActionId.split('::')[1],
      order_ids: params.selectedIds || [],
    },
  )
})
