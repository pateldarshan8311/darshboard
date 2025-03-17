import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Page = () => {
  const { slug } = useParams();
  console.log("🛠 useParams() Output:", useParams()); // ✅ Debugging
  console.log("🛠 URL Slug:", slug); // ✅ Slug Check

  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      console.error("⚠ Slug is undefined!");
      return;
    }

    const fetchPageData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://darshboard.com/wp-json/wp/v2/pages?slug=${slug}`);
        console.log('✅ Page API Response:', response.data);

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
      <h1>{pageContent.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }} />
    </div>
  );
};

export default Page;
