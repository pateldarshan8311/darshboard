import React, { useState } from 'react';
import '../css/Header.css';
const Header = ({ menuItems, loading }) => {
  return (
    <header className='site_header'>
    <div className='container'>
      {loading ? (
        <p>⏳ Loading menu...</p>
      ) : menuItems.length > 0 ? (
        <ul className='d_main_menu'>
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.acf && item.acf.menu_icon && (
                <img src={item.acf.menu_icon} alt={item.title.rendered} width="20" height="20" />
              )}
              <a href={item.url}>{item.title.rendered}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>⚠ No menu items found.</p>
      )}
    </div>
    </header>
  );
};


export default Header;
