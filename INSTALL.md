# Installation

Module compatible with both Adobe Commerce SaaS and PaaS.

## Prerequisites

- Node.js 20+
- Adobe I/O CLI (`npm install -g @adobe/aio-cli`)

## Adobe Console preparation

Go to [Adobe Developer Console](https://developer.adobe.com) and create a new project from the "App Builder" template.

Adding a service "Adobe Commerce as a Cloud Service" is necessary for generating OAuth Server-to-Server credentials.

## Installation

- Clone the repository
- Run `npm install` for installing dependencies

## Environment variables

- Rename default `env.dist` to `.env` for storing environment variables

### Adobe Commerce SaaS ![Compatibility](https://img.shields.io/badge/SaaS%20only-006941)

Go to your project in the Adobe Developer console, and copy-paste the OAuth credentials into `.env` config as they are:

```env
OAUTH_CLIENT_ID=
OAUTH_CLIENT_SECRETS=
OAUTH_TECHNICAL_ACCOUNT_EMAIL=
OAUTH_TECHNICAL_ACCOUNT_ID=
OAUTH_SCOPES=
OAUTH_IMS_ORG_ID=
```

### Adobe Commerce PaaS ![Compatibility](https://img.shields.io/badge/PaaS%20only-0469e3)

Create an integration in Adobe Commerce on `System > Integrations` (preferably with all permissions) and save your
access token in the `COMMERCE_ACCESS_TOKEN` variable.

Once you've finished with credentials, you have to connect your project in the Adobe Developer Console with your App
Builder application by running the following commands:

```shell
aio login
aio console org select
aio console project select
aio console workspace select
aio app use --merge
```

Last step, you have to register your App Builder namespace in our external backoffice and generate a JWT token:

```shell
npm run register
```

## Deploy the app

Congratulations! You're all set for deploying your app.

```shell
aio app deploy
```

## Admin UI SDK and enabling in Adobe Commerce

As our app is using Admin UI SDK for extending the admin panel, please be sure to enable it in your Adobe Commerce.

- Go to `System > Configuration > Adobe Services > Admin UI SDK`
- Enable Admin UI SDK from `General configuration`
- Click `Configure extensions` and be sure your extension is listed and checked
- `Refresh registrations` for clearing the cache

Enjoy!
