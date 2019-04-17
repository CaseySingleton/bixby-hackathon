 var http = require('http')
 var console = require('console')
module.exports.function = function makePlaylist (Tracks, playlistname) {
  var response = http.oauthPostUrl("https://api.spotify.com/v1/me/playlists", JSON.stringify({"name": playlistname, "description": "a test to remove or keep you decide", "public": true}))
// playlistname = "Indie Chillout"
  console.log(playlistname)
  let uris = Tracks.tracks.map((track) => {return ("spotify:track:" + track.id)}).toString()
  console.log(uris)
  // var response
  let id
  // do {
    response = http.oauthGetUrl("https://api.spotify.com/v1/me/playlists?limit=50", {format: 'json'})
    // console.log(response.items)
    // console.log(response.items.map((item) => {if (item.name == playlistname) return item.id }))
    id = response.items.map((item) => {if (item.name == playlistname) return item.id }).slice(0,1).toString()
    // console.log(response.items)
    // console.log("this is a name " + name)
    // count++
    // if (name != playlistname)
      // break
  // } while (name != playlistname)
  // return ("yeah")
    response = http.oauthPostUrl("https://api.spotify.com/v1/playlists/" + id + "/tracks?uris=" + uris)
  return ("Playlist created")
}
