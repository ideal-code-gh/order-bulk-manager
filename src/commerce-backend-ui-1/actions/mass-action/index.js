import openwhisk from 'openwhisk'
import wrapper from '/lib/action-wrapper'

const pageSize = 100

export const main = (params) => wrapper(async () => {
  const wskClient = openwhisk()
  const operation = params.massActionId.split('::')[1]
  const orderIds = params.selectedIds || []

  let invokes = []
  if (orderIds) {
    for (let i = 0; i < orderIds.length; i += pageSize) {
      invokes.push({
        'order_ids': orderIds.slice(i, i + pageSize),
      })
    }
  } else {
    for (let i = 0; i < 100; i++) {
      invokes.push({
        'current_page': i + 1,
        'page_size': pageSize,
      })
    }
  }

  invokes.map(async (invoke) => {
    invoke['operation'] = operation

    await wskClient.actions.invoke({
      name: 'commerce/publisher',
      params: invoke,
    })
  })
})
