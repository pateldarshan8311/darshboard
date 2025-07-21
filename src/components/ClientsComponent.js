import React, { useEffect, useRef } from "react";

const scrollSpeedLTR = 30; // pixels per second
const scrollSpeedRTL = 30; // pixels per second

const ClientsComponent = ({ clientData }) => {
    const ltrRef = useRef(null);
    const rtlRef = useRef(null);
    const ltrContainerRef = useRef(null);
    const rtlContainerRef = useRef(null);

    useEffect(() => {
        let ltrX = 0;
        let rtlX = 0;
        let lastTime = performance.now();

        const animate = (time) => {
            const delta = (time - lastTime) / 1000; // seconds
            lastTime = time;

            if (ltrRef.current && ltrContainerRef.current) {
                const width = ltrRef.current.scrollWidth / 2;
                ltrX -= scrollSpeedLTR * delta;
                if (Math.abs(ltrX) >= width) ltrX = 0;
                ltrRef.current.style.transform = `translateX(${ltrX}px)`;
            }

            if (rtlRef.current && rtlContainerRef.current) {
                const width = rtlRef.current.scrollWidth / 2;
                rtlX += scrollSpeedRTL * delta;
                if (rtlX >= width) rtlX = 0;
                rtlRef.current.style.transform = `translateX(${rtlX}px)`;
            }

            requestAnimationFrame(animate);
        };

        const frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
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

            {/* LTR */}
            <div className="ltr_list overflow_hidden comm_logo_slider" ref={ltrContainerRef}>
                <div className="scroll_track d_flex" ref={ltrRef}>
                    {[...client_list, ...client_list]?.map((item, index) => (
                        <div className="scroll_item" key={`ltr-${index}`}>
                            {item.client_logo?.url && (
                                <img
                                    src={item.client_logo.url}
                                    alt={item.client_logo.alt || "Client Logo"}
                                    className="client_logo"
                                    loading="lazy"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* RTL */}
            <div className="rtl_list overflow_hidden comm_logo_slider" ref={rtlContainerRef}>
                <div className="scroll_track d_flex" ref={rtlRef}>
                    {[...client_list.slice().reverse(), ...client_list.slice().reverse()]?.map((item, index) => (
                        <div className="scroll_item" key={`rtl-${index}`}>
                            {item.client_logo?.url && (
                                <img
                                    src={item.client_logo.url}
                                    alt={item.client_logo.alt || "Client Logo"}
                                    className="client_logo"
                                    loading="lazy"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientsComponent;
