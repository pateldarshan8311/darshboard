import React from "react";

const ProjectsComponent = ({ projectsData }) => {
    if (!projectsData) return null;

    const {
        projects_top_icon,
        projects_top_text,
        projects_top_title,
        projects_list,
    } = projectsData;

    return (
        <div className="comm_inner d_flex flex_column no_gap">
            {/* Top Section */}
            <div className="stack_titlebar d_flex flex_column align_center">
                <div className="stack_top_head d_flex justify_center align_center">
                    {projects_top_icon && (
                        <span
                            className="top_icon line_none"
                            dangerouslySetInnerHTML={{ __html: projects_top_icon }}
                        />
                    )}
                    {projects_top_text && (
                        <p className="stack_top_para mb_0">{projects_top_text}</p>
                    )}
                </div>
                <div className="stack_top_body">
                    {projects_top_title && <h4>{projects_top_title}</h4>}
                </div>
            </div>

            {/* Project Items List */}
            <div className="stack_icon_list comm_inner d_flex flex_wrap">
                {projects_list?.map((item, index) => (
                    <div
                        key={index}
                        className="stack_item stat_item d_flex align_center"
                    >
                        <div className="stack_content d_flex align_center">
                            {item.project_icon && (
                                <span
                                    className="stack_icon btn_icon comm_btn"
                                    dangerouslySetInnerHTML={{ __html: item.project_icon }}
                                />
                            )}
                            <div className="stack_icon_list_inner d_flex flex_column">
                                {item.project_title && (
                                    <h5 className="mb_0 stack_title btn_txt">
                                        {item.project_title}
                                    </h5>
                                )}
                                {item.project_desc && (
                                    <div className="stack_label comm_work_txt mb_0">
                                        {item.project_desc}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsComponent;
