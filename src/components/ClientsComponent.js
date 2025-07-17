import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

// ⏱ Speed should be fixed, not state-dependent
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const scrollSpeed = vw < 1536 ? 0.3 : vw < 1920 ? 0.3 : 0.75;

const ClientsComponent = ({ clientData }) => {
    const [startScroll, setStartScroll] = useState(false);

    useEffect(() => {
        // ⏳ Delay autoScroll start to let layout settle
        const timeout = setTimeout(() => {
            setStartScroll(true);
        }, 500); // 500ms delay — adjust if needed

        return () => clearTimeout(timeout);
    }, []);

    if (!clientData) return null;

    const {
        client_topbar_icon,
        client_topbar_text,
        client_list,
        happy_clients_numbers,
        happy_clients_text,
    } = clientData;

    return (
        <div className="comm_inner d_flex my_client_box flex_column comm_box_design comm_border_after no_gap my_client_list_row p_0">
            {/* Topbar Section */}
            <div className="stack_titlebar d_flex flex_column">
                <div className="stack_top_head d_inline_flex align_center">
                    {client_topbar_icon && (
                        <span
                            className="top_icon line_none"
                            dangerouslySetInnerHTML={{ __html: client_topbar_icon }}
                        />
                    )}
                    {client_topbar_text && <p className="stack_top_para mb_0">{client_topbar_text}</p>}
                </div>
                <div className="happy_client_leftbar d_flex align_center text_center">
                    {happy_clients_numbers && <h1 className="mb_0">{happy_clients_numbers}</h1>}
                    {happy_clients_text && <p className="mb_0">{happy_clients_text}</p>}
                </div>
            </div>

            {/* Splide Left-to-Right Slider */}
            <Splide
                className="ltr_list"
                options={{
                    type: "loop",
                    arrows: false,
                    pagination: false,
                    drag: false,
                    autoWidth: true,
                    gap: '0.6510416666666667vw',
                    direction: 'ltr',
                    autoScroll: {
                        speed: startScroll ? scrollSpeed : 0,
                        pauseOnHover: false,
                        pauseOnFocus: false,
                        pauseOnVisibilityChange: false,
                    },
                }}
                extensions={{ AutoScroll }}
            >
                {client_list?.map((item, index) => (
                    <SplideSlide key={`normal-${index}`}>
                        {item.client_logo?.url && (
                            <img
                                src={item.client_logo.url}
                                alt={item.client_logo.alt || "Client Logo"}
                                className="client_logo"
                                loading="lazy"
                            />
                        )}
                    </SplideSlide>
                ))}
            </Splide>

            {/* Splide Right-to-Left Slider */}
            <Splide
                className="rtl_list"
                options={{
                    type: "loop",
                    arrows: false,
                    pagination: false,
                    drag: false,
                    autoWidth: true,
                    gap: '0.6510416666666667vw',
                    direction: 'rtl',
                    autoScroll: {
                        speed: startScroll ? scrollSpeed : 0,
                        pauseOnHover: false,
                        pauseOnFocus: false,
                        pauseOnVisibilityChange: false,
                    },
                }}
                extensions={{ AutoScroll }}
            >
                {client_list?.slice().reverse().map((item, index) => (
                    <SplideSlide key={`reverse-${index}`}>
                        {item.client_logo?.url && (
                            <img
                                src={item.client_logo.url}
                                alt={item.client_logo.alt || "Client Logo"}
                                className="client_logo"
                                loading="lazy"
                            />
                        )}
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
};

export default ClientsComponent;
