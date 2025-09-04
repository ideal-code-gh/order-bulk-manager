const { registrations } = require('../registration/index')

async function validateData(params) {
  const actions = registrations.body.registration.order.massActions
    .map(action => action.actionId)

  if (!actions.includes(params.massActionId)) {
    throw new Error('Not supported mass action')
  }
}

module.exports = {
  validateData
}
