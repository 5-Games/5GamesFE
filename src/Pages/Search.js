import React, { useState } from 'react';
import PlaylistCard from '../Components/PlaylistCard';

const Search = () => {

  const [input, setInput] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSubmit = async(e) => {
    e.preventDefault()
    let raw = await fetch('http://localhost:3000/playlists/?q=' + input)
    let results = await raw.json()
    setSearchResults(results)
    setInput('')
  }

  const searchPlaylistsMap = searchResults.map((playlist) =>
                      <div>
                        <PlaylistCard 
                          key={playlist["id"]} 
                          playlist={playlist}
                        />
                      </div>)
  
  return (
    <>
     <h2>Search for playlists: 
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Search' value={input} onChange={e => setInput(e.target.value)} />
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
