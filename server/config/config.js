// config.js
const { firebaseConfig } = require('./firebase')
const { initializeApp } = require('firebase/app')
const app = initializeApp(firebaseConfig)

const { adminConfig } = require('./adminSDK')
const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert({
    type: adminConfig.type,
    project_id: adminConfig.project_id,
    private_key_id: adminConfig.private_key_id,
    private_key: adminConfig.private_key.replace(/\\n/g, '\n'),
    client_email: adminConfig.client_email,
    client_id: adminConfig.client_id,
    auth_uri: adminConfig.auth_uri,
    token_uri: adminConfig.token_uri,
    auth_provider_x509_cert_url: adminConfig.auth_provider_x509_cert_url,
    client_x509_cert_url: adminConfig.client_x509_cert_url,
    universe_domain: adminConfig.universe_domain,
  }),
  databaseURL: firebaseConfig.databaseURL,
})

module.exports = { app, admin }
