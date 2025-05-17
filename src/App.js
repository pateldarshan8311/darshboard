import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Page from './components/Page';

function App() {
  const [siteData, setSiteData] = useState({
    logo: '',
    favicon: '',
    main_menu: [],
    pages: []
  });
  const [loading, setLoading] = useState(true);

  // Yahan apna naya token daalo:
  const JWT_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2RhcnNoYm9hcmQuY29tIiwiaWF0IjoxNzQ3NDIyMjc2LCJuYmYiOjE3NDc0MjIyNzYsImV4cCI6NDkwMTAyMjI3NiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.qAcZwVdMHPdw0byip-Kh8Ss6d8mzkncG_P82cnfI8JQ';

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`
          }
        };

        const [siteRes, pagesRes] = await Promise.all([
          axios.get('https://darshboard.com/wp-json/custom/v1/site-info', config),
          axios.get('https://darshboard.com/wp-json/wp/v2/pages?per_page=100', config)
        ]);
console.log("✅ siteRes.data:", siteRes.data); // <-- Add this line

      setSiteData({
  logo: siteRes.data.logo || '',
  favicon: siteRes.data.favicon || '',
  main_menu: Array.isArray(siteRes.data.main_menu) ? siteRes.data.main_menu : [],
  pages: Array.isArray(pagesRes.data) ? pagesRes.data : []
});
      } catch (err) {
        console.error('❌ App init error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) {
    return <div className="text-center p-10 text-xl">Loading site…</div>;
  }

  const aboutPage = siteData.pages.find(p => p.slug === 'about-me');

  return (
    <Router>
      <Header
        menuItems={siteData.main_menu}
        loading={loading}
        logo={siteData.logo}
        favicon={siteData.favicon}
      />

      <Routes>
        {aboutPage && (
          <>
            <Route path="/" element={<Page pageData={aboutPage} />} />
            <Route path="/about-me" element={<Page pageData={aboutPage} />} />
          </>
        )}

        {siteData.pages
          .filter(p => p.slug !== 'about-me')
          .map(page => (
            <Route
              key={page.id}
              path={`/${page.slug}`}
              element={<Page pageData={page} />}
            />
          ))}
      </Routes>
    </Router>
  );
}

export default App;