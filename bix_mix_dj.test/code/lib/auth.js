require('config');
require('secret');

// Exports
module.exports = {
  // function: getReviews,
  // preconditions: preconditions,
  authorization: {
    provider: "Spotify",
    type: "OAuth2.0",
    grantType: "client_credentials",
    clientId: secret.get("oauth.id"),
    clientSecret: secret.get("oauth.secret"),
    // tokenEndpoint: config.get("oauth.url"),
  },
}