import React, { useState, useEffect } from "react";
import "./../styles/components/listings.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../Reduxtoolkit/slice/listing";
import PropertyCard from "./PropertyCard";
import FilterDropdown from "./Filters";



const ITEMS_PER_PAGE = 10;

const Listing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showNewestDropdown, setShowNewestDropdown] = useState(false);
  const [filterType, setFilterType] = useState("All");

  const dispatch = useDispatch();
  const { listings, loading, error } = useSelector((state) => state.listings);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);
  

  useEffect(() => {
    if (listings) {
      setTotalPages(Math.ceil(filteredListings.length / ITEMS_PER_PAGE));
    }
  }, [listings, filterType]);

  // Filter the listings based on the selected filter
  const filteredListings = listings
  .filter((property) => {
    if (filterType === "Active") {
      return !property.zillowData?.dateSold;
    } else if (filterType === "Sold") {
      return property.zillowData?.dateSold;
    }
    return true;
  })
  .filter((property) => property.zillowData?.yearBuilt) // Remove properties with null yearBuilt
  .sort((a, b) => {
    if (filterType === "Newest") {
      return b.zillowData.yearBuilt - a.zillowData.yearBuilt; 
    } else if (filterType === "Oldest") {
      return a.zillowData.yearBuilt - b.zillowData.yearBuilt; 
    }
    return 0; 
  });

  // Paginate the listings
  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Dynamic Pagination Logic
  const maxPageNumbers = 5;
  let startPage =
    Math.floor((currentPage - 1) / maxPageNumbers) * maxPageNumbers + 1;
  let endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="right-pane">
        <div className="filters-space">
          <div className="filters-title">
            <h1 className="text-1">Homes for sale in Tampa</h1>
            <div className="text-875 count">
              {filteredListings.length} listings found — Listed on the MLS.
            </div>
          </div>
          <div className="filter-container d-flex ">
          <FilterDropdown 
              showNewestDropdown={showNewestDropdown} 
              setShowNewestDropdown={setShowNewestDropdown} 
              filterType={filterType} 
              setFilterType={setFilterType} 
            />

          </div>
        </div>

        <div className="cards">
          {loading ? (
            <p>Loading...</p>
          ) : (
            paginatedListings.map((property, index) => (
            <div >
               <PropertyCard property={property} key={index} />
              {index ===1 && (
                <div className="property-card p-10">
                    <h1 className="text-1">Make your strongest offer when you buy with Opendoor</h1>
                </div>
              )}
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