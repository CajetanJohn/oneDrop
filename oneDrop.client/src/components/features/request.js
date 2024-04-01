import React, { useState } from 'react';
import Input from '../common/input';
import { LoadingButton } from '../common/button';
import Icon from '../../assets/icons/icons';
import MakeRequest from '../../utils/services/apis/makeRequest';

const sampleData = [
  "Nyashinski - Too Much",
  "Eminem - Lose Yourself",
  "Linkin Park - Numb",
  "Coldplay - Fix You",
  "Queen - Bohemian Rhapsody",
  "Drake - God's Plan",
  "Ed Sheeran - Shape of You",
  "Adele - Someone Like You",
  "Imagine Dragons - Believer",
  "Taylor Swift - Shake It Off",
  "Maroon 5 - Sugar",
  "Justin Bieber - Love Yourself",
  "Katy Perry - Roar",
  "Bruno Mars - Just the Way You Are",
  "Michael Jackson - Thriller",
  "The Beatles - Hey Jude",
  "Nirvana - Smells Like Teen Spirit",
  "Bob Dylan - Like a Rolling Stone",
  "Led Zeppelin - Stairway to Heaven",
  "U2 - With or Without You"
];


const Request = () => {
  const [song, setSeachSong] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')

  const handleFetchData = (query) => {
    setLoading(true)
    const filteredResults = sampleData.filter((result) =>
      result.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
    setIsOpen(false)
  };

  const handleCloseDetails = () => {
    setSelectedResult(null);
    setIsOpen(true);
  };

  const handleRequest = () => {
    setLoading(true)
    const formData=selectedResult; 
    MakeRequest(formData);
    setTimeout(() => {
      setLoading(false)      
    }, 1000);
  };

  return (
    <div>
      <div className="search-results">
        {searchResults.map((result, index) => (
          <div key={index} className="result" onClick={() => handleResultClick(result)}>
            {result}
          </div>
        ))}
      </div>

      {isOpen ? (
        <div className={`search-input-container ${isOpen ? 'open' : ''}`}>
          <Input 
            type='text' 
            id="searchsong" 
            name="searchsong" 
            labelText="Search Music" 
            required={true} 
            value={song} 
            onChange={(name, value) => setSeachSong(value)} 
            error={''}
          />
          <div className='fetch-btn' onClick={() => handleFetchData(song)}>{loading ? (<LoadingButton loading={loading} error={error} text={''} onClick={()=>{return null}}/>): (<Icon name='search' size='30px'/>)}</div>
        </div>
      ) : (
        <div className='search-btn' onClick={() => setIsOpen(true)}><Icon name='search' size='30px'/></div>
      )}

      {selectedResult && (
        <div className={`result-details ${selectedResult ? 'slide-in' : 'slide-out'}`}>
          <Icon onClick={handleCloseDetails} name='close' size='30px'/>
          <div className="details">
            <div>{selectedResult}</div>
          </div>
          <LoadingButton onClick={handleRequest} text ={'Request'} error={error} loading={loading} disabled={false} />
      </div>
      )}

        
      

      <style jsx>{`
        .search-input-container {
          width: 0;
          transition: width 0.5s ease;
          margin: 10px;
          position: fixed;
          bottom: 30px;
          right: 0;
          background: var(--txt-opp);
          transform-origin: right;
          display: flex;
          align-items: center;
        }
        .fetch-btn {
          position: absolute;
          right: 0;
          background:red;
        }
        .search-input-container.open {
          width: calc(100% - 20px);
          opacity:1;
          box-shadow: 0px 4px 8px var(--shadow);
        }

        .search-btn {
          position: fixed;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: var(--txt-opp);
          display: grid;
          place-items: center;
          bottom: 30px;
          right: 30px;
          border:2px solid var(--txtc);
        }
        .search-results {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          min-height: 100%;
        }
        .result {
          cursor: pointer;
          padding: 5px;
          margin: 10px;
          border-bottom:2px dashed var(--txtc);
        }
        .result-details {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: white;
          padding: 10px;
          border-top: 1px solid #ccc;
          animation-duration: 0.5s;
          animation-timing-function: ease;
          height:fit-content;
        }
        .details {
          margin-bottom: 10px;
        }
        button {
          margin-right: 10px;
        }
        .slide-in {
          animation-name: slideIn;
        }
        .slide-out {
          animation-name: slideOut;
        }

        @keyframes slideIn {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes slideOut {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Request;
