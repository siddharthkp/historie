#!/usr/bin/env node

const inquirer = require('inquirer')
const history = require('./history')
const exec = require('./exec')
const autocomplete = require('inquirer-autocomplete-prompt')

console.log() // Breathing space

const options = {
  type: 'autocomplete',
  name: 'command',
  message: '$',
  source: (_, input) => history(input || '') // Filtered history
}

inquirer.registerPrompt('autocomplete', autocomplete)
inquirer.prompt(options).then(({ command }) => exec(command))
