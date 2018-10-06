const R = require('ramda')
const moment = require('moment')

const parsePostContent = post => R.pipe(
  R.pick(['id', 'title', 'detectedLanguage', 'firstPublishedAt', 'uniqueSlug', 'virtuals']),
  R.map(key => {
    if (key.hasOwnProperty('readingTime')) {
      return {
        readingTime: key['readingTime']
      }
    } else {
      return key
    }
  }),
)(post)

const parsedPosts = posts => R.pipe(
  R.map(post => parsePostContent(post)),
  R.map(obj => ({
    ...obj,
    firstPublishedAtMonth: moment(obj.firstPublishedAt).format('MMM'),
    firstPublishedAtDay: moment(obj.firstPublishedAt).format('DD'),
  })),
)(posts)

const parseBody = body => JSON.parse(
  body.split('])}while(1);</x>')[1]
)

module.exports = {
  parsedPosts,
  parseBody,
}