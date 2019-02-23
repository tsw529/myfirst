$(function () {
    // 基于准备好的dom，初始化echarts实例
    var echarts_left = echarts.init(document.querySelector('.echarts_left'));

    // 指定图表的配置项和数据
    var option1 = {
        // 大标题
        title: {
            // 标题文本
            text: '2019年注册人数'
        },
        // 提示框组件
        tooltip: {},
        // 图例, 图例一定要和数据项的 name 一一对应
        legend: {
            data: ['销量', '人数']
        },
        // x轴的刻度
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        // y轴的刻度: 应该根据数据动态生成
        yAxis: {},

        // 数据项列表
        series: [{
            name: '销量',
            type: 'bar',   // bar 柱状图   line 折线图   pie  饼图
            data: [1000, 200, 360, 200, 180, 400]
        },
        {
            name: '人数',
            type: 'bar',
            data: [500, 800, 460, 180, 880, 1200]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts_left.setOption(option1);

    // 基于准备好的dom  初始化echarts实例
    var echarts_right = echarts.init(document.querySelector('.echarts_right'));
    var option2 = {
        title: {
            text: '热门品牌销售',
            subtext: '2019年2月',
            x: 'center',
            textStyle: {
                color: 'red',
                fontSize: 25
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿迪', '匡威', 'NB', '李宁']
        },
        series: [
            {
                name: '品牌热销',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '耐克' },
                    { value: 310, name: '阿迪' },
                    { value: 234, name: '匡威' },
                    { value: 135, name: 'NB' },
                    { value: 1548, name: '李宁' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    echarts_right.setOption(option2);
});