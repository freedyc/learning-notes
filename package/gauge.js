
const name = 'CPU利用率';
const data = 50;

option = {
    tooltip: {
        formatter: '{b} : {c}%',
    },
    series: [
        {
            name,
            type: 'gauge',
            center: ['50%', '70%'],
            detail: {
                offsetCenter: [0, '30%'],
                formatter: '{value}%',
            },
            data: [{ value: data || 0, name }],
            radius: '90%',
            startAngle: 180,
            endAngle: 0,
            splitNumber: 10,
            axisLine: {
                show: true,
                lineStyle: {
                    color: [[0.8, '#00bb00'], [0.9, '#ffeb3b'], [1, '#f44336']],
                    width: 25,
                },
            },
            splitLine: {
                show: true,
                length: 30,
            },
            axisTick: {
                show: true,
                splitNumber: 5,
                length: 8,
            },
            axisLabel: {
                show: true,
                distance: -65,
            },
            pointer: {
                width: 10,
                length: '70%',
            },
            title: {
                show: false,
            },
        },
        {
            name,
            type: 'gauge',
            center: ['50%', '70%'],
            detail: {
                show: false,
            },
            radius: '92%',
            startAngle: 180,
            endAngle: 0,
            splitNumber: 10,
            axisLine: {
                show: true,
                lineStyle: {
                    color: [[0.8, '#00bb00'], [0.9, '#ffeb3b'], [1, '#f44336']],
                    width: 2,
                },
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            pointer: {
                show: false,
            },
            title: {
                show: false,
            }
        }
    ],
};