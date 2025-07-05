// src/components/ClientSuccessComponent.js

import React, { useEffect, useRef, useState } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";

const ClientSuccessComponent = ({ clientData }) => {
  const splideRef = useRef(null);
  const [splideInstance, setSplideInstance] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (splideRef.current && clientData?.client_stories?.length > 0) {
      const splide = new Splide(splideRef.current, {
        type: 'loop', // Changed from 'loop' to 'slide' to disable looping
        direction: "ttb",
        height: "15.5vw",
        perPage: 2,
        autoHeight: true,
        perMove: 1,
        pagination: false,
        arrows: false,
        wheel: false,
        speed: 700,
        easing: "ease",
        gap: "1.0416666666666665vw",
        drag: false,
      });

      splide.on("move", (newIndex) => {
        setCurrentSlide(newIndex);
      });

      splide.mount();
      setSplideInstance(splide);
    }
  }, [clientData]);

  if (!clientData) return null;

  const {
    topbar_icon,
    topbar_title,
    topbar_count_text,
    client_avatars,
    stories_left_icon,
    stories_right_icon,
    client_stories,
  } = clientData;

  const handleDotClick = (index) => {
    if (splideInstance) {
      splideInstance.go(index);
    }
  };

  const handlePrev = () => {
    if (splideInstance) {
      splideInstance.go("<");
    }
  };

  const handleNext = () => {
    if (splideInstance) {
      splideInstance.go(">");
    }
  };

  return (
    <section className="comm_inner d_flex flex_column no_gap">
      {/* Top Section */}
      <div className="stack_titlebar arrows_topbar d_flex flex_column align_center">
        <div className="stack_top_head d_flex justify_center align_center">
          {topbar_icon && (
            <span
              className="top_icon line_none"
              dangerouslySetInnerHTML={{ __html: topbar_icon }}
            />
          )}
          {topbar_title && <h2 className="stack_top_para mb_0">{topbar_title}</h2>}
        </div>

        <div className="d_flex justify_between w_100 align_center stories_header">
          {/* Avatars */}
          <div className="avatars d_flex justify_center mt_10">
            {client_avatars?.map((avatar, index) =>
              avatar?.avatar_image?.url ? (
                <img
                  key={index}
                  src={avatar.avatar_image.url}
                  alt={avatar.avatar_image.alt || "Client"}
                  className="avatar-img"
                />
              ) : null
            )}
            {topbar_count_text && <p className="stack_top_para mb_0 d_inline_flex justify_center align_center">{topbar_count_text}</p>}
          </div>
          <div className="custom-arrows d_flex justify_center align_center mt_10">
            {stories_left_icon && (
              <span
                className="top_icon line_none custom_arrow"
                onClick={handlePrev}
                dangerouslySetInnerHTML={{ __html: stories_left_icon }}
                style={{ cursor: "pointer" }}
              />
            )}
            {/* Custom Dots */}
            <div className="custom-pagination d_flex justify_center mt_20">
              {client_stories?.map((_, index) => (
                <button
                  key={index}
                  className={`custom-dot ${currentSlide === index ? "active" : ""}`}
                  onClick={() => handleDotClick(index)}
                ></button>
              ))}
            </div>
            {stories_right_icon && (
              <span
                className="top_icon line_none custom_arrow"
                onClick={handleNext}
                dangerouslySetInnerHTML={{ __html: stories_right_icon }}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>

        </div>
      </div>

      {/* Vertical Slider */}
      <div className="splide vertical-faq-slider" ref={splideRef}>
        <div className="splide__track">
          <ul className="splide__list overlap_faq_slider">
            {client_stories?.map((story, index) => (
              <li className="splide__slide overlap_slide" key={index}>
                <div className="stack_item stat_item d_flex align_center">
                  <div className="stack_content d_flex align_center">
                    <div className="stack_icon_list_inner d_flex flex_column">
                      {story?.story_text && (
                        <p className="client-review mb_0">{story.story_text}</p>
                      )}
                      <div className="story-footer d_flex align_center mt_10">
                        {story?.client_image?.url && (
                          <img
                            src={story.client_image.url}
                            alt={story.client_image.alt || story.client_name || "Client"}
                            className="story-avatar"
                          />
                        )}
                        {story?.client_name && <strong>{story.client_name}</strong>}
                        <a href="https://darshboard.com" className="read-link ml_10">
                          Read Full Story
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ClientSuccessComponent;
