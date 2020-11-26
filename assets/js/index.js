$(function () {
    // 1.用于获取用户信息
    getUserInfo();
    // 4.退出登录
    var layer=layui.layer
    $('#logout').on('click',function(){
        //layui的结构
        layer.confirm('是否确认退出？', {icon: 3, title:'提示'}, function(index){
            // 清空本地存储
            localStorage.removeItem("token");
            //跳转页面
            location.href="/login.html";         
            layer.close(index);
          });
    })
});

//2.获取信息（必须封装到入口函数的外面，后面其他页面要调用）
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     //重新登录。token过期时间12小时
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function (res) {
            console.log(res);
            if(res.status!==0){
                return layui.layer.msg(res.message);
            }
            //请求成功，渲染用户头像
            renderAvatar(res.data);
        }
    })
}
// 3.用户渲染头像函数
function renderAvatar(user){
    // 1.设置用户名
    var name =user.nickname||user.username;
    $('#welcome').html("欢迎&nbsp;&nbsp;"+name);
    // 2.设置用户头像
    if(user.user_pic!==null){
        $('.layui-nav-img').attr("src",user.user_pic).show();
        $('.text-avatar').hide();
    }else{
        $('.layui-nav-img').hide();
        var frist=name[0].toUpperCase();
        $('.text-avatar').html(frist).show();
    }
}