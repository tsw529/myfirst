$(function(){
  //一进入页面发送ajax请求  获取购物车数据
  //如果已登录  返回购物车数据 
  //如果未登录  后台返回error:400  跳转到登录页
  render() ;
  function render(){
    $.ajax({
      type:'get',
      url:'/cart/queryCart',
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.error===400){
          location.href = 'login.html?retUrl=' + location.href;
          return;
        }
        //后台返回的是一个数组  需要包装成对象
        //通过模板引擎渲染
        var htmlStr = template('cartTpl',{list:info});
        $('#cartList').html(htmlStr);
      }
    });
  }

  //删除功能
  //-事件委托给所有删除按钮  添加点击事件
  //-点击删除按钮时  获取id
  //-发送ajax请求 进行删除 
  //-重新渲染
  $('.lt_main').on('click','.btn_delete',function(){
    var id = $(this).data('id');
    $.ajax({
      type:'get',
      url:'/cart/deleteCart',
      data:{
        id:[id]
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        render();
      }
    })
  })
})