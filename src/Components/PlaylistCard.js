import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistCard = ({ playlist }) => {

  // temporary variable until the return is fixed on the game show page and/or the userplaylists container
  const id = playlist.playlist_id || playlist.id

  const title = playlist.title ?
    playlist.title
    : ''

  const description = playlist.description ?
    playlist.description
    : ''
  
  const truncatedTitle = title.length > 36 ?
    `${playlist.title.slice(0, 36)}...`
    : playlist.title
  
  const truncatedDescription = description.length > 51 ?
    `${playlist.description.slice(0, 51)}...`
    : playlist.description

  return (
    <>
      <Link to={"/playlists/" + id}>
        <div className='playlist-card'>
          <h4>{ truncatedTitle }</h4>
          <div>{ truncatedDescription }</div>
        </div>
      </Link>
    </>
  );
}

export default PlaylistCard;