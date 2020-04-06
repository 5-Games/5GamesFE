import React from 'react';
import { useSelector } from 'react-redux';
import PlaylistCard from '../Components/PlaylistCard';



const UserPlaylists = () => {
  // Get variables from Redux state
  const userPlaylists = useSelector(state => state.user.playlists);

  // userPlaylistsMap renders all the user's playlists
  const userPlaylistsMap = userPlaylists.map((playlist) =>
                        <PlaylistCard 
                          key={playlist["id"]} 
                          playlist={playlist}
                        />)

  return <>
          { userPlaylistsMap } 
        </>
};

export default UserPlaylists;

