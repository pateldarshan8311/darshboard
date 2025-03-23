import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Page = ({ slug }) => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching data for slug:', slug);

    setPageContent(null);
    setLoading(true);

    const fetchPageData = async () => {
      try {
        const apiUrl = slug
          ? `https://darshboard.com/wp-json/wp/v2/pages?slug=${slug}`
          : `https://darshboard.com/wp-json/wp/v2/pages?slug=about-me`; // Homepage ke liye "about-me" slug use karein
        const response = await axios.get(apiUrl);
        console.log('API Response:', response.data);

        if (response.data.length > 0) {
          const pageData = response.data[0];
          const acfFields = pageData.acf; // ACF fields ka data
          console.log('ACF Fields:', acfFields);

          setPageContent(pageData); // Page data set karein
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
      <h1>{pageContent.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }} />
  
      {/* ACF fields display karein - Only for about-me page */}
      {slug === 'about-me' && pageContent.acf && (
        <div className="acf-fields">
          {/* Available For Work */}
          {pageContent.acf.available_for_work && (
            <p><strong>Available For Work:</strong> {pageContent.acf.available_for_work}</p>
          )}
  
          {/* Name */}
          {pageContent.acf.name && (
            <p><strong>Name:</strong> {pageContent.acf.name}</p>
          )}
  
          {/* Email */}
          {pageContent.acf.email && (
            <p><strong>Email:</strong> {pageContent.acf.email}</p>
          )}
  
          {/* Birthplace */}
          {pageContent.acf.birthplace && (
            <p><strong>Birthplace:</strong> {pageContent.acf.birthplace}</p>
          )}
  
          {/* About Me Title */}
          {pageContent.acf.about_me_title && (
            <p><strong>About Me Title:</strong> {pageContent.acf.about_me_title}</p>
          )}
  
          {/* About Me Description */}
          {pageContent.acf.about_me_description && (
            <p><strong>About Me Description:</strong> {pageContent.acf.about_me_description}</p>
          )}
  
          {/* Profile Image */}
          {pageContent.acf.profile_image && (
            <img src={pageContent.acf.profile_image} alt="Profile" />
          )}
        </div>
      )}
    </div>
  );
};

export default Page;