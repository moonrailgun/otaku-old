/**
 * Created by Chen on 2016-04-10.
 */

var currentAjax;
var UpdateShowPageBtnEvent = function(){
    $('.show-page').click(function(){
        if($(this).get(0).tagName == 'A'){
            $('.active').removeClass('active');
            $(this).addClass('active');
        }

        var pageUrl = $(this).data('page');
        if(!!currentAjax) {
            currentAjax.abort();
            delete currentAjax;
        }

        currentAjax = $.get(pageUrl, function(data,status){
            $('#page-wrapper').html(data);
            UpdateShowPageBtnEvent();
        });
    });
};

$(function(){
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100;
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        var width = ((this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width) - 1;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height - 1) + "px");
            $("#page-wrapper").css("min-width", (width - 250) + "px");
        }
    });

    UpdateShowPageBtnEvent();
    $.get('page/app.html', function(data,status){
        $('#page-wrapper').html(data);
    });
});