import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileBox from './ProfileBox';
import StatsComponent from './StatsComponent';
import CountersComponent from './CountersComponent';  
import '../css/MainContent.css';


const Page = ({ slug }) => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log('Fetching data for slug:', slug);

    setPageContent(null);
    setLoading(true);

    const fetchPageData = async () => {
      try {
        const apiUrl = slug
          ? `https://darshboard.com/wp-json/wp/v2/pages?slug=${slug}`
          : `https://darshboard.com/wp-json/wp/v2/pages?slug=about-me`;
        const response = await axios.get(apiUrl);
        console.log('API Response:', response.data);

        if (response.data.length > 0) {
          setPageContent(response.data[0]);
        } else {
          console.error('⚠ No page found for slug:', slug);
          setPageContent(null);
        }
      } catch (error) {
        console.error('❌ Error fetching page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [slug]);

  if (loading) return <p>⏳ Loading Page...</p>;
  if (!pageContent) return <p>⚠ Page not found!</p>;

  return (
    <div className="page-content">
      <div dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }} />

      {/* ACF fields display - Only for about-me page */}
      {slug === 'about-me' && pageContent.acf && (
        <div className='comm_box_grid'>
          <ProfileBox acfData={pageContent.acf} />
          <StatsComponent statsData={pageContent.acf.statistics_items} />
          <CountersComponent countersData={pageContent.acf.my_counters} />  {/* NEW COMPONENT */}
        </div>
      )}
    </div>
  );
};

export default Page;