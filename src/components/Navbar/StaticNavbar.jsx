import React from 'react'
import { NAVIGATION_MENU } from '../../utils/constant'


const StaticNavbar = ({handleSearchOpen, setShowDropdown, showDropdown}) => {
  return (
    <>
                <div className="absolute d-block d-md-none">
                  <a
                    href="https://www.opendoor.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/logo/mobilelogo.svg" alt="" width={22} height={28} />
                  </a>
                </div>
                <div className="absolute d-md-block d-none">
                  <a
                    href="https://www.opendoor.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/logo/logo.svg" alt="" />
                  </a>
                </div>
                <div className="d-flex w-100 justify-content-center">
                  <div className="icon-hover d-md-block d-none" >
                    <div className="d-flex align-items-center gap-2" onClick={handleSearchOpen}>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        xmlns="http://www.w3.org/2000/svg"
                        
                        style={{ cursor: 'pointer' }}
                      >
                        <circle
                          fill="none"
                          stroke="#222222"
                          strokeWidth="2"
                          cx="6.5"
                          cy="6.5"
                          r="5.5"
                        ></circle>
                        <path
                          fill="#222222"
                          d="M10.58578644 9.17157288l4.24264068 4.24264068-1.41421356 1.41421356-4.24264068-4.24264068z"
                        ></path>
                      </svg>
                      <span className="text-6e6e6e">Search</span>
                    </div>
                  </div>
                  
                  <div className="pointer text-decoration-none">
                    <a
                      href="https://buy.opendoor.com/setup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none fw-light text-1 text-6e6e6e mobile-text-navbar ml-22 tablet-ml-0"
                    >
                      Recommended listings
                    </a>
                  </div>
                </div>

                <div className="d-flex absolute right-10">
                  <div className="text-decoration-none cursor-pointer d-md-block d-none">
                    <a
                      href="https://www.opendoor.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none text-6e6e6e fw-light text-1"
                    >
                      Also selling?
                    </a>
                  </div>
                  <div 
                    className="pointer d-md-block d-none position-relative ml-22"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <span className="text-6e6e6e text-1 fw-light">More </span>
                    <img src="/icons/arrow.svg" alt="" />
                    
                    <div className="position-absolute bg-white submenu" 
                      style={{
                        top: "40px",
                        left: "50%",
                        width: "150px",
                        padding: "25px",
                        marginLeft: "-75px",
                        visibility: showDropdown ? 'visible' : 'hidden',
                        opacity: showDropdown ? 1 : 0,
                      }}
                    >
                      <div className="submenu-arrow" />
                      
                      {NAVIGATION_MENU.map(({ label, url, id }) => (
                        <a
                          key={id}
                          href={url}
                          className="submenu-link"
                          data-testid={`nav-menu-${id}`}
                        >
                          {label}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="text-1 text-1c85e8 pointer sign-in-hover fw-bold mobile-text-navbar ml-22">
                    Sign in
                  </div>
                </div>
              </>
  )
}

export default StaticNavbar