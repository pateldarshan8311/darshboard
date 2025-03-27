import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/MainContent.css';


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
          <div className=" comm_box_design comm_border_after d_flex flex_column">
            <div className="profile_box flex_wrap d_flex align_start">
              <div className='profile_img line_none'>
                {/* Profile Image */}
                {pageContent.acf.profile_image?.url && (
                  <img
                    src={pageContent.acf.profile_image.url}
                    alt={pageContent.acf.profile_image.alt || 'Profile'}
                  />
                )}
              </div>
              <div className='profile_content'>
                {/* Available For Work */}
                {pageContent.acf.available_for_work && (
                  <p className='comm_work d_inline_flex align_center comm_border_after'><span className='pulse_circle'></span><span className='comm_work_txt'> {pageContent.acf.available_for_work}</span> </p>
                )}

                {/* Name */}
                {pageContent.acf.name && (
                  <h1>{pageContent.acf.name}</h1>
                )}

                {/* Email */}
                {pageContent.acf?.email && (
                  <p className='comm_email line_none'>
                    <a
                      href={`mailto:${encodeURIComponent(pageContent.acf.email)}`}
                      className="btn_link d_inline_flex align_center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {pageContent.acf?.email_icon && (
                        <span className="icon btn_icon line_none"
                          dangerouslySetInnerHTML={{ __html: pageContent.acf.email_icon }}
                        />
                      )}
                      <span className='btn_txt'>{pageContent.acf.email}</span>
                    </a>
                  </p>
                )}


                {/* Birthplace */}
                {pageContent.acf.birthplace && (
                  <p className='line_none mb_0'>
                    <a
                      href="https://maps.app.goo.gl/sfdMGpHevQNvnVBfA"
                      className="btn_link d_inline_flex align_center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {pageContent.acf?.location_icon && (
                        <div className="icon btn_icon line_none"
                          dangerouslySetInnerHTML={{ __html: pageContent.acf.location_icon }}
                        />
                      )}
                      <span className='btn_txt'>{pageContent.acf.birthplace}</span>
                    </a></p>
                )}
              </div>
            </div>
            <div className='about_data comm_border_after d_flex flex_column align_start'>
              {/* About Me Title */}
              {pageContent.acf.about_me_title && (
                <h6 className='mb_0'>{pageContent.acf.about_me_title}</h6>
              )}

              {/* About Me Description */}
              {pageContent.acf.about_me_description && (
                <div className='mb_0' dangerouslySetInnerHTML={{ __html: pageContent.acf.about_me_description }} />
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Page;