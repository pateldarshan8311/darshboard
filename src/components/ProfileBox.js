import React from 'react';

const ProfileBox = ({ acfData }) => {
  return (
    <div className="comm_box_design comm_border_after d_flex flex_column">
      <div className="profile_box flex_wrap d_flex align_start">
        <div className='profile_img line_none'>
          {acfData.profile_image?.url && (
            <img
              src={acfData.profile_image.url}
              alt={acfData.profile_image.alt || 'Profile'}
            />
          )}
        </div>

        <div className='profile_content d_flex flex_column align_start'>
          {/* Available For Work */}
          {acfData.available_for_work && (
            <div className='comm_work d_inline_flex align_center comm_border_after'>
              <span className='pulse_circle'></span>
              <span className='comm_work_txt'>{acfData.available_for_work}</span>
            </div>
          )}

          {/* Name */}
          {acfData.name && <h1>{acfData.name}</h1>}

          {/* Email */}
          {acfData?.email && (
            <div className='comm_email line_none'>
              <a
                href={`mailto:${encodeURIComponent(acfData.email)}`}
                className="btn_link d_inline_flex align_center"
                onClick={(e) => e.stopPropagation()}
              >
                {acfData?.email_icon && (
                  <span
                    className="icon btn_icon line_none"
                    dangerouslySetInnerHTML={{ __html: acfData.email_icon }}
                  />
                )}
                <span className='btn_txt'>{acfData.email}</span>
              </a>
            </div>
          )}

          {/* Birthplace - Changed from p to div */}
          {acfData.birthplace && (
            <div className='line_none mb_0'>
              <a
                href={acfData.location_url || "#"}
                className="btn_link d_inline_flex align_center"
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
              >
                {acfData?.location_icon && (
                  <span
                    className="icon btn_icon line_none"
                    dangerouslySetInnerHTML={{ __html: acfData.location_icon }}
                  />
                )}
                <span className='btn_txt'>{acfData.birthplace}</span>
              </a>
            </div>
          )}

        </div>
      </div>

      {/* About Me Section */}
      <div className='about_data comm_border_after d_flex flex_column align_start'>
        {acfData.about_me_title && (
          <h6 className='mb_0'>{acfData.about_me_title}</h6>
        )}
        {acfData.about_me_description && (
          <div
            className='mb_0'
            dangerouslySetInnerHTML={{ __html: acfData.about_me_description }}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileBox;