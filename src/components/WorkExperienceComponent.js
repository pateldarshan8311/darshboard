import React, { useEffect } from "react";
import '@splidejs/splide/dist/css/splide.min.css';
import Splide from '@splidejs/splide';

const WorkExperience = ({ data }) => {
  // Destructure with fallback to empty object if data is null/undefined
  const { experience_topbar, company_info, experience_details } = data || {};

  // Determine the maximum length between company_info and experience_details
  const maxLength = Math.max(
    company_info?.length || 0,
    experience_details?.length || 0
  );

  useEffect(() => {
    // Only initialize Splide if data exists and maxLength > 0
    if (data && maxLength > 0) {
      const splide = new Splide('.splide', {
        type: 'slide', // Changed from 'loop' to 'slide' to disable looping
        direction: 'ttb', // vertical direction
        height: '32vh', // Double the height to show 2 slides
        perPage: 2, // Show 2 slides at a time
        gap: '1rem', // Add some gap between slides
        autoHeight: true,
        autoplay: true,
        interval: 3000,
        speed: 1000,
        pauseOnHover: false,
        arrows: false,
        pagination: false,
        drag: false, // Disable drag for vertical scrolling
        wheel: true, // Enable mouse wheel scrolling
        releaseWheel: true, // Continue sliding after wheel stops
        wheelSleep: 100, // Delay between wheel events
        wheelMinThreshold: 10, // Minimum wheel delta
        breakpoints: {
          768: {
            height: '60vh', // Adjust for smaller screens
            perPage: 1 // Show only 1 slide on mobile
          },
        },
      }).mount();

      // Cleanup function to destroy Splide instance
      return () => {
        splide.destroy();
      };
    }
  }, [data, maxLength]); // Add data and maxLength to dependencies

  // Early return if no data
  if (!data) return null;

  return (
    <div className="comm_inner d_flex flex_column no_gap">
      {/* Topbar section */}
      {experience_topbar && (
        <div className="stack_titlebar d_flex flex_column align_center">
          <div className="stack_top_head d_flex justify_center align_center">
            {experience_topbar.experience_top_icon && (
              <span
                className="top_icon line_none"
                dangerouslySetInnerHTML={{ __html: experience_topbar.experience_top_icon }}
              />
            )}
            {experience_topbar.experience_top_text && (
              <p className="stack_top_para mb_0">{experience_topbar.experience_top_text}</p>
            )}
          </div>
        </div>
      )}

      {/* Splide slider container */}
      <div className="splide" style={{ overflow: 'hidden' }}>
        <div className="splide__track">
          <div className="splide__list">
            {/* Create slide items based on the maximum length */}
            {Array.from({ length: maxLength }).map((_, index) => (
              <div key={index} className="splide__slide" style={{ height: 'auto' }}>
                <div className="slide_item d_flex " style={{ gap: '2rem' }}>
                  {/* Experience Details item */}
                  {experience_details && experience_details[index] && (
                    <div className="expriance_info_item  flex_column comm_inner d_flex flex_wrap">
                      <div className="stack_item stat_item d_flex align_center">
                        <div className="stack_content d_flex align_center">
                          <div className="stack_icon_list_inner d_flex flex_column">
                            <h6 className="mb_0 stack_title btn_txt">{experience_details[index].designation}</h6>
                            {experience_details[index].terms && (
                              <div
                                className="stack_label terms comm_work_txt mb_0"
                                dangerouslySetInnerHTML={{ __html: experience_details[index].terms }}
                              />
                            )}
                            {experience_details[index].job_profile && (
                              <div
                                className="stack_label comm_work_txt job_profile mb_0"
                                dangerouslySetInnerHTML={{ __html: experience_details[index].job_profile }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Company Info item */}
                  {company_info && company_info[index] && (
                    <div className="comapny_info_item  comm_inner flex_column d_flex flex_wrap">
                      <div className="stack_item stat_item d_flex align_center">
                        <div className="stack_icon_list_inner d_flex flex_column">
                          <h6 className="mb_0 stack_title btn_txt">{company_info[index].company_name}</h6>
                          <div className="stack_label comm_work_txt mb_0">
                            <a 
                              href={company_info[index].company_url?.url} 
                              target={company_info[index].company_url?.target || "_self"} 
                              rel="noopener noreferrer"
                            >
                              {company_info[index].company_url?.title || company_info[index].company_url?.url}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;