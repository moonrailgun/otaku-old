/**
 * Created by Chen on 2016-04-11.
 */

var inventory = require("./app/inventory.json");
var fs = require("fs");

//打开APP窗口
var openAppWin = function (url, index) {
    var dirUrl = './app/' + url + '/';
    var fullUrl = dirUrl + index;
    var packageUrl = dirUrl + 'package.json';
    var options = {};

    fs.access(packageUrl, function (err) {
        if (!err) {
            var data = require(dirUrl + 'package.json');
            if (!!data && !!data.window) {
                options.width = data.window.width;
                options.height = data.window.height;
            }
        }

        console.log(options);
        nw.Window.open(fullUrl, {}, function (win) {
            if(!!options){
                win.width = options.width;
                win.height = options.height;
            }
        });
    })
};

//载入APP列表
var loadApp = function (appConfig) {
    var index = appConfig.index;
    var name = appConfig.name;
    var type = appConfig.type;
    var url = appConfig.url;
    var color = appConfig.color || "primary";
    var icon = appConfig.icon || "inbox";

    var html = '<div class="col-lg-3 col-md-6"><div class="panel panel-' + color + '"><div class="panel-heading">' +
        '<div class="row"><div class="col-xs-3"><i class="icon-' + icon + ' icon-5x"></i></div>' +
        '<div class="col-xs-9 text-right"><div class="huge">26</div>' +
        '<div>' + name + '</div></div></div></div>' +
        '<a href="#" onclick=\'openAppWin("' + url + '","' + index + '");\'><div class="panel-footer">' +
        '<span class="pull-left">打开</span><span class="pull-right">' +
        '<i class="icon-circle-arrow-right"></i></span><div class="clearfix"></div></div></a></div></div>';
    $('#app-wrapper > .row').first().append(html);
};

if (inventory) {
    $('#app-wrapper > .row').first().html('');
    for (var i = 0; i < inventory.length; i++) {
        loadApp(inventory[i]);
    }
}
UpdateShowPageBtnEvent();//更新事件