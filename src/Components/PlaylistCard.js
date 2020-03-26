import React from 'react';

const PlaylistCard = ({ playlist }) => {

  return (
    <div>
      <h3>{playlist.title}</h3>
      <h4>by: {playlist.user.username}</h4>
      <p>Comment: {playlist.comment}</p>
      <p>Rating: {playlist.rating}</p>
    </div>
  );
}

export default PlaylistCard;
