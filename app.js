require('dotenv').load()

const Hapi = require('hapi')
const services = require('./services')

const server = new Hapi.Server({
  host: 'localhost',
  port: 8000,
})

const options = {
  ops: {
      interval: 1000
  },
  reporters: {
      myConsoleReporter: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*' }]
      }, {
          module: 'good-console'
      }, 'stdout'],
  }
}

server.route({
  method: 'GET',
  path: '/posts/{lang}',
  options: {
    cors: {
      origin: 'ignore'
    },
  },
  handler: (request, h) => {
    return services.req({
      url: 'https://medium.com/@keyserfaty/latest',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(res => {
      return res
    })
  }
})

async function start () {
  try {
    await server.register({
      plugin: require('good'),
      options,
    });
    
    await server.start()
  }
  catch (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('Server running at:', server.info.uri)
}

start()