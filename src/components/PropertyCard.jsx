import React from "react";

const PropertyCard = ({ property }) => (
  <div className="property-card">
    <div className="image-container">
      <div className="opendoor-badge">
        <img src="/logo/mobilelogo.svg" alt="Opendoor" width={8} height={10} />
        Opendoor
      </div>
      <button className="favorite-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
    </div>
    <div className="content">
      <h2 className="price text-1">${property.userData.askingPrice}</h2>
      <p className="details text-875">
        {property?.zillowData?.bedrooms}bd {property?.zillowData?.bathrooms}ba {property?.zillowData?.livingAreaValue}ft²
      </p>
      <p className="address text-875">{property.address.formattedAddress}</p>
      <p className="location text-875">
        {property.address.county}, {property.address.stateCode}
      </p>
    </div>
  </div>
);

export default PropertyCard;
