import backend from '../../lib/backend.js'
import chalk from 'chalk'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config({quiet: true})
const envPath = '.env'

const response = await backend.tenantRegister(process.env, {
  runtime: process.env.AIO_runtime_namespace,
})

const envContent = fs.readFileSync(envPath, 'utf8')
fs.writeFileSync(envPath, envContent.replace(
  /BACKEND_ACCESS_TOKEN=.*/,
  `BACKEND_ACCESS_TOKEN=${response.token}`,
))

console.log(
  chalk.green('API token has been successfully generated and saved.'),
)
