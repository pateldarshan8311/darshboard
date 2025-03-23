import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // useLocation hook import karein
import ImageComponent from "./ImageComponent";
import '../css/Common.css';
import '../css/Header.css';

const Header = ({ menuItems, loading, logo, favicon }) => {
  const location = useLocation(); // Current URL ka pathname get karein

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
                let pageSlug = new URL(item.url).pathname.replace(/^\/page\//, '').replace(/^\/+|\/+$/g, '');

                // Current URL aur menu item ke URL ko compare karein
                const isActive = location.pathname === `/${pageSlug}` || 
                                (location.pathname === '/' && pageSlug === 'about-me'); // Homepage ke liye about-me ko active karein

                return (
                  <li key={item.id} className={isActive ? 'active' : ''}> {/* Active class apply karein */}
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
              <ImageComponent imageId={30} />
              <span>hello@darshboard.com</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;