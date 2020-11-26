// 1.开发环境服务器地址
var basrURL = "http://ajax.frontend.itheima.net"
$.ajaxPrefilter(function (params) {
    // 1.添加根路径
    console.log(params.url);
    params.url = basrURL + params.url;
    console.log(params.url);
    // 2.为有权限的接口统一设置请求头
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    //3.拦截所有响应，判断身份信息
    params.complete = function (res) {
        console.log(res);
        if (res.responseJSON.status == 1 && res.responseJSON.message === "身份认证失败！") {
            localStorage.removeItem("token");
            location.href="/login.html";
        }

    }
})