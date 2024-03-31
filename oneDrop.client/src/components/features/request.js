import React, { useState, useEffect } from "react";
import { searchSong } from "../../services/apis/searchMusic";

const SearchInput = ({ value, onChange }) => (
  <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Song name"/>
);

const ShowResults = ({ searchResults, onSelectSong }) => (
  <div className="modal">
    <div className="modal-content">
      <h3>Search Results:</h3>
      <ul>
      {searchResults.data.map((song) => (
        <li key={song.id} onClick={() => onSelectSong(song)}>
          {song.title} - {song.artist.name}
          <br />
          {song.preview && (
            <audio controls>
              <source src={song.preview} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          )}
          {song.artist.picture && (
            <img src={song.artist.picture} alt={song.title} />
          )}
        </li>
      ))}
    </ul>
    </div>
  </div>
);

const SelectedItems = ({ selectedItems, onRemoveItem }) => (
  <div>
    <h3>Selected Items:</h3>
    <ul>
      {selectedItems.map((item) => (
        <li key={item.id}>
          {item.title}{" "}
          <button onClick={() => onRemoveItem(item.id)}>Remove</button>
        </li>
      ))}
    </ul>
  </div>
);

export default function Request({ onClose, onBack, onNext, isUserMember, isFreeEvent }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ data: [] });
  const [selectedItems, setSelectedItems] = useState([]);
  const maxSelectedItems = 5;

  useEffect(() => {
    const performSearch = async () => {
      try {
        const searchData = await searchSong(searchQuery);
        setSearchResults(searchData || { data: [] });
      } catch (error) {
        console.error("Error searching:", error);
      }
    };

    if (searchQuery.trim() !== "") {
      performSearch();
    } else {
      setSearchResults({ data: [] });
    }
  }, [searchQuery]);

  const isSongSelected = (song) =>
    selectedItems.some((item) => item.id === song.id);

  const handleSelectSong = (song) => {
    if (
      selectedItems.length < maxSelectedItems &&
      !isSongSelected(song)
    ) {
      setSelectedItems((prevItems) => [...prevItems, song]);
    }
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  const handleNextClick = async () => {
    if (selectedItems.length > 0) {
      try {
        const response = await fetch('/api/songRequests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedItems),
        });

        if (response.ok) {
          console.log('Song requests submitted successfully');
        } else {
          console.error('Failed to submit song requests:', response);
        }
      } catch (error) {
        console.error('Error submitting song requests:', error);
      }
    }

    if (isFreeEvent || isUserMember) {
      // Proceed to checkout component
      // You can call a function or navigate to the checkout component here
      console.log("Proceeding to Checkout");
    } else {
      // Proceed to buy ticket component
      // You can call a function or navigate to the buy ticket component here
      console.log("Proceeding to Buy Ticket");
    }
  };

  return (
    <div>
      <h2>Request Component</h2>
      <SearchInput value={searchQuery} onChange={setSearchQuery} />
      <button onClick={onBack}>Back</button>
      <button onClick={handleNextClick}>Next</button>

      {selectedItems.length > 0 && (
        <SelectedItems selectedItems={selectedItems} onRemoveItem={handleRemoveItem} />
      )}

      {searchResults.data.length > 0 && (
        <ShowResults searchResults={searchResults} onSelectSong={handleSelectSong} />
      )}
    </div>
  );
}
