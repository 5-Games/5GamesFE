import React, { useState } from 'react';
import PlaylistCard from '../Components/PlaylistCard';

const Search = () => {

  const [input, setInput] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSubmit = async(e) => {
    e.preventDefault()
    let raw = await fetch('https://five-games-be.herokuapp.com/playlists/?q=' + input)
    let results = await raw.json()
    setSearchResults(results)
    setInput('')
  }

  const searchPlaylistsMap = searchResults.map((playlist) =>
                      <div key={playlist["id"]} >
                        <PlaylistCard 
                          
                          playlist={playlist}
                        />
                      </div>)
  
  return (
    <>
      <h1>
        SEARCH 
      </h1>
      <h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='search playlists' value={input} onChange={e => setInput(e.target.value)} />
          {" "}
          <input type="submit" value="Submit" />
        </form>
      </h2>
     <div className="row">
       <div className="single-column">
         {searchPlaylistsMap}
       </div>
     </div>
    </>
  );
}

export default Search;
