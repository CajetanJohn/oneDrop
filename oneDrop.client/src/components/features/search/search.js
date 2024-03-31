// SearchComponent.js
import React, { useState, useEffect } from 'react';
import Filter from './filter';

const Search = ({onClose}) => {
  const [searchInput, setSearchInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    date: false,
    name: false,
    id: false,
    type: false,
    price: false,
    request: false,
  });
  const [searchResults, setSearchResults] = useState([]);

  const handleFilters = (newFilterOptions) => {
    setFilterOptions(newFilterOptions);
  };

  const fetchData = async () => {
    // Filter keys with values set to true
    const activeFilters = Object.keys(filterOptions).filter((key) => filterOptions[key]);

    const searchUrl = `http://example.com/api/search?${activeFilters
      .map((key) => `${key}=true`)
      .join('&')}&q=${encodeURIComponent(searchInput)}`;

    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchInput, filterOptions]);
  return (
    <>
      <div className='search-bar-div'>
        <input className='search-bar-input' type="text" value={searchInput} onChange={(e) => {setShowFilters(false);setSearchInput(e.target.value)}} placeholder="Search..." />
        <button onClick={onClose}>hide</button>
        <button onClick={()=> setShowFilters(!showFilters)}>{showFilters ? "close" : "filters"}</button>
      </div>
      { showFilters && (
        <Filter filters={handleFilters} filterOptions={filterOptions}/>
        )
      }
      
      <div className={`search-results ${searchResults ? 'shown' : ''}`}>
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Search;
