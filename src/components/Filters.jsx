import React from "react";

const FilterDropdown = ({ showNewestDropdown, setShowNewestDropdown, filterType, setFilterType }) => (
  <div className="relative" onClick={() => setShowNewestDropdown(!showNewestDropdown)}>
    <div className="filter-newest pointer d-flex">
      <div className="newest">{filterType}</div>
      <img src="/icons/newest-arrow.svg" alt="newest arrow" />
    </div>

    {showNewestDropdown && (
      <div className="dropdown-menu-newest">
        <div className="dropdown-item-newest" onClick={() => setFilterType("All")}>All</div>
        <div className="dropdown-item-newest" onClick={() => setFilterType("Newest")}>Newest</div>
        <div className="dropdown-item-newest" onClick={() => setFilterType("Oldest")}>Oldest</div>
        <div className="dropdown-item-newest" onClick={() => setFilterType("Sold")}>Sold</div>
        <div className="dropdown-item-newest" onClick={() => setFilterType("Active")}>Active</div>
      </div>
    )}
  </div>
);

export default FilterDropdown;
