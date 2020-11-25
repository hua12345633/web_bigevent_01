$(function () {
    // 1.点击去注册，隐藏登录界面，显示注册界面
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 1.点击去登录，隐藏注册界面，显示登录界面
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    // 从layui中获得的方法需先从layui获取
    var form = layui.form;
    // 2.自定义密码和用户名的校验规则
    form.verify({
        username: [
            /^[a-zA-Z0-9_-]{4,16}$/, '用户名必须4到16位（字母，数字，下划线，减号）'
        ],
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return "两次密码输入不一致！！！"
            }
        }
    });
    // 3.注册表单发起ajax请求
    var layer = layui.layer;
    $('#form_reg').on("submit", function (e) {
        e.preventDefault();
        data = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val()
        }
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    });

                }
                layer.msg("注册成功,请登录", {
                    icon: 6
                });
                $('#link_login').click();
                // 重置form表单，清空注册表单里面的内容
                $('#form_reg')[0].reset();
            }
        })
    })

    // 4.登录表单发起ajax请求
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    });
                }
                layer.msg("登陆成功", {
                    icon: 6
                });
                localStorage.setItem('token', res.token);
                // location.href='/index.html';
            }
        })

    })
})