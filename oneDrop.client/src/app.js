import React, { useState, useRef, useEffect } from 'react';
import SliverAppBar from './components/appbar';

const App = () => {
  const [isAppBarVisible, setAppBarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const userView = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 50;

      setAppBarVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div className='home-page'>
      <SliverAppBar isVisible={isAppBarVisible} />
      <div className='user-view' ref={userView}>
        <main className="main-content" style={{ maxHeight: '300vh' }}>
          Main Content
        </main>
      </div>

      <div className='bottom-nav'>
        Bottom Navigation Bar
      </div>
    </div>
  );
};

export default App;
