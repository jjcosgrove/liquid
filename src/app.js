import os from 'os'
import fs from 'fs'
import yaml from 'js-yaml'
import mkdirp from 'mkdirp'
import ls from 'log-symbols'

import { config } from '@config'
import { API } from '@api'

class App {
  constructor () {
    this.homeDir = `${os.homedir()}`
    this.baseDir = `${this.homeDir}/.${config.appName.toLowerCase()}`
    this.configFile = `${this.baseDir}/${config.appName.toLowerCase()}.yml`
  }

  initialize (token) {
    this.createConfigsAndStore(this.homeDir, token)
    console.log(ls.success, `${config.appName} successfully initialized`)
  }

  createConfigsAndStore (path, token) {
    let errorHasOccured = false

    mkdirp(this.baseDir, (error) => {
      if (error) { errorHasOccured = true }
    })

    this.writeConfig({
      token: token
    })

    if (errorHasOccured) {
      console.log(ls.error, `Cannot create ${config.appName} folders and files. Check permissions`)
    }
  }

  getLinodeData () {
    return new Promise((resolve, reject) => {
      const configuration = this.readConfig()

      const api = new API(configuration.token)

      const types = api.getTypes()
      const regions = api.getRegions()
      const images = api.getImages()

      const getLinodeData = Promise.all([types, regions, images])

      getLinodeData
        .then(([types, regions, images]) => {
          resolve({
            types: types.map(types => ({
              name: `${types.label} (${types.id})`,
              value: types.id
            })),
            regions: regions.map(region => ({
              name: `${region.country.toUpperCase()} (${region.id})`,
              value: region.id
            })),
            images: images.map(image => ({
              name: `${image.label} (${image.id})`,
              value: image.id
            }))
          })
        })
    })
  }

  createLinodeInstance (profile) {
    if (!this.alreadyInitialized()) {
      console.log(ls.info, `Please run: ${config.appName} init`)
      return
    }

    if (profile.include_ssh_key) {
      profile.authorized_keys = [
        this.readSSHKeyFromFile(profile.authorized_keys)
      ]
    } else {
      profile.include_ssh_key = null
    }

    const configuration = this.readConfig()

    const api = new API(configuration.token)

    api.createLinode(profile)
      .then(linode => {
        console.log(ls.success, `Linode: ${linode.label} (id: ${linode.id}) has been assigned the IP: ${linode.ipv4}, is currently ${linode.status} ${profile.booted ? 'and will' : 'but will not'} boot.`)
      })
      .catch(error => {
        console.log(ls.error, error.message)
        console.log(ls.error, profile)
      })
  }

  alreadyInitialized () {
    try {
      return fs.statSync(this.baseDir).isDirectory()
    } catch (error) {
      return !error.code === 'ENOENT'
    }
  }

  readSSHKeyFromFile (file) {
    try {
      return fs.readFileSync(file, 'utf8').toString().replace('\n', '')
    } catch (error) {
      console.log(ls.error, `Cannot read from ${config.appName} configuration`)
    }
  }

  readConfig () {
    try {
      return yaml.safeLoad(fs.readFileSync(this.configFile, 'utf8'))
    } catch (error) {
      console.log(ls.error, `Cannot read from ${config.appName} configuration`)
    }
  }

  writeConfig (configuration) {
    try {
      fs.writeFileSync(this.configFile, yaml.dump(configuration))
    } catch (error) {
      console.log(ls.error, `Cannot write to ${config.appName} configuration`)
    }
  }
}

export const app = new App()
