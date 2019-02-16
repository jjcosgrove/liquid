import os from 'os'
import { extname } from 'path'
import program from 'commander'
import { prompt } from 'inquirer'
import { PathPrompt } from 'inquirer-path'
import ls from 'log-symbols'

import { config } from '@config'
import { app } from '@app'

const HOME_DIR = os.homedir()

prompt.registerPrompt('path', PathPrompt)

program
  .version(config.version)
  .description(config.description)

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
      validate: isNotEmptyStringValidator
    }])
      .then(answers => app.initialize(answers.token))
  })

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
          validate: isNotEmptyStringValidator
        }, {
          type: 'confirm',
          name: 'include_ssh_key',
          default: false,
          message: 'Include SSH Key?'
        }, {
          type: 'path',
          name: 'authorized_keys',
          cwd: HOME_DIR,
          default: `${HOME_DIR}/.ssh/id_rsa.pub`,
          message: 'SSH Key?',
          when: answers => answers.include_ssh_key,
          validate: isValidSSHKeyFileValidator
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

const isNotEmptyStringValidator = string => {
  return string.length ? true : 'Cannot be empty'
}

const isValidSSHKeyFileValidator = sshKeyFilePath => {
  return extname(sshKeyFilePath) === '.pub' ? true : 'Invalid SSH Key'
}
