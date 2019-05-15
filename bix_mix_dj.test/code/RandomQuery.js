 var secret = require('secret')
 var config = require('config')
 var http = require('http')
 var console = require('console')

module.exports.function = function randomNameQuery (numberOfSongs, requestedTempo) {

  // Returns a random number between 0 and max - 1
  function getRandomNumber(max) {
    return (Math.floor(Math.random() * Math.floor(max)))
  }

  // Returns a simple string used to query the Spotify API.
  function getRandomQuery() {
    let consonants = "bcdfghjklmnpqrstvwxyz"
    let vowels = "aeiou"
    let queryString = ""

    queryString += consonants.charAt(getRandomNumber(consonants.length))
    queryString += '*'
    queryString += vowels.charAt(getRandomNumber(vowels.length))
    console.log(queryString)
    return (queryString)
  }

  function querySpotify() {
    let queryName = getRandomQuery()
    let query = "https://api.spotify.com/v1/search?q=" + queryName + "&type=track&market=US&limit=50"
    let data = http.oauthGetUrl(query, {format: "json"})
    return (data)
  }

  function getTrackTempos(trackDetails) {
    let tempos = []
    for (let i = 0; i < 50; i++) {
      if (trackDetails.audio_features[i] === null)
        tempos[i] = 0
      else
        tempos[i] = trackDetails.audio_features[i].tempo
    }
    return (tempos)
  }

  function getDetailedTrackInfo(trackIDs) {
    let query = "https://api.spotify.com/v1/audio-features?ids=" + trackIDs.join()
    let trackDetails = http.oauthGetUrl(query, {format: "json"})
    return (trackDetails)
  }

  // Returns a list of track IDs as a single string delimited by commas
  function getTracks() {
    let data = querySpotify()
    let trackIDs = [], trackNames = [], images = []
    for (var i = 0; i < 50; i++) {
      trackIDs[i] = data.tracks.items[i].id
      trackNames[i] = data.tracks.items[i].name
      images[i] = data.tracks.items[i].album.images[0].url
    }
    let details = getDetailedTrackInfo(trackIDs)
    let tempos = getTrackTempos(details)
    return {ids: trackIDs, names: trackNames, tempos: tempos, images: images}
  }

  function doTheThing() {
    let ids = [], names = [], details = [], tempos = [], images = []
    let tracks = null
    let tooMany = 0, relax = 0, i = 0
    while (i < numberOfSongs && tooMany < 100) {
      tracks = getTracks()
      for (let j = 0; j < 50 && i < numberOfSongs; j++) {
        if (Math.floor(tracks.tempos[j]) >= requestedTempo - relax && Math.floor(tracks.tempos[j] <= requestedTempo + relax)) {
          if (names.indexOf(tracks.names[j]) < 0) {
            ids[i] = tracks.ids[j]
            names[i] = tracks.names[j]
            tempos[i] = tracks.tempos[j]
            images[i] = tracks.images[j]
            i += 1
          }
        }
      }
      tooMany += 1
      if (tooMany % 5 === 0)
        relax += tooMany % 4
    }
    return {ids: ids, names: names, tempos: tempos, images: images}
  }

  info = doTheThing()
  console.log(info.tempos)
  console.log(info.names)
  console.log(info.ids)
  return {
    trackIDs: info.ids,
    tempos: info.tempos,
    trackNames: info.names,
    trackAlbumImage: info.images,
    trackTiming: "0"
  }
}
