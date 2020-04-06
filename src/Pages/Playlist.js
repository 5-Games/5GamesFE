import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/actions';

const Playlist = ({ playlistId }) => {

  const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState({});

  useEffect(() => {
    dispatch(actions.getCurrentPlaylist(playlistId))
    .then(data => setPlaylist(data))
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default Playlist;
