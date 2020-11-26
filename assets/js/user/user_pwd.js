$(function () {
    // 1.验证表单
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var newPwd = $('[name=newPwd]').val();
            if(value!==newPwd){
                return "两次密码输入不一致！！"
            }
        },
        samepwd:function(value){
            var oldpwd=$('[name=oldpwd]').val();
            if(value!==oldpwd){
                return "新密码和旧密码不能相同！"
            }
        }
    })
// 2.重置密码
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg("修改密码成功");
                $('.layui-form')[0].reset();
            }
        })
    })
    

})