import React, {useState, useEffect} from 'react';
import Styles from './goToTop.module.css';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.pageYOffset > 200);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      style={{
        display: isVisible ? 'block' : 'none',
      }}
      className={Styles.go_to_top_button}
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
      ⬆
    </button>
  );
};

export default GoToTopButton;
