// SearchResults.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  async function fetchSearchResults(query) {
    try {
      let result = await fetch(`http://localhost:8000/api/search/${query}`);
      result = await result.json();
      setSearchResults(result);
      if (result.length === 0) {
        setSearchError("No results found.");
      } else {
        setSearchError("");
      }
    } catch (error) {
      console.error("Error searching recipe:", error);
      setSearchError("Error searching for blogs. Please try again later.");
    }
  }

  return (
    <>
      <Header />
      <div style={{ textAlign: 'center', margin: 'auto', width: '80%' }}>
  <h3>Search Results:</h3>
  {searchError && <p>{searchError}</p>}
  {searchResults.length > 0 ? (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {searchResults.map((blog) => (
        <li key={blog.id}>
          <h2>{ blog.title }</h2>
              <img style={{width:100}} src={"http://localhost:8000/"+blog.file_path}/>
              <p>Ingrediant { blog.body }</p>
              <p>Written by { blog.author }</p>
        </li>
      ))}
    </ul>
  ) : null}
</div>

    </>
  );
};

export default SearchResults;
