/* eslint-disable no-console */

import jsf from 'json-schema-faker'
import { schema } from './mockDataSchema'
import fs from 'fs'
import chalk from 'chalk'
// this import lets us instantiate faker in order to generate data this is due to a new faker version.
import faker from "faker"

jsf.extend("faker", function() {
  return faker
})

const json = JSON.stringify(jsf(schema))

fs.writeFile('./src/api/db.json', json, function (err){
  if(err){
    return console.log(chalk.red(err))
  }else{
    console.log(chalk.green('Mock Data Generated.'))
  }
})