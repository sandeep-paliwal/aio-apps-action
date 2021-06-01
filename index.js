/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const core = require('@actions/core')
const exec = require('@actions/exec')

const { context, getToken } = require('@adobe/aio-lib-ims')


//get the command from user
const command = core.getInput('command')

const os = core.getInput('os')

const key = core.getInput('key')

const scopes = core.getInput('scopes')

const clientId = core.getInput('clientId')

const clientSecret = core.getInput('clientSecret')

const techAccId = core.getInput('technicalAccId')

const imsOrgId = core.getInput('imsOrgId')

let commandStr = []

try {
  console.log(`Executing command ${command}!`)
  try {
    console.log('Trying to generate jwt token')

    const imsConfig = {
      client_id : clientId,
      client_secret: clientSecret,
      technical_account_id: techAccId,
      ims_org_id: imsOrgId,
      private_key: key.toString(),
      meta_scopes: [
        scopes
      ]
    }

    getJwtToken(imsConfig)
    .then(res => {

      console.log('Generated token successfully')

      console.log('Exporting token to env...')
      core.exportVariable('TEST_JWT_TOKEN', res)
      console.log('Done!')
    })
    .catch(e => {
      console.error(e)
      throw e
    })

  } catch(e) {
    console.log('error generating token ' + e.message)
  }
} catch (error) {
  core.setFailed(error.message);
}

async function getJwtToken(imsConfig) {
  await context.set('testjwt', imsConfig, true)
  const token = await getToken('testjwt')
  return token
}
