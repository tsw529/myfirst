$(function () {
    /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
    //进行表单校验初始化
    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            // 用户名
            username: {
                message: '用户名验证失败',
                validators: {
                    //非空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度为2-6位'
                    }
                }
            },
            password:{
                message:'密码验证失败',
                validators: {
                    //非空
                    notEmpty:{
                        message:'密码不能为空',
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度为6-12位',
                    }
                }
            }
        }
    })

    /* 
    2. 使用 submit 按钮, 会进行表单提交, 此时表单校验插件会立刻进行校验
       (1) 校验成功, 此时会默认提交, 发生页面跳转,  注册表单校验成功事件, 在事件中阻止默认的跳转提交, 通过ajax提交
       (2) 校验失败, 自动拦截提交

      注册表单校验成功事件, 在事件中阻止默认的提交, 通过ajax提交
  */
 $('#form').on('success.form.bv', function( e ) {
     //阻止默认的提交
     e.preventDefault() ;
     
     $.ajax ({
         type:'post',
         url:'/employee/employeeLogin',
         data:$('#form').serialize(),
         dataType:'json',
         success:function(info){
             if(info.error === 1000){
                 alert('用户名不存在');
             }
             if(info.error === 1001){
                 alert('密码错误') ;
             }
             if(info.success){
                 //登录成功
                 location.href = 'index.html';
             }
         }
     })
 })
}) 
