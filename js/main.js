/**
 * Created by Chen on 2016-04-10.
 */


$(function(){
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height - 1) + "px");
        }
    });

    $('ul.nav li a').click(function(){
        $('.active').removeClass('active');
        $(this).addClass('active');

        var pageUrl = $(this).data('page');
        $.get(pageUrl, function(data,status){
            $('#page-wrapper').html(data);
        });
    })
});