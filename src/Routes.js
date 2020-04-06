import React from 'react';
// Switch renders the appropriate page
import { Switch, Route } from 'react-router-dom';
// allows us to route to all pages within the Pages folder
import Pages from './Pages';
import Game from './Pages/Game';
import Playlist from './Pages/Playlist';

const Routes = () => {
  return (
    // <Switch> iterates over all children <Route> & only render the first one that matches the current location
    // See: https://reacttraining.com/react-router/web/guides/basic-components
    // Routes need two props: path and component
    <Switch>
      <Route path="/signup" component={Pages.Signup} />
      <Route path="/login" component={Pages.Login} />
      {/* <Route path="/game" component={Pages.Game} /> */}
      <Route exact path="/games/:id">
        {renderGame}
      </Route>
      <Route path="/playlist/create" component={Pages.CreatePlaylist} />
      <Route path="/playlist/edit" component={Pages.EditPlaylist} />
      <Route exact path="/playlists/:id">
        {renderPlaylist}
      </Route>
      <Route exact path="/" component={Pages.Home} />
    </Switch>
  );  
};

const renderGame = (renderParams) => {
  const gameId = parseInt(renderParams.match.params.id)
  return <Game gameId={gameId} /> 
}

const renderPlaylist = (renderParams) => {
  const playlistId = parseInt(renderParams.match.params.id)
  return <Playlist playlistId={playlistId} />
}

export default Routes;
