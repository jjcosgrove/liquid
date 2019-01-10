import packageJSON from '@packageJSON'

const config = {
  appName: 'LiQuiD',
  linode: {
    baseAPIConfig: {
      apiVersion: 'v4',
      baseURL: 'https://api.linode.com',
      headers: {
        ContentType: 'application/json'
      }
    },
    endpoints: {
      data: {
        TYPES: '/linode/types',
        REGIONS: '/regions',
        IMAGES: '/images'
      },
      linode: {
        CREATE: '/linode/instances'
      }
    }
  },
  ...packageJSON
}

export {
  config
}
