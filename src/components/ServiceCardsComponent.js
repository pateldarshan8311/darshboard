import React from 'react';

const ServiceCardsComponent = ({ serviceCards = [] }) => {
  if (!Array.isArray(serviceCards) || serviceCards.length === 0) {
    return null; // Don’t render if no data
  }

  return (
    <div className="comm_box_grid">
      {serviceCards.map((card, index) => (
        <div key={index} className="comm_box_design">
          {/* Icon */}
          {card.service_icon && (
            <div
              className="icon"
              dangerouslySetInnerHTML={{ __html: card.service_icon }}
            />
          )}

          {/* Title */}
          {card.service_title && <h3>{card.service_title}</h3>}

          {/* Project Count */}
          {(card.projects_completed_count || card.projects_completed_text) && (
            <p>
              <strong>{card.projects_completed_count}</strong>{' '}
              {card.projects_completed_text}
            </p>
          )}

          {/* Description */}
          {card.service_description && <p>{card.service_description}</p>}

          {/* Starting Price */}
          {card.service_starting_price && (
            <p>Starting at ₹{card.service_starting_price}</p>
          )}

          {/* Button */}
          {card.button_url && card.button_text && (
            <a href={card.button_url} className="btn">
              {card.button_text}
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default ServiceCardsComponent;
