 var secret = require('secret')
 var config = require('config')
 var http = require('http')
module.exports.function = function auth () {
  http.oauthPutUrl("https://api.spotify.com/v1/me/player/pause")
  
  return {}
}
