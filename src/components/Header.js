import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Common.css';
import '../css/Header.css';

const Header = ({ menuItems, loading, logo, favicon }) => {
  return (
    <header className='site_header'>
      <div className='container'>
        <div className="d_site_header_inner">
          {/* ✅ Logo */}
          <div className='d_logo'>
            <Link to="/">
              {logo ? <img src={logo} alt="Site Logo" /> : <p>Loading Logo...</p>}
            </Link>
          </div>

          {/* ✅ Menu */}
          {loading ? (
            <p>⏳ Loading menu...</p>
          ) : menuItems.length > 0 ? (
            <ul className='d_main_menu'>
              {menuItems.map((item) => {
                let pageSlug = new URL(item.url).pathname.replace(/^\/page\//, '').replace(/^\/+|\/+$/g, ''); // ✅ "/page/" remove किया

                return (
                  <li key={item.id}>
                   <Link to={`/${pageSlug}`}>  
                      {item.acf && item.acf.menu_icon && (
                        <img src={item.acf.menu_icon} alt={item.title.rendered} width="20" height="20" />
                      )}
                      <span>{item.title.rendered}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>⚠ No menu items found.</p>
          )}

          {/* ✅ Email Section */}
          <div className='d_mail'>
            <a href="mailto:hello@darshboard.com" className="d_mail_box">
              <img alt="Email Icon" src="https://darshboard.com/wp-content/uploads/2025/03/email_icon.svg" />
              <span>hello@darshboard.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* ✅ Favicon */}
      {favicon && <link rel="icon" href={favicon} type="image/png" />}
    </header>
  );
};

export default Header;
