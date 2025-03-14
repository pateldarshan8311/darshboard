import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

const App = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Default loading state true

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      try {
        setLoading(true); // 🔄 Jab API call start ho
        const response = await axios.get('https://darshboard.com/wp-json/wp/v2/menu-items?menus=2', {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2RhcnNoYm9hcmQuY29tIiwiaWF0IjoxNzQxOTM5NjUxLCJuYmYiOjE3NDE5Mzk2NTEsImV4cCI6MTc0MjU0NDQ1MSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.CJbGRISPyraQOBVEQlhXUFFAFDOlFUAlieTEH81VgUw`, // ✅ Correct token use karein
          },
        });
        console.log('✅ API Response:', response.data);
        setMenuItems(response.data);
      } catch (error) {
        console.error('❌ Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchMenuItems();
  }, []);

  return (
    <div>
    <Header menuItems={menuItems} loading={loading} />  
      <Sidebar />
      <MainContent />
      <Footer />
    </div>
  );
};

export default App;
