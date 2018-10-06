const request = require('request')
const helpers = require('./helpers')

const req = options => new Promise ((resolve, reject) => {
  request(options, function (error, res, body) {
    if (error) return reject(error)

    const posts = helpers.parsedPosts(helpers.parseBody(body).payload.references.Post)
    return resolve(posts)
  })
})

module.exports = {
  req
}