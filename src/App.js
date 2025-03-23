import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Page from './components/Page';
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
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2RhcnNoYm9hcmQuY29tIiwiaWF0IjoxNzQyNjU1MjU0LCJuYmYiOjE3NDI2NTUyNTQsImV4cCI6MTc0NTI0NzI1NCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImRhcnNhbnBhdGVsODMxMUBnbWFpbC5jb20iLCJyb2xlIjpbImFkbWluaXN0cmF0b3IiXSwiaXAiOiIxMTMuMTkzLjIwNy45MyJ9fX0.mQhf6yeYwmJsIDKfeh5B66a3oKSaEXdXu-1Eqv4wDKI`,
          },
        });

        console.log('✅ Menu API Response:', response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          setMenuItems(response.data);
        } else {
          console.error('⚠ API returned an empty array or invalid data');
        }
      } catch (error) {
        console.error('❌ Error fetching menu items:', error.response?.data || error);
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
          {/* Homepage route */}
          <Route path="/" element={<Page slug="about-me" />} />

          {/* Dynamic routes for menu items */}
          {menuItems.map((item) => {
            let pageSlug = new URL(item.url).pathname.replace(/^\//, '').replace(/\/$/, '');
            console.log("Generated Route:", `/${pageSlug}`);
            return <Route key={item.id} path={`/${pageSlug}`} element={<Page slug={pageSlug} />} />;
          })}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;