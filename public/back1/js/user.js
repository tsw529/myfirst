$(function () {
    //一进入页面发送ajax请求,渲染页面
    var pageSize = 5;
    var currentPage = 1;
    var currentId;
    var isDelete;
    render();
    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('userTpl', info);
                //渲染页面
                $('tbody').html(htmlStr);


                //根据请求回来的数据  完成分页的初始化显示
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                })

            }
        })
    }

    // 点击按钮 显示模态框
    //注册事件委托
    $('tbody').on('click','.btn',function(){
        //显示模态框
        $('#userModal').modal('show');

        //获取id  
        currentId =$(this).parent().data('id') ;

        //获取启用禁用状态
        //禁用按钮 ? 改成禁用状态 0 :改成启用状态1
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1 ;
    });

    //给模态框的确定按钮   添加点击事件
    $('#confirmBtn').click(function(){
        //发送ajax请求  完成用户状态的编辑
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:currentId,
                isDelete:isDelete
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                if(info.success){
                    //关闭模态框
                    $('#userModal').modal('hide');
                    //重新渲染
                    render();
                }
                
            }
        })
    })
})