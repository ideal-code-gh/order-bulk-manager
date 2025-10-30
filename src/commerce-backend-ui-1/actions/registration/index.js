const { HTTP_OK } = require('/lib/constants')

exports.main = async function main() {
  const extensionId = 'order-bulk-manager'

  return {
    statusCode: HTTP_OK,
    body: {
      registration: {
        order: {
          massActions: [
            {
              actionId: `${extensionId}::invoice`,
              label: 'Invoice',
              confirm: {
                title: 'Invoice',
                message: 'Are you sure you want to proceed with invoicing on selected orders?'
              },
              displayIframe: false,
              path: 'api/v1/web/admin-ui-sdk/mass-action'
            },
            {
              actionId: `${extensionId}::ship`,
              label: 'Ship',
              confirm: {
                title: 'Ship',
                message: 'Are you sure you want to proceed with shipping on selected orders?'
              },
              displayIframe: false,
              path: 'api/v1/web/admin-ui-sdk/mass-action'
            }
          ]
        },
        bannerNotification: {
          massActions: {
            order: [
              {
                actionId: `${extensionId}::invoice`,
                successMessage: 'The orders have been queued for invoicing.'
              },
              {
                actionId: `${extensionId}::ship`,
                successMessage: 'The orders have been queued for shipping.'
              }
            ]
          }
        }
      }
    }
  }
}
