async function main() {
    const extensionId = 'order-manager-app'

    return {
        statusCode: 200,
        body: {
            registration: {
                order: {
                    massActions: [
                        {
                            actionId: `${extensionId}::mass-invoice`,
                            label: 'Invoice',
                            confirm: {
                                title: 'Invoice',
                                message: 'Are you sure you want to proceed with invoicing on selected orders?'
                            },
                            displayIframe: false,
                            path: `api/v1/web/${extensionId}/massInvoice`
                        },
                        {
                            actionId: `${extensionId}::mass-ship`,
                            label: 'Ship',
                            confirm: {
                                title: 'Ship',
                                message: 'Are you sure you want to proceed with shipping on selected orders?'
                            },
                            displayIframe: false,
                            path: `api/v1/web/${extensionId}/massShip`
                        }
                    ]
                }
            }
        }
    }
}

exports.main = main
