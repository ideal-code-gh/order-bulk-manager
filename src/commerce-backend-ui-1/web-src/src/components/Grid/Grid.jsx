import axios from '../../axios'

import {
  Cell,
  Column,
  Row,
  TableView,
  TableBody,
  TableHeader,
  useAsyncList
} from '@adobe/react-spectrum'

export default () => {
  const columns = [
    {'name': 'Order ID', 'key': 'ext_entity_id'},
    {'name': 'Increment ID', 'key': 'ext_increment_id'},
    {'name': 'Status', 'key': 'status'},
    {'name': 'Operation', 'key': 'operation'},
    {'name': 'Created At', 'key': 'created_at'}
  ]

  const actions = useAsyncList({
    async load() {
      const res = await axios.get('/api/order-actions')
      return {
        items: res.data.data
      }
    }
  })

  return (
    <TableView selectionMode="multiple" density="spacious">
      <TableHeader columns={columns}>
        {(column) => (
          <Column allowsSorting>{column.name}</Column>
        )}
      </TableHeader>
      <TableBody items={actions.items}>
        {(item) => (
          <Row key={item.id}>
            {(key) => <Cell>{item[key]}</Cell>}
          </Row>
        )}
      </TableBody>
    </TableView>
  )
}
