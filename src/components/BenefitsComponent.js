// src/components/BenefitsComponent.js

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const BenefitsComponent = ({ data }) => {
    const controls = useAnimation();
    const items = data?.acf?.benefit_items || [];

    const [isMobile, setIsMobile] = useState(false); // ✅ added

    useEffect(() => { // ✅ added
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Desktop (vw based)
    const ITEM_HEIGHT_VW = 6.5;
    const VISIBLE_COUNT = 3.2;
    const SCROLL_SPEED = 2;

    // Mobile (px based) ✅ added
    const ITEM_HEIGHT_PX = 90; // 👈 apni need ke hisab se change kar sakte ho
    const SCROLL_SPEED_MOBILE = 40; // px per second

    const scrollDistance = isMobile
        ? items.length * ITEM_HEIGHT_PX
        : items.length * ITEM_HEIGHT_VW;

    const duration = isMobile
        ? scrollDistance / SCROLL_SPEED_MOBILE
        : scrollDistance / SCROLL_SPEED;

    useEffect(() => {
        if (items.length > 0) {
            controls.start({
                y: isMobile
                    ? ["0px", `-${scrollDistance}px`] // ✅ mobile
                    : ["0vw", `-${scrollDistance}vw`], // desktop
                transition: {
                    duration,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                },
            });
        }
    }, [controls, scrollDistance, duration, items, isMobile]);

    return (
        <div className="comm_inner d_flex flex_column no_gap">
            <div className="stack_titlebar d_flex flex_column align_center">
                <div className="benefits_topbar stack_top_head d_flex justify_center align_center">
                    <span
                        className="top_icon line_none"
                        dangerouslySetInnerHTML={{ __html: data?.acf?.benefits_top_icon }}
                    />
                    <p className="benefits_title stack_top_para mb_0">
                        {data?.acf?.benefits_top_title}
                    </p>
                </div>
            </div>

            <div
                className="benefits_slider_container"
                style={{
                    height: isMobile
                        ? `${VISIBLE_COUNT * ITEM_HEIGHT_PX}px`
                        : `${VISIBLE_COUNT * ITEM_HEIGHT_VW}vw`,
                    overflow: "hidden",
                }}
            >
                <motion.div
                    className="benefits_column"
                    animate={controls}
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    {[...items, ...items].map((item, index) => (
                        <div
                            key={index}
                            className="benefit_card d_flex align_center"
                            style={{
                                height: isMobile
                                    ? `${ITEM_HEIGHT_PX}px`
                                    : `${ITEM_HEIGHT_VW}vw`,
                                flexShrink: 0
                            }}
                        >
                            <span
                                className="benefit_icon d_inline_flex comm_btn"
                                dangerouslySetInnerHTML={{ __html: item.benefit_icon }}
                            />
                            <div className="dot-box d_flex align_center p_0">
                                <div className="dot_container d_flex align_start justify_center">
                                    <div className="dot"></div>
                                </div>
                            </div>
                            <div className="d_flex benifit_data_box align_center">
                                <div className="benefit_percentage d_inline_flex align_center">
                                    <span className="benefit_percentage_data">
                                        {item.benefit_percentage}
                                    </span>
                                    <h5 className="benefit_percentage_sign">%</h5>
                                </div>
                                <div className="benefit_text">
                                    {item.benefit_text}
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default BenefitsComponent;
