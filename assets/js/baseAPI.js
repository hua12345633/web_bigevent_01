// 1.开发环境服务器地址
var basrURL="http://ajax.frontend.itheima.net"
$.ajaxPrefilter(function(params){
    console.log(params.url);
    params.url=basrURL+params.url;
    console.log(params.url);
})