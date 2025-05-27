import React from "react";

const WorkExperience = ({ data }) => {
  if (!data) return null;

  const { experience_topbar, company_info, experience_details } = data;

  return (
    <section className="experience-section py-10">
      {experience_topbar && (
        <div className="text-center mb-8">
          {experience_topbar.experience_top_icon && (
            <div
              className="inline-block mb-2"
              dangerouslySetInnerHTML={{ __html: experience_topbar.experience_top_icon }}
            />
          )}
          {experience_topbar.experience_top_text && (
            <h2 className="text-2xl font-bold">{experience_topbar.experience_top_text}</h2>
          )}
        </div>
      )}

      {company_info && company_info.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {company_info.map((company, index) => (
            <div key={index} className="p-4 shadow-md rounded-lg border">
              <a
                href={company.company_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                {company.company_name}
              </a>
            </div>
          ))}
        </div>
      )}

      {experience_details && experience_details.length > 0 && (
        <div className="space-y-6">
          {experience_details.map((exp, index) => (
            <div key={index} className="p-5 bg-gray-50 border rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{exp.designation}</h3>
              {exp.terms && (
                <div
                  className="text-sm text-gray-600 mb-2"
                  dangerouslySetInnerHTML={{ __html: exp.terms }}
                />
              )}
              {exp.job_profile && (
                <div
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: exp.job_profile }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default WorkExperience;
