import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ImageComponent from './ImageComponent';
import '../css/Common.css';
import '../css/Header.css';

const Header = ({ menuItems = [], loading, logo }) => {
  const location = useLocation();

  // Hamburger toggle fix
useEffect(() => {
  const toggle = document.getElementById('toggle');
  if (!toggle) return;

  const handleClick = (e) => {
    // Agar toggle button pe click hua
    if (toggle.contains(e.target)) {
      toggle.classList.toggle('active');
    } 
    // Agar bahar click hua aur already active hai
    else if (toggle.classList.contains('active')) {
      toggle.classList.remove('active');
    }

    const isActive = toggle.classList.contains('active');

    if (isActive) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  };

  document.addEventListener('click', handleClick);

  return () => {
    document.removeEventListener('click', handleClick);
  };
}, []);



  return (
    <header className="site_header">
      <div className="container">
        <div className="d_site_header_inner">

          {/* Logo */}
          <div className="d_logo">
            <Link to="/">
              {loading ? (
                <span className="header-skeleton header-skeleton--logo" aria-hidden="true" />
              ) : logo ? (
                <img src={logo} alt="Site Logo" />
              ) : null}
            </Link>
          </div>

          {/* Hamburger */}
          <div id="toggle" className="d_hamburger_menu">
            <div id="nav-icon3">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Menu */}
          {loading ? (
            <ul className="d_main_menu d_main_menu--loading" aria-hidden="true">
              <li><span className="header-skeleton header-skeleton--pill" /></li>
              <li><span className="header-skeleton header-skeleton--pill" /></li>
              <li><span className="header-skeleton header-skeleton--pill" /></li>
            </ul>
          ) : menuItems.length > 0 ? (
            <ul className="d_main_menu">
              {menuItems.map((item, idx) => {
                const linkPath = item.url === '/about-me/' ? '/' : item.url;
                const isActive =
                  location.pathname === linkPath ||
                  (item.url === '/about-me/' && location.pathname === '/about-me/');

                return (
                  <li key={idx} className={isActive ? 'active' : ''}>
                    <Link to={linkPath}>
                      {item.icon && (
                        <span
                          className="menu_icon"
                          dangerouslySetInnerHTML={{
                            __html: `<img src="${item.icon}" alt="icon" />`,
                          }}
                        />
                      )}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : null}

          {/* Email Section */}
          <div className="d_mail">
            {loading ? (
              <div className="d_mail_box d_mail_box--loading" aria-hidden="true">
                <span className="header-skeleton header-skeleton--icon" />
                <span className="header-skeleton header-skeleton--text" />
              </div>
            ) : (
              <a href="mailto:hello@darshboard.com" className="d_mail_box">
                <ImageComponent imageId={54} />
                <span>hello@darshboard.com</span>
              </a>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
