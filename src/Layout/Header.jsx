import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import { ContextData } from "../services/Context";

function Header() {
  const{wishlist}=useContext(ContextData)

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdownOnOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdownOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeDropdownOnOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("User");
    navigate("/login");
  };
  return (
    <>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box d-flex align-items-center justify-content-center">
              <a
                href={undefined}
                className="logo logo-light d-flex align-items-center"
              >
                <span className="logo-sm">
                  <img src="assets/images/Group.png" alt height={22} />
                </span>
                <span className="logo-lg">
                  <img src="assets/images/Group.png" alt height={17} />
                  <b>
                    <span
                      className="text"
                      style={{
                        color: "white",
                        fontSize: "15px",
                        marginLeft: "5px",
                      }}
                    >
                      E CKART
                    </span>
                  </b>
                </span>
              </a>
            </div>
            <button
              type="button"
              className="btn btn-sm px-3 font-size-16 header-item waves-effect"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>
          </div>
          <div className="d-flex">
            <div className="dropdown d-inline-block" ref={dropdownRef}>
              <button
                type="button"
                className="btn header-item waves-effect"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={isOpen ? "true" : "false"}
              >
                <a className="dropdown-item" >
                  <i className="bx bx-shopping-bag font-size-20 align-middle me-1 text-black" />
                  <span key="t-cart">Cart</span>
                </a>
              </button>
            </div>

            <div className="dropdown d-inline-block">
      <button
        type="button"
        className="btn header-item waves-effect"
        id="page-header-user-dropdown"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : "false"}
      >
        <a className="dropdown-item">
          <i className="bx bx-heart font-size-20 align-middle me-1 text-black" />
          <span key="t-wishlist">Wish List</span>
          {wishlist?.length > 0 && (
            <span className="badge bg-danger rounded-circle">
              {wishlist.length}
            </span>
          )}
        </a>
      </button>
    </div>

            <div className="dropdown d-inline-block" ref={dropdownRef}>
              <button
                type="button"
                className="btn header-item waves-effect"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={isOpen ? "true" : "false"}
              >
                <a className="dropdown-item text-danger" onClick={handleLogout}>
                  <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />{" "}
                  <span key="t-logout">Logout</span>
                </a>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
