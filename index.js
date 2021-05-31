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

//get the command from user
const command = core.getInput('command')
if(!command || command === '')
  throw new Error("No aio command specified")

const os = core.getInput('os');

let commandStr = []
// if(command.toLowerCase() === 'build') {
//   commandStr.push("aio app deploy --skip-deploy")
// }
// else if(command.toLowerCase() === 'deploy') {
//   commandStr.push("aio app deploy --skip-build")
// }
// else if(command.toLowerCase() === 'test') {
//   commandStr.push("npm install -g jest")
//   commandStr.push("jest --passWithNoTests ./test")
// }

try {
  console.log(`Executing command ${command}!`)
  try {
    console.log('Trying to set env var')
    core.exportVariable('TEST_ENV_VAR', 'success')
  } catch(e) {
    console.log('error exporting variable ' + e.message)
  }
  console.log(`env variable TEST_ENV_VAR set`)
  // runCLICommand(os, commandStr)
  // .then(() => {
  //   console.log("action completed")
  // })
  // .catch(e => {
  //   core.setFailed(e.message);
  // })
} catch (error) {
  core.setFailed(error.message);
}

// async function runCLICommand(os, commandStr) {
//   let cmd
//   for(let i = 0; i < commandStr.length; i++) {
//     cmd = commandStr[i]
//     if(os && os.startsWith("ubuntu"))
//       cmd = 'sudo --preserve-env ' + cmd
//       await exec.exec(cmd)
//   }
// }
