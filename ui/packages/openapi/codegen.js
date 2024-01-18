/*
 * Copyright 2022 Chaos Mesh Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import fs from 'fs'
import { generate as orval } from 'orval'
import rimraf from 'rimraf'
import sig from 'signale'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { appPath } from './constants.js'
import { genForms, swaggerRefToAllOf } from './index.js'

const rimrafCallback = (err) => {
  if (err) {
    sig.error(err)
  }
}

const argv = yargs(hideBin(process.argv))
  .command('client', 'generate API client by orval')
  .command('formik', 'convert the definitions generated by orval to Formik form data')
  .alias('help', 'h')
  .version(false)
  .wrap(120).argv

// eslint-disable-next-line default-case
switch (argv._[0]) {
  case 'client':
    runClient()

    break
  case 'formik':
    runFormik()

    break
}

async function runClient() {
  fs.copyFileSync('../../../pkg/dashboard/swaggerdocs/swagger.yaml', './swagger.yaml')
  swaggerRefToAllOf('./swagger.yaml')
  await callOrval()
  rimraf('./swagger.yaml', rimrafCallback)
}

function callOrval() {
  return orval('./orval.config.cjs')
}

function runFormik() {
  genForms(`${appPath}/src/openapi/index.schemas.ts`)
}