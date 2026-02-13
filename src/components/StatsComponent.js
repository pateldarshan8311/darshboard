import React from 'react';
const StatsComponent = ({ statsData }) => {
    if (!statsData || !Array.isArray(statsData)) return null;

    return (

        <div className='comm_inner d_flex flex_column home_followers'>
            {statsData.map((item, index) => (
                <div key={index} className="stat_item d_flex align_center justify_between">
                    <div className='social_content d_flex align_center'>
                        {/* Social Icon */}
                        {item.social_icon && (
                            <span
                                className="social_icon btn_icon comm_btn"
                                dangerouslySetInnerHTML={{ __html: item.social_icon }}
                            />
                        )}
                        <div className='social_followers d_flex flex_column'>
                            {/* Followers Count */}
                            {item.followers_count && (
                                <h5 className="mb_0 followers_count btn_txt">{item.followers_count}</h5>
                            )}
                            {/* Social Label */}
                            {item.social_label && (
                                <div className="social_label mb_0">{item.social_label}</div>
                            )}
                        </div>
                    </div>
                    {/* Arrow Link */}
                    {item.arrow_link && (
                        <a
                            href={item.arrow_link}
                            className="arrow_link btn_link d_inline_flex align_center"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Profile Link"
                        >
                            {item.arrow_icon && (
                                <span
                                    className="arrow_icon comm_btn"
                                    dangerouslySetInnerHTML={{ __html: item.arrow_icon }}
                                />
                            )}
                        </a>
                    )}
                </div>
            ))}
        </div>

    );
};

const CountersComponent = ({ countersData }) => {
    if (!countersData || !Array.isArray(countersData)) return null;

    return (
        <div className="comm_inner flex_column d_flex home_counters">
            {countersData.map((item, index) => (
                <div key={index} className="counter_item d_flex flex_column">
                    <div className='counter_item_top d_flex justify_center align_center'>
                        {/* Counter Number */}
                        {item.counter_number && (
                            <span className="counter_number comm_work_txt">{item.counter_number}</span>
                        )}
                        {/* Counter Icon */}
                        {item.counter_icon && (
                            <span
                                className="counter_icon "
                                dangerouslySetInnerHTML={{ __html: item.counter_icon }}
                            />
                        )}
                    </div>
                    <div className='counter_item_btm  d_flex justify_center align_center'>
                          {/* Counter Title Icon */}
                          {item.counter_title_icon && (
                            <span className="counter_title_icon line_none"
                                dangerouslySetInnerHTML={{ __html: item.counter_title_icon }}
                            />
                        )}
                        {/* Counter Title */}
                        {item.counter_title && (
                            <div className="counter_title">{item.counter_title}</div>
                        )}
                      
                    </div>

                </div>
            ))}
        </div>
    );
};
export { StatsComponent, CountersComponent };
