import React, { useEffect } from 'react';

const BasicDetailsComponent = ({ basicDetails }) => {
    useEffect(() => {
        const handleAwardsToggle = () => {
            const $ = window.jQuery;
            $(".award_item").hide();
            $(".award_item").first().slideDown();
            $(".award_button").first().addClass("active");

            $(".award_button").off("click").on("click", function () {
                const targetId = $(this).data("value");

                $(".award_button").removeClass("active");
                $(this).addClass("active");

                $(".award_item").slideUp();
                $("#" + targetId).stop(true, true).slideDown();
            });
        };

        if (basicDetails?.awards_details?.award_types?.length > 0 && window.jQuery) {
            handleAwardsToggle();
        }
    }, [basicDetails]);

    if (!basicDetails) return null;

    const {
        education_details,
        languages_details,
        availability_details,
        awards_details
    } = basicDetails;

    return (
        <div className='comm_inner d_flex flex_wrap'>

            {/* Education Details */}
            {education_details && (
                <div className="basic_section education_details text_center p_0 stat_item">
                    <div className="stack_top_head education_top_head stack_titlebar d_flex justify_center align_center">
                        {education_details.education_icon && (
                            <span className="top_icon line_none" dangerouslySetInnerHTML={{ __html: education_details.education_icon }} />
                        )}
                        {education_details.education_text && (
                            <p className="education_text stack_top_para mb_0">{education_details.education_text}</p>
                        )}
                    </div>
                    <div className="comm_info d_flex flex_column">
                        {education_details.education_degree && (
                            <h5 className="education_degree mb_0">{education_details.education_degree}</h5>
                        )}
                        {education_details.education_university && (
                            <p className="education_university mb_0">{education_details.education_university}</p>
                        )}
                        {(education_details.education_passing_text || education_details.education_year) && (
                            <p className="education_year mb_0">
                                <span className='education_year_txt'>{education_details.education_passing_text}</span>
                                <span className='education_year_number'>{education_details.education_year}</span>
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Awards Details */}
            {awards_details && (
                <div className="basic_section p_0 awards_details stat_item">
                    <div className="stack_top_head education_top_head stack_titlebar d_flex justify_center align_center">
                        {awards_details.awards_icon && (
                            <span className="top_icon line_none" dangerouslySetInnerHTML={{ __html: awards_details.awards_icon }} />
                        )}
                        {awards_details.awards_text && (
                            <p className="awards_text stack_top_para mb_0">{awards_details.awards_text}</p>
                        )}
                    </div>
                    {Array.isArray(awards_details.award_types) && awards_details.award_types.length > 0 && (
                        <div className="awards_list comm_info">
                            <div className="award_btn_wrapper  d_flex align_center justify_center">
                                {awards_details.award_types.map((award, index) =>
                                    award.award_button && (
                                        <span key={index} data-value={award.award_button} className="award_button d_inline_flex align_center ">
                                            {award.award_button}
                                        </span>
                                    )
                                )}
                            </div>
                            <div className="awards_list_row">
                            {awards_details.award_types.map((award, index) => (
                                <div key={index} className="award_item" id={award.award_button}>
                                    {award.award_text && (
                                        <div className="award_text">{award.award_text}</div>
                                    )}
                                    {award.award_link && (
                                        <a href={award.award_link} target="_blank" rel="noopener noreferrer" className="award_link">
                                            {award.award_link}
                                        </a>
                                    )}
                                </div>
                            ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Availability Details */}
            {availability_details && (
                <div className="basic_section availability_details stat_item p_0">
                    <div className="stack_top_head education_top_head stack_titlebar d_flex justify_center align_center">
                        {availability_details.availability_icon && (
                            <span className="top_icon line_none" dangerouslySetInnerHTML={{ __html: availability_details.availability_icon }} />
                        )}
                        {availability_details.availability_text && (
                            <p className="availability_text stack_top_para mb_0">{availability_details.availability_text}</p>
                        )}
                    </div>
                    <div className="comm_info d_flex flex_column">
                        {(availability_details.availability_from || availability_details.availability_to) && (
                            <div className="availability_range d_flex align_center justify_center">
                                <span className='comm_box_txt'>{availability_details.availability_from}</span>
                                <span className='availability_separator'>{availability_details.availability_separator}</span>
                                <span className='comm_box_txt'>{availability_details.availability_to}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Languages Details */}
            {languages_details && (
                <div className="basic_section languages_details stat_item p_0">
                    <div className="stack_top_head education_top_head stack_titlebar d_flex justify_center align_center">
                        {languages_details.languages_icon && (
                            <span className="language_icon top_icon line_none" dangerouslySetInnerHTML={{ __html: languages_details.languages_icon }} />
                        )}
                        {languages_details.languages_text && (
                            <p className="language_text stack_top_para mb_0">{languages_details.languages_text}</p>
                        )}
                    </div>
                    <div className="comm_info d_flex flex_column">
                        {Array.isArray(languages_details.languages_list) && languages_details.languages_list.length > 0 && (
                            <ul className="languages_list comm_inner d_flex flex_wrap">
                                {languages_details.languages_list.map((lang, index) => (
                                    <li key={index} className='d_inline_flex align_center comm_box_txt justify_center'>
                                        {lang.language_item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BasicDetailsComponent;
