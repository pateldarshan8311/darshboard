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

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [siteRes, pagesRes] = await Promise.all([
          axios.get('https://darshboard.com/wp-json/custom/v1/site-data'),
          axios.get('https://darshboard.com/wp-json/wp/v2/pages?per_page=100')
        ]);

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

  // Find the About Me page data
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
        {/* Map both '/' and '/about-me' to the same About Me page */}
        {aboutPage && (
          <>
            <Route path="/" element={<Page pageData={aboutPage} />} />
            <Route path="/about-me" element={<Page pageData={aboutPage} />} />
          </>
        )}

        {/* Other dynamic pages */}
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
