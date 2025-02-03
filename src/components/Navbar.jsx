import React, {useEffect} from "react";
import "./../styles/components/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../Reduxtoolkit/slice/listing";
import StaticNavbar from "./Navbar/StaticNavbar";
import SearchBar from "./Navbar/SearchBar";


const Navbar = () => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const { listings, loading, error } = useSelector((state) => state.listings);

  const dispatch = useDispatch();
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);
  useEffect(() => {
    const handlePopState = () => {
      setShowSearch(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  const handleSearchOpen = () => {
    window.history.pushState({ search: true }, '');
    setShowSearch(true);
  };
  const handleSearchClose = () => {
    window.history.back();
    setShowSearch(false);
    setSearchValue('');
    setSearchResults([]);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleSearchClose();
    }
  };
  const handleSearch = (value) => {
    setSearchValue(value);
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }
    const filteredResults = listings.filter(listing => {
      const searchTerm = value?.toLowerCase();
      return (
        (listing?.address?.formattedAddress?.toLowerCase() || '').includes(searchTerm) ||
        (listing?.address?.state?.toLowerCase() || '').includes(searchTerm)
      );
    });
    setSearchResults(filteredResults);
  };
  const highlightText = (text, searchTerm) => {
    if (!text || !searchTerm) return text;
    
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() 
        ? <span key={index} style={{ color: '#000', fontWeight: '700' }}>{part}</span>
        : part
    );
  };
  
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <header className={`bg-FFFFFF ${!showSearch ? 'header-shadow' : ''}`} style={{ position: 'relative', zIndex: 1000 }}>
        <div className="navbar-space">
          <div className="d-flex justify-content-between align-items-center relative h-78">
            {!showSearch ? (
              <StaticNavbar handleSearchOpen={handleSearchOpen}  setShowDropdown={setShowDropdown} showDropdown={showDropdown} />
            ) : (
              <SearchBar 
              handleSearchClose={handleSearchClose}  
              searchValue={searchValue} 
              handleSearch={handleSearch}
              handleKeyDown={handleKeyDown}
              loading={loading}
              searchResults={searchResults}
              setHoveredIndex={setHoveredIndex}
              hoveredIndex={hoveredIndex}
              highlightText={highlightText}
              />
            )}
          </div>
        </div>
      </header>
      {showSearch && (
        <div className="search-close"
          onClick={handleSearchClose}
        />
      )}
    </>
  );
};
export default Navbar;