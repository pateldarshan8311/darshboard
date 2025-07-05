// src/components/ClientSuccessComponent.js

import React from "react";

const ClientSuccessComponent = ({ clientData }) => {
  if (!clientData) return null;

  const {
    topbar_icon,
    topbar_title,
    topbar_count_text,
    client_avatars,
    client_stories,
  } = clientData;

  return (
    <section className="client_success_section">
      {/* Topbar */}
      <div className="topbar">
        {topbar_icon && (
          <div
            className="icon"
            dangerouslySetInnerHTML={{ __html: topbar_icon }}
          />
        )}
        {topbar_title && <h2>{topbar_title}</h2>}
        {topbar_count_text && <p>{topbar_count_text}</p>}
      </div>

      {/* Avatar List */}
      <div className="avatars">
        {client_avatars?.map((avatar, index) => (
          avatar?.avatar_image?.url && (
            <img
              key={index}
              src={avatar.avatar_image.url}
              alt={avatar.avatar_image.alt || "Client"}
              className="avatar-img"
            />
          )
        ))}
      </div>

      {/* Client Stories */}
      <div className="stories">
        {client_stories?.map((story, index) => (
          <div key={index} className="story-box">
            {story?.story_text && (
              <p className="client-review">{story.story_text}</p>
            )}
            <div className="story-footer">
              {story?.client_image?.url && (
                <img
                  src={story.client_image.url}
                  alt={story.client_image.alt || story.client_name || "Client"}
                  className="story-avatar"
                />
              )}
              {story?.client_name && <strong>{story.client_name}</strong>}
              <a href="#" className="read-link">
                Read Full Story
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientSuccessComponent;
