var http = require('http')
var console = require('console')

module.exports.function = function play () {
  // var response = http.oauthGetUrl("https://api.spotify.com/v1/me/player", {format: "json"})
  //   console.log(response)
//  console.log(Object.keys(response));
//  console.log(Object.value(response));
 
// console.log(response.devices.map((device) => device.id).toString())
  // console.log("https://api.spotify.com/v1/me/player/pause/pause?device_id=" + response.devices.map((device) => device.id).toString())
  // var newdevice = device.map(device_properties)
  // console.log(resonse.body)
  // var devices = response["devices"];
  //var IDs = response["devices"].map(function(device) {return device["id"]});
  
  //console.log("this is what i got: " + response["details"])
  // console.log(http.oauthPutUrl("https://api.spotify.com/v1/me/player/play", {}))
  var search = http.oauthPutUrl("https://api.spotify.com/v1/me/player/play", {})
  // var response = http.oauthGetUrl("https://api.spotify.com/v1/me/player", {format: "json"})
  // http.oauthGetUrl("https://api.spotify.com/v1/search?q=Muse&type=track")
  // http.oauthGetUrl(url, options)
  
  // console.log(response)
  // if (search.error.status == 403)
  //   return ("You need a premium spotify account for this feature")
  // else if (response.error.status == 200)
    return ("Playback resumed")
  // else if (search.error.status == 400)
  //   return ("failed")
  // return (search)
}
