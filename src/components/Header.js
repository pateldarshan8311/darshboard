import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ImageComponent from './ImageComponent';
import '../css/Common.css';
import '../css/Header.css';

const Header = ({ menuItems = [], loading, logo, favicon }) => {
  const location = useLocation();

  // Dynamically update the favicon
  useEffect(() => {
    if (favicon) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = favicon;
    }
  }, [favicon]);

  // Hamburger toggle fix
  useEffect(() => {
    const toggle = document.getElementById('toggle');
    if (!toggle) return;

    const handleClick = () => {
      toggle.classList.toggle('active');
    };

    toggle.addEventListener('click', handleClick);

    return () => {
      toggle.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <header className="site_header">
      <div className="container">
        <div className="d_site_header_inner">

          {/* Logo */}
          <div className="d_logo">
            <Link to="/">
              {logo ? <img src={logo} alt="Site Logo" /> : null}
            </Link>
          </div>

          {/* Hamburger */}
          <div id="toggle" className="d_hamburger_menu">
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z"
                fill="#fff"
              />
            </svg>
          </div>

          {/* Menu */}
          {loading ? null : menuItems.length > 0 ? (
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
            <a href="mailto:hello@darshboard.com" className="d_mail_box">
              <ImageComponent imageId={54} />
              <span>hello@darshboard.com</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
