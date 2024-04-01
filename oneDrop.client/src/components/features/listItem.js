import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../assets/icons/icons';
import samplePhoto from '../../assets/images/sample.png';


const ListItem = ({ ...props }) => {
  const photo = samplePhoto;

  const [songName, setSongName] = useState('Nyashinski - Too much');
  const [songGenre, setSongGenre] = useState('Rap');
  const [paid, setPaid] = useState(true);
  const [totalMoney, setTotalMoney] = useState(200);
  const [totalRequest, setTotalRequest] = useState(2);
  const [requestClient, setRequestClient] = useState([]);
  const [message, setMessage] = useState('');
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const songNameRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const [textWidth, setTextWidth] = useState(null);

  useEffect(() => {
    if (props.initialSongName) setSongName(props.initialSongName);
    if (props.initialSongGenre) setSongGenre(props.initialSongGenre);
    if (props.initialPaid !== undefined) setPaid(props.initialPaid);
    if (props.initialTotalMoney) setTotalMoney(props.initialTotalMoney);
    if (props.initialTotalRequest) setTotalRequest(props.initialTotalRequest);
    if (props.initialRequestClient) setRequestClient(props.initialRequestClient);
    if (props.initialMessage) setMessage(props.initialMessage);
  }, [props]);

  useEffect(() => {
    const updateWidths = () => {
      if (songNameRef.current && songNameRef.current.parentNode) {
        setContainerWidth(songNameRef.current.parentNode.offsetWidth);
        setTextWidth(songNameRef.current.getBoundingClientRect().width);
      }
    };

    updateWidths();

    const handleResize = () => {
      updateWidths();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const shouldAnimate = textWidth > containerWidth;

    if (shouldAnimate) {
      const animationDuration = (textWidth / containerWidth) * 5;
      songNameRef.current.style.animationDuration = `${animationDuration}s`;
      songNameRef.current.style.animationName = 'marquee';
    } else {
      songNameRef.current.style.animationName = 'none';
    }
  }, [containerWidth, songName, textWidth]);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return ` --:--${text.substring(0, maxLength)} ...`;
  };

  const handleDropSong = () => {
    console.log('hello');
  };

  const handleShowMessage = () => {
    setIsMessageOpen(!isMessageOpen);
  };

  return (
    <div className={`list-container ${isMessageOpen ? 'message-open' : ''}`}>
      <div className={`list-image ${isMessageOpen ? 'message-open' : ''}`}></div>
      <div className={`list-item ${isMessageOpen ? 'message-open' : ''}`}>
        <div className='item-details'>
          <div className="song-details">
            <div className="song-name" ref={songNameRef} onClick={handleShowMessage}>{songName}</div>
            <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center' }} onClick={handleShowMessage}>
                {requestClient.length > 0 && !isMessageOpen ? (
                  <div>
                    {`${requestClient[0].name} and ${requestClient.length - 1} others`}
                  </div>
                ) : (
                  <div>{`messages : ${requestClient.length}`}</div>
                )}
              </div>

              <div className='stats'>
                {totalRequest > 1 && (
                  <Icon name='graph_up' fill="var(--a-txtc)">{totalRequest}</Icon>
                )}
                {paid && (
                  <Icon name='money' fill="var(--a-txtc)">{totalMoney}</Icon>
                )}
                  <Icon name='trash' onClick={handleDropSong} />
              </div>
            </div>
          </div>
        </div>

        {isMessageOpen && (
          <div className="message-details" onClick={handleShowMessage}>
            {requestClient.map((client, index) => (
              <div key={index} className="message-content">
                <span>{client.name}:</span>
                <span>{client.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .list-container {
          position: relative;
          overflow: hidden;
          max-width: calc(100% - 40px);
          margin: 10px 10px 15px 10px;
          padding: 10px;
          border: 2px solid var(--txtc);
          font-size: 0.9rem;
          border-radius: 8px;
          box-shadow: 0px 4px 8px var(--shadow);
          cursor: pointer;
        }
        .list-image.message-open {
          position: absolute;
          background-image: url(${photo});
          filter: blur(2px);
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--blend);
          background-size: contain;
          background-blend-mode: overlay;
        }
        .list-item {
          display: flex;
          overflow: hidden;
          justify-content: space-between;
          position: relative;
          flex-direction: column;
          background: none;
          color: var(--txtc);
        }
        .item-details {
          display: flex;
        }
        .song-details {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex-grow: 1;
          max-width: 100%;
        }
        .song-name {
          font-weight: bold;
          margin: 8px 0;
          white-space: nowrap;
          overflow: hidden;
          animation: marquee infinite linear;
          width: fit-content;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          10% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-110%);
          }
        }
        .client-details {
          margin-bottom: 8px;
        }
        .stats {
          display: flex;
          gap: 10px;
          float: right;
          margin: 0 0 0 auto;
        }
        .drop-button {
          cursor: pointer;
          color: red;
          margin-right: 10px;
        }
        .message {
          cursor: pointer;
          color: var(---txtc);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.8rem;
        }
        .message-details {
          width: 100%;
          border-radius: 4px;
          padding: 8px;
          animation: slide-down 0.3s ease;
        }
        .message-details .message-content {
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.8rem;
          border-bottom:1px dashed var(--txtc);
          margin-bottom:10px;
        }

        .close-button {
          margin-top: 8px;
          cursor: pointer;
        }
        @keyframes slide-down {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ListItem;
