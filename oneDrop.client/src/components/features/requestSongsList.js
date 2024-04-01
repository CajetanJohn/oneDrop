import React, { useState, useEffect, useRef } from 'react';
import ListItem from './listItem';
import Icon from '../../assets/icons/icons';

const requestSongs = [
    {
      songName: "Nyashinski - Too Much",
      songGenre: 'Rap',
      cover: '',
      requestClient: [
        {
          name: 'Cajetan John',
          paid: 100,
          message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa."
        }
      ]
    },
    {
      songName: "Eminem - Lose Yourself",
      songGenre: 'Hip Hop',
      cover: '',
      requestClient: [
        {
          name: 'John Doe',
          paid: 150,
          message: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam."
        },
        {
          name: 'Alice Smith',
          paid: 200,
          message: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system."
        }
      ]
    },
    {
      songName: "Linkin Park - Numb",
      songGenre: 'Rock',
      cover: '',
      requestClient: [
        {
          name: 'Jane Doe',
          paid: 80,
          message: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident."
        },
        {
          name: 'Robert Johnson',
          paid: 120,
          message: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
        },
        {
          name: 'Emily Brown',
          paid: 90,
          message: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"
        }
      ]
    },
    {
      songName: "Coldplay - Fix You",
      songGenre: 'Alternative Rock',
      cover: '',
      requestClient: [
        {
          name: 'Michael Clark',
          paid: 110,
          message: "But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
        },
        {
          name: 'Sarah Johnson',
          paid: 130,
          message: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure."
        }
      ]
    },
    {
      songName: "Queen - Bohemian Rhapsody",
      songGenre: 'Rock',
      cover: '',
      requestClient: [
        {
          name: 'Daniel White',
          paid: 95,
          message: "To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?"
        },
        {
          name: 'Olivia Brown',
          paid: 85,
          message: "But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
        }
      ]
    },
    {
      songName: "Drake - God's Plan",
      songGenre: 'Hip Hop',
      cover: '',
      requestClient: [
        {
          name: 'Lucas Wilson',
          paid: 120,
          message: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment."
        },
        {
          name: 'Sophia Martinez',
          paid: 100,
          message: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
        },
        {
          name: 'Ethan Thompson',
          paid: 150,
          message: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system."
        }
      ]
    },
    {
      songName: "Ed Sheeran - Shape of You",
      songGenre: 'Pop',
      cover: '',
      requestClient: [
        {
          name: 'Mia Garcia',
          paid: 140,
          message: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure."
        }
      ]
    },
    {
      songName: "Adele - Someone Like You",
      songGenre: 'Pop',
      cover: '',
      requestClient: [
        {
          name: 'Noah Harris',
          paid: 105,
          message: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident."
        },
        {
          name: 'Ella Wilson',
          paid: 125,
          message: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam."
        },
        {
          name: 'William Davis',
          paid: 90,
          message: "But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
        }
      ]
    },
    {
      songName: "Imagine Dragons - Believer",
      songGenre: 'Pop Rock',
      cover: '',
      requestClient: [
        {
          name: 'Chloe Anderson',
          paid: 110,
          message: "To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?"
        },
        {
          name: 'Logan Miller',
          paid: 120,
          message: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system."
        }
      ]
    },
    {
      songName: "Taylor Swift - Shake It Off",
      songGenre: 'Pop',
      cover: '',
      requestClient: [
        {
          name: 'Ava Brown',
          paid: 130,
          message: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure."
        },
        {
          name: 'Jack Wilson',
          paid: 115,
          message: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident."
        }
      ]
    },
    {
      songName: "Maroon 5 - Sugar",
      songGenre: 'Pop Rock',
      cover: '',
      requestClient: [
        {
          name: 'Sophie Martin',
          paid: 95,
          message: "But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
        },
        {
          name: 'Jacob Thompson',
          paid: 125,
          message: "To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?"
        }
      ]
    },
    {
      songName: "Justin Bieber - Love Yourself",
      songGenre: 'Pop',
      cover: '',
      requestClient: [
        {
          name: 'Sophia Brown',
          paid: 115,
          message: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
        },
        {
          name: 'Oliver Wilson',
          paid: 105,
          message: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
        },
        {
          name: 'Emma Davis',
          paid: 120,
          message: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam."
        }
      ]
    },
    {
      songName: "Katy Perry - Roar",
      songGenre: 'Pop',
      cover: '',
      requestClient: [
        {
          name: 'Liam Brown',
          paid: 110,
          message: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment."
        },
        {
          name: 'Mia Wilson',
          paid: 130,
          message: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system."
        },
        {
          name: 'Noah Johnson',
          paid: 95,
          message: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
        }
      ]
    },
    {
      songName: "Bruno Mars - Just the Way You Are",
      songGenre: 'Pop',
      cover: '',
      requestClient: [
        {
          name: 'Ella White',
          paid: 100,
          message: "To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?"
        },
        {
          name: 'David Anderson',
          paid: 120,
          message: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
        }
      ]
    }
  ];

  
  const RequestSongsList = () => {
    const [sortBy, setSortBy] = useState('totalMoney');
    const [sortOrder, setSortOrder] = useState('desc');
    const [sortedSongs, setSortedSongs] = useState([]);
  
    useEffect(() => {
      const sortSongsByTotalMoney = () => {
        const sorted = [...requestSongs].sort((a, b) => {
          const totalMoneyA = a.requestClient.reduce((acc, client) => acc + client.paid, 0);
          const totalMoneyB = b.requestClient.reduce((acc, client) => acc + client.paid, 0);
          return sortOrder === 'desc' ? totalMoneyB - totalMoneyA : totalMoneyA - totalMoneyB;
        });
        setSortedSongs(sorted);
      };
  
      const sortSongsByTime = () => {
        const sorted = [...requestSongs].sort((a, b) => {
          const elapsedTimeA = calculateElapsedTime(a.time);
          const elapsedTimeB = calculateElapsedTime(b.time);
          return sortOrder === 'desc' ? elapsedTimeB - elapsedTimeA : elapsedTimeA - elapsedTimeB;
        });
        setSortedSongs(sorted);
      };
  
      const calculateElapsedTime = (startTime) => {
        const currentTime = new Date();
        const elapsedTime = currentTime.getTime() - new Date(startTime).getTime();
  
        const seconds = Math.floor(elapsedTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(weeks / 4);
        const years = Math.floor(months / 12);
  
        return `${years} years ${months % 12} months ${weeks % 4} weeks ${days % 7} days ${hours % 24} hours ${minutes % 60} minutes ${seconds % 60} seconds`;
      };
  
      if (sortBy === 'time') {
        sortSongsByTime();
      } else {
        sortSongsByTotalMoney();
      }
    }, [sortBy, sortOrder]);
  
    const handleSort = (criteria) => {
      if (sortBy === criteria) {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortBy(criteria);
        setSortOrder('desc');
      }
    };
  
    return (
      <div>
        <div>
          {/* Pass sorting options to the SortButton component */}
          <SortButton criteria="totalMoney" sortOrder={sortOrder} handleSort={handleSort} />
          <SortButton criteria="totalRequests" sortOrder={sortOrder} handleSort={handleSort} />
          <SortButton criteria="time" sortOrder={sortOrder} handleSort={handleSort} />
        </div>
        <div>
          {sortedSongs.map((song, index) => (
            <ListItem
              key={index}
              initialSongName={song.songName}
              initialSongGenre={song.songGenre}
              initialTotalMoney={song.requestClient.reduce((total, client) => total + client.paid, 0)}
              initialPaid={song.requestClient.map((client) => client.paid).reduce((acc, curr) => acc + curr, 0)}
              initialTotalRequest={song.requestClient.length}
              initialRequestClient={song.requestClient}
              initialMessage={song.requestClient.map((client) => client.message).join(', ')}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default RequestSongsList;
  







  export const SortButton = ({ criteria, sortOrder, handleSort }) => {
    const [isOpen, setIsOpen] = useState(false);
    const sortButtonRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (sortButtonRef.current && !sortButtonRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const toggleSortOptions = () => {
      setIsOpen(!isOpen);
    };
  
    const handleSortClick = (criteria) => {
      handleSort(criteria);
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    };
  
    return (
      <div  ref={sortButtonRef} >
        {isOpen ? (
          <div className="sorting-options">
            <div onClick={() => handleSortClick(criteria)}>Sort by {criteria}</div>
            <div onClick={() => handleSortClick('totalRequests')}>Sort by Total Requests</div>
            <div onClick={() => handleSortClick('time')}>Sort by Time</div>
          </div>
        ) : (
          <button className="sort-btn" onClick={toggleSortOptions}>
            {sortOrder === 'asc' ? (<Icon size="40px"  name="ascending">sort</Icon>) : (<Icon size="40px" name="descending">sort</Icon>)}
          </button>
        )}
        <style jsx>{`
          .sort-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            z-index: 1;
            box-shadow: inset 0px 4px 8px var(--shadow);
            background: var(--txt-opp);
            
          }
  
          .sorting-options {
            position: fixed;
            background: var(--txt-opp);
            border: 2px solid var(--txtc);
            padding: 5px;
            z-index: 1;
            bottom: 30px;
            right: 30px;
            box-shadow: inset 0px 4px 8px var(--shadow);
          }
  
          .sorting-options div {
            cursor: pointer;
            padding: 5px;
          }
        `}</style>
      </div>
    );
  };
  

