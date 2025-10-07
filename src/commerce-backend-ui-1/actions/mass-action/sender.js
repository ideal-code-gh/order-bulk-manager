async function sendData(params) {
  const response = await fetch(`${params.BACKOFFICE_BASE_URL}api/action`, {
    method: 'POST',
    body: JSON.stringify({
      action: params.massActionId,
      orderIds: params.selectedIds
    })
  })

  if (!response.ok) {
    throw new Error(response.json().message)
  }
}

module.exports = {
  sendData
}
