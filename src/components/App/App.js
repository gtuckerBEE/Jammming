import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from './util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = { searchResults: [
      {
        name: this.track.name,
        artist: this.track.artist,
        album: this.track.album,
        id: this.track.id,
        uri: this.track.uri
      }],

        playlistName: "Shaq's list",

        playlistTracks: [
          {
            name: this.track.name,
            artist: this.track.artist,
            album: this.track.album,
            id: this.track.id,
            uri: this.track.uri
          }]
      }
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id))
     {
  return;
    };
  }

  removeTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id))
    {
      this.state.playlistTracks.splice(track);
    } else {
      return;
    }
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name});
  }

  savePlaylist() {
    const trackURIs = [this.props.playlistTracks.uri]
  }

  search(term) {
    Spotify.search(term).then(track => {
      this.setState({
        name: track.name,
        artist: track.artist,
        album: track.album,
        id: track.id,
        uri: track.uri
      })
    })
  }

  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search} searchResults={this.state.searchResults}/>
    <div className="App-playlist">
      <SearchResults onAdd={this.addTrack}/>
      <Playlist
        onSave={this.savePlaylist}
        onNameChange={this.updatePlaylistName}
        onRemove={this.removeTrack}
        playlistName={this.state.playlistName}
        playlistTracks={this.state.playlistTracks}
      />
    </div>
  </div>
</div>
    );
  }
}

export default App;
