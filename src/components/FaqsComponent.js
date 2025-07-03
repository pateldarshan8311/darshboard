import React, { useEffect, useRef, useState } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";

const StacksComponent = ({ stackData }) => {
    const splideRef = useRef(null);
    const [splideInstance, setSplideInstance] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (splideRef.current && stackData?.faqs_list?.length > 0) {
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
                gap: "1.0416666666666665vw", // Negative gap for overlap
                drag: false,
            });

            splide.on("move", (newIndex) => {
                setCurrentSlide(newIndex);
            });

            splide.mount();
            setSplideInstance(splide);
        }
    }, [stackData]);

    if (!stackData) return null;

    const {
        faqs_topbar,
        faqs_list,
    } = stackData || {};

    const {
        faqs_top_icon,
        faqs_top_text,
        faqs_left_icon,
        faqs_right_icon,
    } = faqs_topbar || {};

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
        <div className="comm_inner d_flex flex_column no_gap">
            {/* Top Section */}
            <div className="stack_titlebar d_flex flex_column align_center">
                <div className="stack_top_head d_flex justify_center align_center">
                    {faqs_top_icon && (
                        <span
                            className="top_icon line_none"
                            dangerouslySetInnerHTML={{ __html: faqs_top_icon }}
                        />
                    )}
                    {faqs_top_text && <p className="stack_top_para mb_0">{faqs_top_text}</p>}
                </div>
                <div className="custom-arrows d_flex justify_center align_center mt_10">
                    {faqs_left_icon && (
                        <span
                            className="top_icon line_none custom_arrow"
                            onClick={handlePrev}
                            dangerouslySetInnerHTML={{ __html: faqs_left_icon }}
                            style={{ cursor: "pointer" }}
                        />
                    )}
                         {/* Custom Dots */}
            <div className="custom-pagination d_flex justify_center mt_20">
                {faqs_list?.map((_, index) => (
                    <button
                        key={index}
                        className={`custom-dot ${currentSlide === index ? "active" : ""}`}
                        onClick={() => handleDotClick(index)}
                    ></button>
                ))}
            </div>
                    {faqs_right_icon && (
                        <span
                            className="top_icon line_none custom_arrow"
                            onClick={handleNext}
                            dangerouslySetInnerHTML={{ __html: faqs_right_icon }}
                            style={{ cursor: "pointer" }}
                        />
                    )}
                </div>
            </div>

            {/* Vertical Slider with overlap */}
            <div className="splide vertical-faq-slider" ref={splideRef}>
                <div className="splide__track">
                    <ul className="splide__list overlap_faq_slider">
                        {faqs_list?.map((item, index) => (
                            <li className="splide__slide overlap_slide" key={index}>
                                <div className="stack_item stat_item d_flex align_center">
                                    <div className="stack_content d_flex align_center">
                                        <div className="stack_icon_list_inner d_flex flex_column">
                                            {item.faqs_question && (
                                                <h6 className="mb_0 stack_title btn_txt">
                                                    {item.faqs_question}
                                                </h6>
                                            )}
                                            {item.faqs_answer && (
                                                <div className="stack_label comm_work_txt mb_0">
                                                    {item.faqs_answer}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

       
        </div>
    );
};

export default StacksComponent;
