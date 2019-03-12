const url = 'https://accounts.spotify.com/authorize';
let accessToken = '';
let redirectURI = 'http://get_your_jam_on.surge.sh';
let clientID = '36b7ea3dbddc4799a1aee3995f9e6f1a';
let clientSecret = '8cda8660148348cab5914eb6e982cc5f';
const responseType = 'token';
const scope = 'playlist-modify-public';
const authUrl = `${url}?client_id=${clientID}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectURI}`;

const Spotify = {
  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
  headers: {Authorization: `Bearer ${accessToken}`}
})
},

  getAccessToken() {
  if(accessToken)
    return accessToken;
  else if(window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/))
  {
    let accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
    let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

    window.setTimeout(() => accessToken = '', expiresIn*1000);
    window.history.pushState('Access Token', null, '/');

    return accessToken;
  }
  else
  {
    let url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    window.location = url;
  }
 },

 savePlaylist(name, trackUris) {

   if (!name || !trackUris.length) {
     return;
   }
   const accessToken = Spotify.getAccessToken();
   const headers = { Authorization: `Bearer ${accessToken}` };
   let userId;

   return fetch('https://api.spotify.com/v1/me', {
     headers: headers}
   ).then(response => {
     if (response.ok) {
       return response.json()
     }
     throw new Error('Request Failed!');
   }, networkError => console.log(networkError.message)
   ).then(jsonResponse => {
     userId = jsonResponse.id;
     return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
       headers: headers,
       method: 'POST',
       body: JSON.stringify({name: name})
     }).then(response => {
       if (response.ok) {
         return response.json()
       }
       throw new Error('Request Failed!');
     }, networkError => console.log(networkError.message)
     ).then(jsonResponse => {
       const playlistId = jsonResponse.id;
       return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
         headers: headers,
         method: 'POST',
         body: JSON.stringify({uris: trackUris})
       });
     })
   })
 }
}

export default Spotify;
