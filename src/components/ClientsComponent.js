import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
const getResponsiveSpeed = () => {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  return vw < 1536 ? 0.25 : vw < 1920 ? 0.25 : 0.7;
};

const ClientsComponent = ({ clientData }) => {
    if (!clientData) return null;

    const {
        client_topbar_icon,
        client_topbar_text,
        client_list,
        happy_clients_numbers,
        happy_clients_text,
    } = clientData;

    return (
        <div className="comm_inner d_flex my_client_box flex_column no_gap">
            <div className="my_client_list_row d_flex flex_column">
                {/* Topbar Section */}
                <div className="stack_titlebar d_flex flex_column align_center">
                    <div className="stack_top_head d_flex justify_center align_center">
                        {client_topbar_icon && (
                            <span
                                className="top_icon line_none"
                                dangerouslySetInnerHTML={{ __html: client_topbar_icon }}
                            />
                        )}
                        {client_topbar_text && <p className="stack_top_para mb_0">{client_topbar_text}</p>}
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
                            speed:  getResponsiveSpeed(),
                            pauseOnHover: false,
                            pauseOnFocus: false,
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
                                />
                            )}
                        </SplideSlide>
                    ))}
                </Splide>
            </div>

            <div className="my_happy_client_list_row d_flex flex_column">
                {/* Happy Clients Section */}
                <div className="happy_client_leftbar align_center text_center mt_20 mb_20">
                    {happy_clients_numbers && <p className="stack_top_para mb_0">{happy_clients_numbers}</p>}
                    {happy_clients_text && <p className="stack_top_para mb_0">{happy_clients_text}</p>}
                </div>

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
                            speed:  getResponsiveSpeed(),
                            pauseOnHover: false,
                            pauseOnFocus: false,
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
                                />
                            )}
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    );
};

export default ClientsComponent;
