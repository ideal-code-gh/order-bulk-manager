const { post } = require('../../lib/backend')
const chalk = require('chalk')
const fs = require('fs')
const envPath = '.env'

require('dotenv').config({quiet: true})

exports.main = async function main() {
  const response = await post(process.env, '/api/register', {
    runtime: process.env.AIO_runtime_namespace
  })

  const envContent = fs.readFileSync(envPath, 'utf8')
  fs.writeFileSync(envPath, envContent.replace(
    /BACKEND_ACCESS_TOKEN=.*/,
    `BACKEND_ACCESS_TOKEN=${response.data.token}`
  ))

  console.log(
    chalk.green('API token has been successfully generated and saved.')
  )
}
