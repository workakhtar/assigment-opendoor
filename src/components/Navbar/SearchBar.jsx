import React from 'react'

const SearchBar = ({handleSearchClose,searchValue, handleSearch,handleKeyDown, loading, searchResults, setHoveredIndex, hoveredIndex, highlightText  }) => {
  return (
    <div><div className="d-flex w-100 align-items-center">
    <div className="icon-hover d-md-block d-none" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
      <div className="search-group-container d-flex align-items-center gap-2">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          xmlns="http://www.w3.org/2000/svg"
          style={{ cursor: 'pointer' }}
          onClick={handleSearchClose}
        >
          <circle fill="none" stroke="#222222" strokeWidth="2" cx="6.5" cy="6.5" r="5.5"></circle>
          <path fill="#222222" d="M10.58578644 9.17157288l4.24264068 4.24264068-1.41421356 1.41421356-4.24264068-4.24264068z"></path>
        </svg>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Address, city, zip"
            className="search-input animate-search"
            style={{
              width: '300px',
              padding: '8px 0',
              border: 'none',
              borderBottom: '1px solid transparent',
              fontSize: '15px',
              outline: 'none',
              backgroundColor: 'transparent',
              color: '#6e6e6e',
              transition: 'all 0.3s ease',
            }}
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="search-underline" />
      
      {searchValue && (
        <div className="search-results" style={{
          position: 'absolute',
          width: '400px',
          backgroundColor: 'white',
          borderRadius: '4px',
          marginTop: '8px',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          {loading ? (
            <div className="p-3 text-center">Searching...</div>
          ) : searchResults.length > 0 ? (
            <>
              <div>
                <div className="location text-muted text-12">LOCATIONS</div>
                {searchResults.map((result, index) => (
                  <div 
                    key={`loc-${index}`}
                    className="location cursor-pointer"
                    style={{ 
                      borderBottom: '1px solid #eee',
                      backgroundColor: hoveredIndex === `loc-${index}` ? '#f5f5f5' : 'transparent',
                      color: '#6e6e6e'
                    }}
                    onMouseEnter={() => setHoveredIndex(`loc-${index}`)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div>
                      {highlightText(result.address.formattedAddress, searchValue)}
                      {' '}
                      {highlightText(result.address.zipcode, searchValue)}, { highlightText(result.address.state, searchValue)}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="p-2 text-muted text-12">LISTINGS</div>
                {searchResults.map((result, index) => (
                  <div 
                    key={`list-${index}`}
                    className="p-3 cursor-pointer"
                    style={{ 
                      borderBottom: '1px solid #eee',
                      backgroundColor: hoveredIndex === `list-${index}` ? '#f5f5f5' : 'transparent',
                      color: '#6e6e6e'
                    }}
                    onMouseEnter={() => setHoveredIndex(`list-${index}`)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div>
                      {highlightText(result.address.formattedAddress, searchValue)}
                      {' '}
                      {result.userData.askingPrice && (
                        <span className="text-muted">
                          ${(result.userData.askingPrice / 1000).toFixed(1)}K
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-3 text-center">No results found</div>
          )}
        </div>
      )}
    </div>
  </div></div>
  )
}

export default SearchBar