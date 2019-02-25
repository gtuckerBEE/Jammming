import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist'

class App extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = { searchResults: [
      {
        name: 'Tiny Dancer',
        artist: 'Elton John',
        album: 'Memories',
        id:'002'
      },
      {
        name: 'Tiny Dancer',
        artist: 'Briteny Spears',
        album: 'Touch me if you can',
        id:'004'},
        {
          name:'Tiny Dancer',
          artist: 'Michelle Obama',
          album: 'WhiteHouse',
          id: '10000'
        },
        ],
        playlistName: "Shaq's list",
        playlistTracks: [
          {
            name:"It's Cold Outside",
            artist:"Ice",
            album:"Freezer Burn",
            id:"000"
          },
          {
            name:"How about that!",
            artist:"You know who",
            album:"IDK",
            id:"001"
          },
          {
            name:"Oda's paws",
            artist:"Mae",
            album:"Dog Town",
            id:"0002"
          }
        ]
      }
  }

  addTrack(track) {
    let savedTrack = ''
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id))
     {
  return;
     } else {
        this.state.playlistTracks.push(savedTrack);
      }
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
    console.log(term);
  }

  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search} searchResults={this.state.searchResults}/>
    <div className="App-playlist">
      <SearchResults onAdd={this.addTrack}/>
      <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
    </div>
  </div>
</div>
    );
  }
}

export default App;
