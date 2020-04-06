import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/actions';

const Playlist = ({ playlistId }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getCurrentPlaylist(playlistId))
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default Playlist;
