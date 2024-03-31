import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000'; // Update with your server endpoint

function App() {
  const [documents, setDocuments] = useState([]);
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    // Initiate the socket connection when the component mounts
    fetch('http://localhost:5000/fetchMusicRequests', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error initiating socket connection:', error);
      });

    // Fetch initial documents
    socket.on('documents', (data) => {
      console.log(data);
      setDocuments(data);
    });

    // Update documents on real-time changes
    socket.on('documents', (data) => {
      console.log(data);
      setDocuments(data);
    });

    return () => {
      // Clean up the socket connection
      // socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Real-time MongoDB Documents</h1>
      <ul>
        {documents.map((document) => (
          <li key={document._id}>
            <strong>{document.title}:</strong> {document.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
