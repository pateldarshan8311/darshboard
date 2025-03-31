import React from 'react';

const StacksComponent = ({ stacksData }) => {
    if (!stacksData) return null;

    return (
        <div className="stacks_container comm_box_design comm_border_after d_flex flex_column">
            {/* Top Section */}
            <div className="stack_top d_flex align_center">
                {/* Stack Top Icon */}
                {stacksData.stack_top_icon && (
                    <span
                        className="stack_top_icon"
                        dangerouslySetInnerHTML={{ __html: stacksData.stack_top_icon }}
                    />
                )}
                <div className="stack_top_content">
                    {/* Stack Top Text */}
                    {stacksData.stack_top_text && (
                        <h5 className="stack_top_text">{stacksData.stack_top_text}</h5>
                    )}
                    {/* Stack Top Title */}
                    {stacksData.stack_top_title && (
                        <h3 className="stack_top_title">{stacksData.stack_top_title}</h3>
                    )}
                </div>
            </div>

            {/* Repeater Section */}
            <div className="stack_items_list d_flex flex_column">
                {stacksData.stack_icon_box_list && Array.isArray(stacksData.stack_icon_box_list) && (
                    stacksData.stack_icon_box_list.map((item, index) => (
                        <div key={index} className="stack_item d_flex align_center">
                            {/* Stack Icon */}
                            {item.stack_icon && (
                                <span
                                    className="stack_icon"
                                    dangerouslySetInnerHTML={{ __html: item.stack_icon }}
                                />
                            )}
                            <div className="stack_item_content d_flex flex_column">
                                {/* Stack Title */}
                                {item.stack_title && (
                                    <h4 className="stack_title">{item.stack_title}</h4>
                                )}
                                {/* Stack Description */}
                                {item.stack_desc && (
                                    <p className="stack_desc">{item.stack_desc}</p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default StacksComponent;
