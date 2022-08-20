const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = phase => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'ayanesh',
        mongodb_password: 'ayanesh%40502',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'events'
      }
    }
  }

  return {
    env: {
      mongodb_username: 'ayanesh',
      mongodb_password: 'ayanesh%40502',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'events'
    }
  }
}