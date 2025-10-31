const { fetchOrders } = require('/lib/commerce')
const { HTTP_OK, HTTP_INTERNAL_ERROR } = require('/lib/constants')

exports.main = async function main(params) {
  let orders = {}

  let request = {
    'searchCriteria[currentPage]': params.current_page || 1,
    'searchCriteria[pageSize]': params.page_size || 1000
  }
  if (params.order_ids) {
    request['searchCriteria[filterGroups][0][filters][0][field]'] = 'entity_id'
    request['searchCriteria[filterGroups][0][filters][0][value]'] = params.order_ids
    request['searchCriteria[filterGroups][0][filters][0][condition_type]'] = 'in'
  }

  try {
    orders = await fetchOrders(params, request)
  } catch (err) {
    return {
      statusCode: HTTP_INTERNAL_ERROR,
      body: {
        error: err.message
      }
    }
  }

  return {
    statusCode: HTTP_OK,
    body: orders
  }
}
