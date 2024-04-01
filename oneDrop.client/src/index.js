import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utils/services/store.js';
import App from './app';
import SignUp from './pages/registration/signUp.js';
import SignIn from './pages/registration/signIn.js';
import Calendar from './containers/calendar/eventCalendar.js';
import EventList from './containers/eventList.js';
import './assets/style/style.css';
import './assets/style/globals.css';
import './assets/style/registration.css'
import ListItem from './components/features/listItem.js';
import RequestSongsList from './components/features/requestSongsList.js';

const NavigateToApp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to '/app' on component mount (initial load)
    navigate('/app');
  }, [navigate]);

  
  return null; // This component doesn't render anything
};

const RootApp = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/app/*" element={<RequestSongsList/>}/>
          <Route path="/listing" element={<EventList />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/" element={<NavigateToApp />} />
        </Routes>
      </Router>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootApp />);
