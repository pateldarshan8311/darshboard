import React from "react";

const WorkExperience = ({ data }) => {
  if (!data) return null;

  const { experience_topbar, company_info, experience_details } = data;

  return (
    <div className="comm_inner d_flex flex_column no_gap">
      {/* Topbar section */}
      {experience_topbar && (
        <div className="stack_titlebar d_flex flex_column align_center">
          <div className="stack_top_head d_flex justify_center align_center">
            {experience_topbar.experience_top_icon && (
              <span
                className="top_icon line_none"
                dangerouslySetInnerHTML={{ __html: experience_topbar.experience_top_icon }}
              />
            )}
            {experience_topbar.experience_top_text && (
              <p className="stack_top_para mb_0">{experience_topbar.experience_top_text}</p>
            )}
          </div>
        </div>
      )}

      {/* Company Info section */}
      {company_info && company_info.length > 0 && (
        <div className="stack_icon_list comm_inner flex_column d_flex flex_wrap">
          {company_info.map((company, index) => (
            <div key={index} className="stack_item  stat_item d_flex align_center">
                <div className="stack_icon_list_inner d_flex flex_column">
                  <h6 className="mb_0 stack_title btn_txt">{company.company_name}</h6>
                  <div className="stack_label comm_work_txt mb_0">
                  <a  href={company.company_url} target="_blank" rel="noopener noreferrer" >{company.company_url}</a>
                  </div>
                </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience Details section */}
      {experience_details && experience_details.length > 0 && (
        <div className="stack_icon_list flex_column comm_inner d_flex flex_wrap">
          {experience_details.map((exp, index) => (
            <div key={index} className="stack_item stat_item d_flex align_center">
              <div className="stack_content d_flex align_center">
                <div className="stack_icon_list_inner d_flex flex_column">
                  <h6 className="mb_0 stack_title btn_txt">{exp.designation}</h6>
                  {exp.terms && (
                    <div
                      className="stack_label terms comm_work_txt mb_0"
                      dangerouslySetInnerHTML={{ __html: exp.terms }}
                    />
                  )}
                  {exp.job_profile && (
                    <div
                      className="stack_label comm_work_txt job_profile mb_0"
                      dangerouslySetInnerHTML={{ __html: exp.job_profile }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkExperience;
