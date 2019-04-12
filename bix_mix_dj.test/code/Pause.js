 var secret = require('secret')
 var config = require('config')
 var http = require('http')
module.exports.function = function auth () {
  http.oauthGetUrl("https://api.spotify.com/v1/search?q=Muse&type=track")
  // http.oauthGetUrl(url, options)
  return {}
}
