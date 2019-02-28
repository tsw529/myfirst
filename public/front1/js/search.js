/* 
    以下3行代码, 在控制台执行, 可以添加假数据
    var arr = [ '耐克', '阿迪', '老北京', '耐克王' ];
    var jsonStr = JSON.stringify(arr);
    localStorage.setItem('search_list', jsonStr);
  */

  //功能1:历史记录渲染功能
  //功能2:清除全部历史记录
  //功能3:删除单个历史记录
  //功能4:添加单个历史记录

  //1历史记录渲染功能
  //思路:
  //-获取本地历史 
  //-获取得到的是jsonStr  需要转成数组
  //-渲染搜索历史列表

  render();
  //读取本地存储  并返回历史记录数组
  function getHistory(){
    var jsonStr = localStorage.getItem('search_list',) || '[]' ;
    var arr = JSON.parse(jsonStr) ;
    return arr;
  }

  //读取本地存储  获取数组  渲染历史记录
  function render(){
    var arr = getHistory();
    //通过模板引擎渲染
    var htmlStr = template('searchTpl',{arr:arr});
    $('.lt_history').html(htmlStr) ;
  }

  //功能2 清空历史记录
  // 思路 -点击清空按钮(事件委托)
  //      -移除本地历史数据 
  //      -页面重新渲染
  $('.lt_history').on('click','.btn_empty',function(){
    mui.confirm('你确认要清空历史记录吗','温馨提示',['取消','确认'],function(e){
      if(e.index === 1 ){
        //确认 完成清空
        localStorage.removeItem('search_list');
        render();
      }
    })
  });

  //功能3 :删除单个历史记录
  // 思路
  //-给删除按钮添加点击事件(事件委托)
  //-从本地获取对应的数组
  //-将该条数据 根据下标  从数组中删除
  //-将已经修改后的数组  存回本地
  //-页面重新渲染
  $('.lt_history').on('click','.btn_delete',function(){
    //获取本地数组
    var arr = getHistory();
    //获取index  根据index 在数组中删除对应项
    var index = $(this).data('index');
    arr.splice(index,1);
    //将修改后的数组  存回本地
    localStorage.setItem('search_list',JSON.stringify(arr));
    //重新渲染
    render();
  });


  //功能4 添加单个历史记录功能
  //思路 -点击搜索按钮 获取input的value值 添加到数组中
  //    - 转成jsonStr 存回本地 
  //    - 重新渲染

  $('.search_btn').click(function(){

    //获取搜索关键字
    var key = $('.search_input').val().trim();
    if(key ===''){
      //mui的提示框
      mui.toast('请输入搜索关键字');
      return;
    }
    //获取数组
    var arr = getHistory();
    //1去重  如果有重复的需要删除
    var index = arr.indexOf(key);
    if(index != -1){
      //说明找到了重复项  有下标了  可以删除
      arr.splice(index,1);
    }
    //如果长度超过10  删除最早搜索的  删除数组的最后一个
    if(arr.length >= 10){
      arr.pop();
    }
    //往数组的最前面添加 
    arr.unshift(key);

    //存到本地 
    localStorage.setItem('search_list',JSON.stringify(arr));

    //重新渲染
    render();

    //清空内容
    $('.search_input').val('');
  })
