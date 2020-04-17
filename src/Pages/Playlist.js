import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import actions from '../redux/actions';

const Playlist = ({ playlistId }) => {

  // const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState({});

  console.log(playlist)

  useEffect(() => {
    fetch('http://localhost:3000/playlists/' + playlistId)
      .then(r => r.json())
      .then(res => setPlaylist(res))
  }, []);

  const description = playlist.description
    ?<h2>
      {playlist.description}
    </h2>
    :null

  return <div className="game-show-page">
            <h1>
              {playlist.title}
            </h1>
              {description}
            <div className='row'>
              <div className='single-column'>
                <div className='floating-div'>
                  <div className="sub-row"> 
                    left column
                    {/* {editPlaylistGamesMap()} */}
                  </div>
                </div>
              </div>
              <div className='double-column'>
                <div className="sub-row">
                  right column
                  {/* {editGamesMap()} */}
                </div>
              </div>
            </div>
        </div>
};

export default Playlist;
