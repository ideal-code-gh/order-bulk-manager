import commerce from '/lib/commerce'
import wrapper from '/lib/action-wrapper'

export const main = (params) => wrapper(async () => {
  let request = {
    'searchCriteria[currentPage]': params.current_page || 1,
    'searchCriteria[pageSize]': params.page_size || 1000,
  }
  if (params.order_ids) {
    request['searchCriteria[filterGroups][0][filters][0][field]'] = 'entity_id'
    request['searchCriteria[filterGroups][0][filters][0][value]'] = params.order_ids
    request['searchCriteria[filterGroups][0][filters][0][condition_type]'] = 'in'
  }

  return await commerce.fetchOrders(params, request)
})
