const ProjectsComponent = ({ projectsData }) => {
    if (!projectsData) return null;

    const {
        projects_icon,
        projects_label,
        projects_title,
        projects_button,
        projects_button_icon,
        project_card,
    } = projectsData;

    return (
        <div className="comm_inner d_flex flex_column no_gap ">
            <div className="d_flex align_center justify_between gap_10 projects_topbar">

                <div className="stack_titlebar d_flex flex_column ">
                    <div className="stack_top_head d_flex  align_center">
                        {projects_icon && (
                            <span
                                className="top_icon line_none"
                                dangerouslySetInnerHTML={{ __html: projects_icon }}
                            />
                        )}
                        {projects_label && (
                            <p className="stack_top_para mb_0">{projects_label}</p>
                        )}
                    </div>
                    <div className="stack_top_body">
                        {projects_title && <h4>{projects_title}</h4>}
                    </div>
                </div>
                {projects_button && (
                    <div className="projects_button_wrapper">
                        <a href="darshboard.com" className="view_all_btn d_mail_box">
                            {projects_button_icon && (
                                <span className="d_inline_flex"
                                    dangerouslySetInnerHTML={{ __html: projects_button_icon }}
                                />
                            )}
                            <span>{projects_button}</span>
                        </a>
                    </div>
                )}
            </div>
            <div className="stack_icon_list comm_inner d_flex flex_wrap projects_list">
                {project_card?.map((item, index) => (
                    <div   key={index}  className="stack_item stat_item d_flex align_center">
                        <div className="stack_content d_flex align_center flex_column justify_center">
                            <div className="project_card_img w_100">
                                {item.project_card_image?.url && (
                                    <img
                                    src={item.project_card_image.url}
                                    alt={item.project_card_image.alt || item.project_card_title}
                                    className="project_card_img"
                                    />
                                )}
                            </div>

                            <div className="stack_icon_list_inner d_flex flex_column">
                                {item.project_card_title && (
                                    <h6 className="mb_0 stack_title btn_txt">
                                        {item.project_card_title}
                                    </h6>
                                )}
                                {item.project_card_category && (
                                    <div className="stack_label comm_work_txt mb_0">
                                        {item.project_card_category}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Optional Button at the bottom */}

        </div>
    );
};

export default ProjectsComponent;
