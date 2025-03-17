import $ from "jquery";


$(window).scroll(function () {
    var sticky = $("body"),
        scroll = $(window).scrollTop();

    if (scroll >= 80) sticky.addClass("fixed");
    else sticky.removeClass("fixed");
});