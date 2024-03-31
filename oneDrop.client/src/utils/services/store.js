// store.js
import { createStore } from 'redux';

const initialState = {
    user: {
    _id: '65d14090c57b30a60b046109',
    name: 'John Doe',
    city: 'Example City',
    username: 'caji',
    email:'tester@gmail.com',
    role:'dj',
    phone:"0714886157",
    creationDate: '2024-02-16T00:20:26.324+00:00',
    events: [
        {
          id: '65cd45f0eeab0a5dba4428c5',
          date: '2024-02-17T20:00:00.000Z',
          ticket: {
            category: 'VIP',
            price: 50,
          },
          musicRequests: ['Song1', 'Song2', 'Song3'],
        },
        {
          id: '65d0084a3ba0125aa1f85ea9',
          date: '2024-02-10T00:00:00.000Z',
          ticket: {
            category: 'General Admission',
            price: 30,
          },
          musicRequests: ['Song4', 'Song5', 'Song6'],
        },
      ]    
  },
  allEvents: [{
  _id: "65d0084a3ba0125aa1f85ea9",
  eventDetails: {
    location: {
      coordinates: ["Latitude : -1.2683469", "Longitude : 36.8119706"],
      locationName: 'K1 club house',
    },
    date: '2024-02-10T00:00:00.000Z',
    time: '18:32',
    entranceFee: {
      isFree: true,
      options: [],
    },
  },
  appearances: [
    {
      id: "65d14090c57b30a60b046109",
      name: "John Doe",
    },
  ],
  configuration: {
    requests: [
      {
        music: {
          allowed: true,
          genre: "jazz",
          pricePerRequest: false,
          maxRequests: 500,
          totalRequest: 300,
        },
      },
    ],
    dressingCode: {
      attire: "all white",
    },
    stats: {
      guest: {
        //id: "65d14090c57b30a60b046109",
        id:"",
        state: "example_state",
        Request: [
          {
            music: {
              allowed: true,
              genre: "jazz",
              pricePerRequest: false,
              maxRequests: 500,
              totalRequest: 300,
            },
            Ticket: {
              category: "example_category",
              price: 50,
            },
          },
          // Add more requests as needed
        ],
      },
      total: 500,
      onSite: 250,
      remote: 250,
      eventLink: "www.google.com",
      linkSharingLimit: 2,
      totalLinkShares: 248,
      totalRevenue: 20000,
    },
  },
}],
userSpecificEvents:[

],
allRequests:[

],
userSpecificRequests:[

],
session:{
  _id: "1234-5678-91011",
},

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add any actions if needed
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
