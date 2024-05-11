import { useState, useEffect } from 'react';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const listener = (event) => {
      setMatches(event.matches);
    };

    mediaQueryList.addListener(listener);

    return () => mediaQueryList.removeListener(listener);
  }, [query]);

  return matches;
}

function App() {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <div>
      <h1>Responsive Design Example</h1>
      <p>Is Mobile: {isMobile ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default App;
