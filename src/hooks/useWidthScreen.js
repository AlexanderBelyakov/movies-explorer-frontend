import { useEffect, useCallback, useState } from 'react';

function useWidthScreen() {

  const getWidth = useCallback(() => window.innerWidth, []);
    
  const [screenWidth, setScreenWidth] = useState(getWidth());
  

  useEffect(() => {
    function handleChangeScreenWidth() {
        setScreenWidth(getWidth());
      };

    window.addEventListener('resize', resizeController, false); 

    let timeResize;

    function resizeController() {
        if (!timeResize) {
            timeResize = setTimeout(() => {
                timeResize = null;
            handleChangeScreenWidth();
        }, 1000); 
        }
    };

    return () => window.removeEventListener('resize', resizeController); 
  }, [getWidth]);

  return screenWidth;
}

export default useWidthScreen;