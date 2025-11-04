import React from 'react'
import { register } from '@adobe/uix-guest'
import { createRoot } from 'react-dom/client'
import App from './components/App'

register({
  id: process.env.AIO_runtime_namespace
}).then(() => {
  createRoot(document.getElementById('root'))
    .render(<App />)
})
