const data = [80];
const name = 'CPU利用率';
const unit = ' ℃';
let color;
const value = data[0];
if (value > 0 && value < 70) {
    color = [
        {
            offset: 0,
            color: '#00bb00',
        }, {
            offset: 1,
            color: '#38f138',
        }
    ]
} else if (value > 70 && value < 80) {
    color = [
        {
            offset: 0,
            color: '#faeb39',
        }, {
            offset: 1,
            color: '#ecdb11',
        }
    ]
} else {
    color = [
        {
            offset: 0,
            color: '#e74033',
        }, {
            offset: 1,
            color: '#e62314',
        }
    ]
}

option = {
    tooltip: {
        show: true,
        formatter: `${name}: {c}${unit}`
    },
    grid: {
        top: '45%',
        left: '8%',
        right: '8%',
        bottom: '45%',

    },
    yAxis: [{
        type: 'category',
        data: [],
        axisTick: {
            show: false,
        },
        axisLine: {
            show: false,
        },
        axisLabel: {
            textStyle: {
                color: '#000',
            }
        }
    }],
    xAxis: [{
        min: 0,
        max: 100,
        position: 'right',
        axisTick: {
            show: true,
        },
        axisLine: {
            show: false,
        },
        axisLabel: {
            show: true,
            margin: 5,
            formatter: `{value}${unit}`
        },
        splitLine: {
            show: false,

        },
    }],
    series: [
        {
            name: ' ',
            type: 'bar',
            barWidth: '95%',
            itemStyle: {
                borderColor: '#ccc',
                barGap: '0',

            },
            splitLine: {
                show: true,
                interval: 0,
                lineStyle: {
                    color: ['#000']
                }
            },
            silent: true,
            barGap: '-100%',
            data: [{
                value: 100,
                itemStyle: {
                    normal: {
                        barBorderRadius: [0, 0, 0, 0],
                        color: {
                            type: 'linear',
                            x: 1,
                            y: 1,
                            x2: 1,
                            y2: 0,
                            borderColor: '#000',
                            borderWidth: 1,
                            shadowBlur: 0,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#fff',
                                }, {
                                    offset: 1,
                                    color: '#ddd',
                                },
                            ],
                            globalCoord: false,

                        },
                    },
                },

            }],
        },
        {
            type: 'bar',
            barWidth: '95%',
            itemStyle: {
                borderColor: '#ccc',
                barGap: '0',

            },
            barGap: '-100%',
            data: [
                {
                    value: data,
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter(params) {
                                return `${params.value}${unit}`;
                            },
                        },

                    },
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 1,
                                y: 1,
                                x2: 1,
                                y2: 0,
                                colorStops: color,
                                globalCoord: false,

                            },
                        },
                    },

                },
            ],
        },
    ],
};