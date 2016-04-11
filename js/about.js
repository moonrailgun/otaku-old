/**
 * Created by Chen on 2016-04-11.
 */

$(function(){
    $('#nw-version').text(nw.process.versions['nw']);
    $('#node-version').text(nw.process.versions['node']);
    $('#chromium-version').text(nw.process.versions['chromium']);
});