import './App.css';
import HeaderComponent from './components/header.js';
import FooterComponent from './components/footer.js';
import SearchComponent from './components/searchComponent.js';
import { useState } from 'react';
import PopularComponent from './components/popularComponent.js';
import { REACT_APP_SERVER, REACT_APP_DEFAULT_SERVER } from './config.js'

function App() {

  const [terms, setTerms] = useState([]);
  const [error, setError] = useState(null);

  const HOST = REACT_APP_SERVER || REACT_APP_DEFAULT_SERVER

  console.log(HOST)
  async function handleOnPopularTermClick(query) {
    handleSearchTerm(query)
  }

  const handleSearchTerm = async (query) => {
    try {
      const response = await fetch(`${HOST}/terms/search?query=${query}`);
      if (!response.ok) {
        throw new Error('Failed to search terms');
      }
      const data = await response.json();
      setError(null)
      setTerms(data); // Update state with the fetched terms
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <HeaderComponent />
      <SearchComponent terms={terms} error={error} onSearchTerm={handleSearchTerm} />
      <PopularComponent onPopularTermClick={handleOnPopularTermClick} />
      <FooterComponent />
    </>
  );
}

export default App;
