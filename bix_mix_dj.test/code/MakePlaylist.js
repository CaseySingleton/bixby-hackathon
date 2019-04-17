 var http = require('http')
 var console = require('console')
module.exports.function = function makePlaylist (Tracks, playlistname) {

  // function strncmp(str1, str2, n) {
  // str1 = str1.substring(0, n);
  // str2 = str2.substring(0, n);
  // return ( ( str1 == str2 ) ? 0 : (( str1 > str2 ) ? 1 : -1 ))
// }
  console.log(Tracks)
  let uris
  for (track in Tracks)
    uris += uris + "spotify:track" + track.id
  console.log(uris)
    // var response = http.oauthPostUrl("https://api.spotify.com/v1/playlists", {name: playlistname})
  return ("yeah")
  // return (playlistname)
}
