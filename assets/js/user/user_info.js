$(function () {
    // 1.自定义校验规则
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度1-6之间"
            }
        }
    })

    // 2.用户信息获取/赋值
    initUserInfo();
    var layer = layui.layer;
    //封装
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                console.log(res);
                //获取数据成功后渲染
                form.val("formUserInfo", res.data)
            }
        })
    }

    //3.重置表单
    $('#btnReset').on('click', function (e) {
        // 阻止重置
        e.preventDefault();
        //从新用户渲染
        initUserInfo();
    })
    // 4.修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                // 调用父页面的方法更新用户信息和头像
                window.parent.getUserInfo();
            }
        })
    })








})