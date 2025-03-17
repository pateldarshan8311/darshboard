import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Page from './components/Page';
import "./js/custom"; 
import './App.css';

const App = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logo, setLogo] = useState('');
  const [favicon, setFavicon] = useState('');

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://darshboard.com/wp-json/wp/v2/menu-items?menus=2', {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2RhcnNoYm9hcmQuY29tIiwiaWF0IjoxNzQxOTM5NjUxLCJuYmYiOjE3NDE5Mzk2NTEsImV4cCI6MTc0MjU0NDQ1MSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.CJbGRISPyraQOBVEQlhXUFFAFDOlFUAlieTEH81VgUw`,
          },
        });

        console.log('✅ Menu API Response:', response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          setMenuItems(response.data);
        } else {
          console.error('⚠ API returned an empty array or invalid data');
        }
      } catch (error) {
        console.error('❌ Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSiteInfo = async () => {
      try {
        const response = await axios.get('https://darshboard.com/wp-json/custom/v1/site-info/');
        console.log('✅ Site Info API Response:', response.data);
        setLogo(response.data.logo);
        setFavicon(response.data.favicon);
      } catch (error) {
        console.error('❌ Error fetching site info:', error);
      }
    };

    fetchMenuItems();
    fetchSiteInfo();
  }, []);

  return (
    <Router>
      <div className='page'>
        <Header menuItems={menuItems} loading={loading} logo={logo} favicon={favicon} />
        
        <Routes>
          <Route path="/" element={<MainContent />} />
          {/* ✅ Dynamic Page Routes */}
          {menuItems.map((item) => {
            let pageSlug = new URL(item.url).pathname.replace(/^\/page\//, '').replace(/^\/+|\/+$/g, ''); 
            console.log("✅ Generated Route:", `/${pageSlug}`); // ✅ Debugging
            return <Route key={item.id} path={`/${pageSlug}`} element={<Page />} />;
          })}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
