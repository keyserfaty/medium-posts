require('dotenv').load()

const Hapi = require('hapi')
const services = require('./services')

const server = Hapi.server({
    host: 'localhost',
    port: 8000
})

const options = {
  url: process.env.MEDIUM_URL,
  headers: {
    'Accept': 'application/json'
  }
}

server.route({
  method: 'GET',
  path: '/posts/{lang}',
  handler: (request, h) => {
    return services.req(options)
    .then(res => {
      return res
    })
  }
})

async function start () {
  try {
    await server.start()
  }
  catch (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('Server running at:', server.info.uri)
}

start()