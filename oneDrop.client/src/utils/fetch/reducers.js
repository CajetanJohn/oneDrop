// actions.js

import axios from 'axios';

export const fetchUserData = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/user/${userId}`);
    dispatch({ type: 'FETCH_USER_DATA_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_USER_DATA_FAILURE', payload: error.message });
  }
};

// Similar actions for Settings and SongsRequest

// reducers.js

const initialState = {
  user: null,
  settings: null,
  songsRequest: null,
  error: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_DATA_SUCCESS':
      return { ...state, user: action.payload.user, settings: action.payload.settings, songsRequest: action.payload.songsRequest, error: null };
    case 'FETCH_USER_DATA_FAILURE':
      return { ...state, user: null, settings: null, songsRequest: null, error: action.payload };
    // Similar cases for other actions
    default:
      return state;
  }
};

export default rootReducer;
