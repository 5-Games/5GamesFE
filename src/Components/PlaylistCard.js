import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistCard = ({ playlist }) => {

  // Get variables from Redux state
  // const createGamesArr = (useSelector(state => state.createPlaylistGames))

  // formatDate takes the BDL date and returns in format: MM-DD-YY
  // const formatDate = (date) => {
  //   let d = date.slice(0, 10).split('-');   
  //   return d[1] +'/'+ d[2] +'/'+ d[0].slice(2, 4);
  // }
  
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
          {/* <div>by: {playlist.user_id}</div> */}
          <div>Description: { truncatedDescription }</div>
          {/* <div>Rating: {playlist.rating}</div> */}
        </div>
      </Link>
    </>
  );
}

export default PlaylistCard;