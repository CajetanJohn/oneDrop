//
import React, { useState, useRef, useEffect } from 'react';
import Input from '../common/input';
import { LoadingButton } from '../common/button';
import Icon from '../../assets/icons/icons';
import MakeRequest from '../../utils/services/apis/makeRequest';
import { searchSong } from '../../utils/services/apis/searchMusic';
import TextArea from '../common/textarea';
import Loading from '../common/loading';
import AudioPlayer from './audioPlayer';
import ButtonModal from './bottomModal';

const Request = () => {
  const [song, setSearchSong] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [feedBack, setFeedBack] = useState('');
  const [fetching, setFetching] = useState(false);
  const searchResultsRef = useRef(null);

  const handleFetchData = async (query) => {
    if (query === '') {
      setError('Input cannot be empty')
      return null;
    }
    setFetching(true);
    
    try {
      const result = await searchSong(query);
      setFetching(false);
      setSearchResults(result);
      setError('')
    } catch (error) {
      setFetching(false);
      setError(error);
    }
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
    setIsOpen(false)
  };

  const handleCloseDetails = () => {
    setSelectedResult(null);
    setIsOpen(true);
  };

  const handleRequest = async () => {
    setLoading(true)
    const formData = {
      song: {
        name: `${selectedResult.artist.name} - ${selectedResult.title}`,
        image: selectedResult.artist.picture,
        paid: 100,
        message: message,
        requestClient: 'cajetan John',
      }
    }; 

    try {
      const result = await MakeRequest(formData);
      setLoading(false);
      setFeedBack(result.message);
      setError('')
    } catch (error) {
      setLoading(false);
      setError(error.message)
    }
  };


  const handleScroll = () => {
    console.log('searchResultsElement');
    setIsOpen(false);
  };

  

  return (
    <div className='request-container'> 
      {fetching ? (
        <div className='dialog-page'><Loading loading={fetching} /></div>          
      ) : (
        searchResults.length > 0 ? (
          <div className='results-display' onScroll={handleScroll}>
            <ul className="search-results" ref={searchResultsRef} >
              {searchResults.map((song) => (
                <li className='result' key={song.id} onClick={() => handleResultClick(song)}>
                  {song.title} - {song.artist.name}
                </li>
              ))}
            </ul>
          </div>
          
        ) : (
          <div className='dialog-page'> search music to request</div>
        )
      )}

      {isOpen ? (
        <div className={`search-input-container ${isOpen ? 'open' : ''}`}>
          <Input type='text' id="searchsong" name="searchsong" labelText="Search Music" required={true} value={song} onChange={(name, value) => setSearchSong(value)} error={''}/>
          <div className='fetch-btn' onClick={() => handleFetchData(song)}>
          <Icon name='search' size='30px'/>
          </div>
        </div>
      ) : (
        <div className='search-btn' onClick={() => setIsOpen(true)}>
          <Icon name='search' size='30px'/>
        </div>
      )}

      {selectedResult && (
        <ButtonModal className='result-details' style={{ backgroundImage: `url(${selectedResult.artist.picture})` }}  isOpen={isOpen}>
          <Icon onClick={handleCloseDetails} name='close' size='30px' />
          <div className="details">
            <div>{selectedResult.artist.name} - {selectedResult.title}</div>
            <div className='player'> <AudioPlayer url={selectedResult.preview} image={selectedResult.artist.picture}/> </div>
          </div>
          
          <TextArea type='text' 
            id="message" 
            name="message" 
            labelText="What message would you like to pass out?"
            value={''} 
            onChange={(value) => setMessage(value)} 
            error={''}/>
          <LoadingButton feedBack={feedBack} onClick={handleRequest} text={'Request'} error={error} loading={loading} disabled={false} />
  </ButtonModal>
      )}

<style jsx>{`
.results-display{
  position:relative;
  max-height:100vh;
  height:100vh;
  width:100%;
  overflow-y:auto;
}
      .player{
        width:60px !important;
        height:60px !important;
        cursor:pointer;
      }
      .dialog-page{
        display:grid;
        place-items:center;
        width:100%;
        height:100vh;
        color:var(--txtc);
      }
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
          right: 10px;
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
          border:2px solid var(--txtc)
          
        }
        .search-results {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height:fit-content;
          list-style:none;
          padding:0;
          margin:0;
        }
        
        .result {
          cursor: pointer;
          padding: 5px;
          margin: 10px;
          border-bottom:2px dashed var(--txtc);
          color:var(--txtc);
        }
        .result-details {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: var(--txt-opp);
          padding: 10px;
          border-top: 1px solid #ccc;
          animation-duration: 0.5s;
          animation-timing-function: ease;
          height:fit-content;
          color:var(--txtc);
          background-size:cover;
          background-blend-mode:overlay;
          background-repeat:no-repeat;
        }
        .details {
          margin-bottom: 10px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          max-width:100%;
        }
      `}</style>
    </div>
  );
};

export default Request;






