import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div className="TrackList">
    {this.props.playlistTracks.map(track => {
      return <Track playlistTracks={this.props.playlistTracks} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} onAdd={this.props.onAdd} track={track} key={track.id} />
    })}
</div>
  )}
}

export default TrackList;
