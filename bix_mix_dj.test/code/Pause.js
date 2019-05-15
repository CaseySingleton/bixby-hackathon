 var secret = require('secret')
 var config = require('config')
 var http = require('http')
 var console = require('console')
module.exports.function = function auth () {
 var response = JSON.parse(http.oauthGetUrl("https://api.spotify.com/v1/me/player/devices"))
    console.log(response)
//  console.log(Object.keys(response));
//  console.log(Object.value(response));
 
console.log(response.devices.map((device) => device.id).toString())
  // console.log("https://api.spotify.com/v1/me/player/pause/pause?device_id=" + response.devices.map((device) => device.id).toString())
  // var newdevice = device.map(device_properties)
  // console.log(resonse.body)
  // var devices = response["devices"];
  //var IDs = response["devices"].map(function(device) {return device["id"]});
  
  //console.log("this is what i got: " + response["details"])
  var search = http.oauthPutUrl("https://api.spotify.com/v1/me/player/pause?device_id=" + response.devices.map((device) => device.id).toString())
  // http.oauthGetUrl("https://api.spotify.com/v1/search?q=Muse&type=track")
  // http.oauthGetUrl(url, options)
}
