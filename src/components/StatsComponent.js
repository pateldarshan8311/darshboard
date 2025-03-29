import React from 'react';

const StatsComponent = ({ statsData }) => {
  if (!statsData || !Array.isArray(statsData)) return null;

  return (
    <div className="stats_container comm_box_design comm_border_after d_flex">
      {statsData.map((item, index) => (
        <div key={index} className="stat_item d_flex flex_column">
          {/* Social Label */}
          {item.social_label && (
            <div className="social_label mb_0">{item.social_label}</div>
          )}

          {/* Social Icon */}
          {item.social_icon && (
            <span 
              className="social_icon btn_icon"
              dangerouslySetInnerHTML={{ __html: item.social_icon }}
            />
          )}

          {/* Followers Count */}
          {item.followers_count && (
            <span className="followers_count btn_txt">{item.followers_count}</span>
          )}

          {/* Arrow Link */}
          {item.arrow_link && (
            <a
              href={item.arrow_link}
              className="arrow_link btn_link d_inline_flex align_center"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.arrow_icon && (
                <span 
                  className="arrow_icon"
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

export default StatsComponent;
