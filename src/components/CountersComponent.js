import React from 'react';

const CountersComponent = ({ countersData }) => {
  if (!countersData || !Array.isArray(countersData)) return null;

  return (
    <div className="counters_container comm_box_design comm_border_after d_flex">
      {countersData.map((item, index) => (
        <div key={index} className="counter_item d_flex flex_column">
          
          {/* Counter Number */}
          {item.counter_number && (
            <span className="counter_number comm_work_txt">{item.counter_number}</span>
          )}

          {/* Counter Icon */}
          {item.counter_icon && (
            <span 
              className="counter_icon btn_icon"
              dangerouslySetInnerHTML={{ __html: item.counter_icon }}
            />
          )}

          {/* Counter Title */}
          {item.counter_title && (
            <div className="counter_title">{item.counter_title}</div>
          )}

          {/* Counter Title Icon */}
          {item.counter_title_icon && (
            <span 
              className="counter_title_icon"
              dangerouslySetInnerHTML={{ __html: item.counter_title_icon }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CountersComponent;
