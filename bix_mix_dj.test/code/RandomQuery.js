 var secret = require('secret')
 var config = require('config')
 var http = require('http')
 var console = require('console')

module.exports.function = function randomNameQuery (numberOfSongs) {

  // If this was C, str[index] = character. But this is not C
  function setCharAt(str, index, character) {
    if (index > str.length - 1) {
      return (str)
    }
    return (str.substr(0, index) + character + str.substr(index + 1))
  }

  // Returns a random number between 0 and max - 1
  function getRandomNumber(max) {
    return (Math.floor(Math.random() * Math.floor(max)))
  }

  // Returns a simple string used to query the Spotify API.
  // The string returned will contain 1 to 2 wildcards to help simulate randomness
  // in song selection.
  // Examples of returned string: *a*, *ut, lo*, etc.
  function getRandomQuery() {
    var consonants = "bcdfghjklmnpqrstvwxyz"
    var vowels = "aeiou"
    var text = ""

    // The possiblity of a name containing two consonants next to each other (*tk)
    // is vastly lower than a name containing one consanant next to one vowel (*ta).
    text += consonants.charAt(getRandomNumber(consonants.length))
    text += vowels.charAt(getRandomNumber(vowels.length))
    text += consonants.charAt(getRandomNumber(consonants.length))
  
    // Spotifys API allows up to two wild cards in their name query.
    // Below a number (0 - 1) is generated.
    // While that number is less than 2 insert a wildcard randomly into the query.
    //   The random index to be replaced by a wild card is between 0 and text.length (0 - 2).
    // Maximum wildcards to be inserted is 2 the minimum is 1
    for (var i = getRandomNumber(2); i < 2; i++) {
      var randomIndex = getRandomNumber(text.length)
      if (text.charAt(randomIndex - 1) !== '*' && text.charAt(randomIndex + 1) !== '*')
      text = setCharAt(text, randomIndex, '*')
    }
    return (text)
  }

  // Returns a list of track IDs as a single string delimited by commas
  function getTrackIDs() {
    var queryName = getRandomQuery()
    var queryOffset = getRandomNumber(950)
    var query = "https://api.spotify.com/v1/search?q=" + queryName + "&type=track&market=US&limit=50&offset=" + queryOffset
  
    var data = http.oauthGetUrl(query, {format: "json"})
    var trackIDs = []
    for (var i = 0; i < numberOfSongs; i++) {
      trackIDs[i] = data.tracks.items[i].id
    }
    return (trackIDs.join())
  }

  function getTrackDetails(trackIDs) {
    var query = "https://api.spotify.com/v1/audio-features?ids=" + trackIDs
    console.log(query)
    var trackDetails = http.oauthGetUrl(query, {format: "json"})
    // console.log(trackDetails)
    return (trackDetails)
  }
  
  function getTrackTempos(trackDetails) {
    var tempos = []
    for (var i = 0; i < numberOfSongs; i++) {
      tempos[i] = trackDetails.audio_features[i].tempo
    }
  }

  var trackDetails = getTrackDetails(getTrackIDs())
  var tempos = getTrackTempos(trackDetails)
  console.log(tempos)
  return {trackIDs: "Hello"}
}

