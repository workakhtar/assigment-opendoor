import React, { useState, useEffect } from "react";
import "./../styles/components/listings.css";
import { PropertListing } from "../api/authApis";

const ITEMS_PER_PAGE = 10;

const Listing = () => {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showNewestDropdown, setShowNewestDropdown] = useState(false);
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);

  const GetListing = async () => {
    setLoading(true);
    try {
      const response = await PropertListing.getListing();
      if (response.data.success) {
        setListing(response.data.deals);
        setTotalPages(Math.ceil(response.data.deals.length / ITEMS_PER_PAGE));
      }
    } catch (error) {
      console.log("Failed to get the Property lists", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetListing();
  }, []);

  // Paginate the listings
  const paginatedListings = listing.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Dynamic Pagination Logic
  const maxPageNumbers = 5;
  let startPage =
    Math.floor((currentPage - 1) / maxPageNumbers) * maxPageNumbers + 1;
  let endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);

  return (
    <div>
      <div className="right-pane">
        <div className="filters-space">
          <div className="filters-title">
            <h1 className="text-1">Homes for sale in Tampa</h1>
            <div className="text-875 count">
              {listing.length} listings found — Listed on the MLS.
            </div>
          </div>
          <div className="filter-container d-flex ">
            <div className="relative" onClick={() => setShowNewestDropdown(!showNewestDropdown)}>
              <div className="filter-newest pointer d-flex">
                <div className="newest">Newest</div>
                <img src="/icons/newest-arrow.svg" alt="newest arrow" />
              </div>
            
                {showNewestDropdown && (
                    <div className="dropdown-menu-newest">
                      <div className="dropdown-item">Newest</div>
                      <div className="dropdown-item">Lowest Price</div>
                      <div className="dropdown-item">Highest Price</div>
                      <div className="dropdown-item">Smallest</div>
                      <div className="dropdown-item">Largeest </div>
                    </div>
                  )}
          
              
            </div>
            <div className="relaive">
            <div className="more-filters pointer">
              <img src="/icons/more-filters.svg" alt="" />
              <div className="more">More Filters</div>
            </div>
            </div>
          </div>
        </div>

        <div className="cards">
          {loading ? (
            <p>Loading...</p>
          ) : (
            paginatedListings.map((property, index) => (
              <div className="property-card" key={index}>
                <div className="image-container">
                  <div className="opendoor-badge">
                    <img
                      src="/logo/mobilelogo.svg"
                      alt=""
                      width={8}
                      height={10}
                    />
                    Opendoor
                  </div>
                  <button class="favorite-button">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
                <div className="content">
                  <h2 className="price">${property.userData.askingPrice}</h2>
                  <p className="details">
                    {property?.zillowData?.bedrooms}bd{" "}
                    {property?.zillowData?.bathrooms}ba{" "}
                    {property?.zillowData?.livingAreaValue}ft²
                  </p>
                  <p className="address">{property.address.formattedAddress}</p>
                  <p className="location">
                    {property.address.county}, {property.address.stateCode}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-control">
            <button
              className="prev"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              prev
            </button>

            <div className="pag-number">
              {Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => startPage + i
              ).map((page) => (
                <button
                  key={page}
                  className={`pag-single-number ${
                    page === currentPage ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              className="next"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listing;