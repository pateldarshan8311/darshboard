import React from 'react';

const ProfileBox = ({ acfData }) => {
  return (
    <div className=" w_100">
      <div className="profile_box flex_wrap d_flex align_start">
        <div className='profile_img w_100 line_none'>
          {acfData.profile_image?.url && (
            <img
              className='w_100'
              src={acfData.profile_image.url.startsWith('http') ? acfData.profile_image.url : `https://darshboard.com${acfData.profile_image.url}`}
              alt={acfData.profile_image.alt || 'Profile'}
            />
          )}
        </div>

        <div className='profile_content d_flex flex_column align_start'>
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
      <div className='about_data comm_border_after d_flex flex_column align_start'>
        <div className='d_flex w_100 align_center justify_between gap_10'>
          {acfData.about_me_title && (
            <h3 className='mb_0 h6'>{acfData.about_me_title}</h3>
          )}
          {/* Available For Work */}
          {acfData.available_for_work && (
            <div className='comm_work d_inline_flex align_center comm_border_after'>
              <span className='pulse_circle'></span>
              <span className='comm_work_txt'>{acfData.available_for_work}</span>
            </div>
          )}
        </div>
        {acfData.about_me_description && (
          <div
            className='mb_0 about_description'
            dangerouslySetInnerHTML={{ __html: acfData.about_me_description }}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileBox;