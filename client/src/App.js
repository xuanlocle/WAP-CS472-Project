import './App.css';
import HeaderComponent from './components/header.js';
import FooterComponent from './components/footer.js';
import SearchComponent from './components/searchComponent.js';
import { useState } from 'react';
import PopularComponent from './components/popularComponent.js';

function App() {

  const [terms, setTerms] = useState([]);
  const [error, setError] = useState(null);

  async function handleOnPopularTermClick(query) {
    handleSearchTerm(query)
  }

  const handleSearchTerm = async (query) => {
    try {
      const response = await fetch(`http://localhost:3001/terms/search?query=${query}`);
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
