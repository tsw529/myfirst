$(function () {
  //获取地址栏商品的id
  var productId = getSearch('productId');

  //一进入页面  发送ajax请求  根据id 请求商品详情的数据
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id: productId
    },
    dataType: 'json',
    success: function (info) {
      console.log(info);
      var htmlStr = template('productTpl', info);
      $('.lt_main .mui-scroll').html(htmlStr);

      //初始化轮播图  获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
      });


      //初始化数字框
      mui('.mui-numbox').numbox();
    }
  });
//给尺码添加可选功能(事件委托)
$('.lt_main').on('click','.lt_size span',function(){
  //给自己加上current类 移除其他的current
  $(this).addClass('current').siblings().removeClass('current');

});
//加入购物车功能  正常发请求 如果后面返回400  说明用户未登录 跳转到登录页即可
$('#addCart').click(function(){
  //获取size 尺码 和 num 数量
  var size = $('.lt_size span.current').text() ;
  if(!size){
    mui.toast('请选择尺码');
    return;
  }
  var num = $('.mui-numbox-input').val();

  $.ajax({
    type:'post',
    url:'/cart/addCart',
    data:{
      size:size,
      num:num,
      productId:productId
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      if(info.error===400){
        location.href='login.html?retUrl=' + location.href ;
        return;
      }
      if(info.success){
        //已登录  加入购物车成功  给用户成功提示
        mui.confirm('加入成功','温馨提示',['去购物车','继续浏览'],function(e){
          console.log(e);
          //e.index  标记用户点击的按钮的下标
          if(e.index === 0){
            location.href = 'cart.html' ;
          }
        })
      }
      
    }
  })
})
})