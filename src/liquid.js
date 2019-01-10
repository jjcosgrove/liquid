import { default as program } from 'commander'
import { prompt } from 'inquirer'
import ls from 'log-symbols'

import { config } from '@config'
import { app } from '@app'

// info
program
  .version(config.version)
  .description(config.description)

// init
program
  .command('init')
  .description('Initialize LiQuiD with a Linode Personal Access Token')
  .action(() => {
    if (app.alreadyInitialized()) {
      console.log(ls.info, `${config.appName} has already been initialized`)
      return
    }

    prompt([{
      type: 'input',
      name: 'token',
      message: 'Linode Personal Access Token:',
      validate: (value) => nonEmptyCheck(value)
    }])
      .then(answers => app.initialize(answers.token))
  })

// deploy
program
  .command('create')
  .description('Provision a new Linode instance using the LiQuiD wizard')
  .action(() => {
    if (!app.alreadyInitialized()) {
      console.log(ls.info, `${config.appName} has not been initialized. Please re-run with 'init'`)
      return
    }

    app.getLinodeData()
      .then(linodeData => {
        prompt([{
          type: 'input',
          name: 'label',
          default: 'LINODE',
          message: 'Name:'
        }, {
          type: 'list',
          choices: linodeData.types,
          name: 'type',
          default: 'g6-nanode-1',
          message: 'Type:'
        }, {
          type: 'list',
          choices: linodeData.regions,
          name: 'region',
          default: 'eu-west',
          message: 'Region:'
        }, {
          type: 'list',
          choices: linodeData.images,
          name: 'image',
          default: 'linode/debian9',
          message: 'Image:'
        }, {
          type: 'password',
          name: 'root_pass',
          message: 'Password',
          validate: (value) => nonEmptyCheck(value)
        }, {
          type: 'confirm',
          name: 'backups_enabled',
          default: false,
          message: 'Backups?'
        }, {
          type: 'confirm',
          name: 'booted',
          default: false,
          message: 'Boot?'
        }])
          .then(profile => app.createLinodeInstance(profile))
      })
  })

program.parse(process.argv)

// validator for inputs
const nonEmptyCheck = (string) => {
  return string.length ? true : 'Cannot be empty'
}
