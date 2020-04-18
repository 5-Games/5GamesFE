import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistCard = ({ playlist }) => {
  
  const truncatedTitle = playlist.title.length > 36 ?
    `${playlist.title.slice(0, 36)}...`
    : playlist.title
  
  const truncatedDescription = playlist.description.length > 51 ?
    `${playlist.description.slice(0, 51)}...`
    : playlist.description

  return (
    <>
      <Link to={"/playlists/" + playlist.id}>
        <div className='playlist-card'>
          <h4>{ truncatedTitle }</h4>
          <div>{ truncatedDescription }</div>
        </div>
      </Link>
    </>
  );
}

export default PlaylistCard;