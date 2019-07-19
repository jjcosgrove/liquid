import axios from 'axios'

import { config } from '@config'

const apiResponseFormatter = (response) => {
  return response.data && response.data.data ? response.data.data : response.data
}

const apiErrorFormatter = (error) => {
  return Promise.reject(error)
}

class API {
  constructor (token) {
    this.createConfig(token)

    this.createInstance(config.linode.endpoints)

    this.assignInterceptors(
      apiResponseFormatter,
      apiErrorFormatter
    )
  }

  createConfig (token) {
    const apiConfig = config.linode.baseAPIConfig

    this.apiConfig = {
      ...apiConfig,
      baseURL: `${apiConfig.baseURL}/${apiConfig.apiVersion}`,
      headers: { ...apiConfig.headers, Authorization: `Bearer ${token}` }
    }
  }

  createInstance (endpoints) {
    this.apiInstance = axios.create(this.apiConfig)
    this.apiEndpoints = endpoints
  }

  assignInterceptors (responseInterceptor, errorInterceptor) {
    this.apiInstance.interceptors.response.use(responseInterceptor, errorInterceptor)
  }

  getTypes () {
    return this.apiInstance.get(this.apiEndpoints.data.TYPES)
  }

  getRegions () {
    return this.apiInstance.get(this.apiEndpoints.data.REGIONS)
  }

  getImages () {
    return this.apiInstance.get(this.apiEndpoints.data.IMAGES)
  }

  createLinode (profile) {
    return this.apiInstance.post(this.apiEndpoints.linode.CREATE, profile)
  }
}

export { API }
