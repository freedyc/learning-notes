const times = (t, c) => [...Array(t)].map((it, index) => c(index));
const random = (s=1, e=100) => Math.ceil(Math.random() * (e-s)) + s;
const genData = (index) => [Date.now() + index, random()];
const legendData = ["DISCOVER", "OFFER", "REQUEST", "ACK", "DECLINE", "NAK", "RELEASE", "INFORM"];
const legendSelected = { DISCOVER: true, OFFER: true, REQUEST: true, ACK: false, DECLINE: false, NAK: false, RELEASE: false, INFORM: false  };
const data = times(10, (index) => ({ DISCOVER: genData(index), OFFER: genData(index), REQUEST: genData(index), ACK: genData(index), DECLINE: genData(index), NAK: genData(index), RELEASE: genData(index), INFORM: genData(index)  }));
const series = legendData.map((name) => ({
    name,
    type: 'line',
    symbolSize: 6,
    symbol: 'circle',
    showSymbol: false,
    hoverAnimation: false,
    areaStyle: { normal: {} },
    itemStyle: { normal: { opacity: 0.7 } },
    data: data.map((it) => it[name]),
}))

option = {
    tooltip: {
        trigger: 'axis',
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
    },
    animation: false,
    legend: {
        type: 'scroll',
        width: '80%',
        data: legendData,
        selected: legendSelected,
        itemWidth: 15,
        itemHeight: 15,
        icon: 'rect',
    },
    grid: {
        left: '8%',
        right: '4%',
        bottom: '10%',
        top: '10%',
        containLabel: false,
    },
    xAxis: {
        type: 'time',
        axisLine: {
            show: false,
            lineStyle: {
                color: '#888',
            },
        },
        axisTick: {
            show: false,
        },
        splitLine: {
            show: false,
        },
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false,
        },
        splitLine: {
            show: true,
            lineStyle: {
                width: 2,
                opacity: 0.8,
            },
        },
        axisLabel: {
            formatter: '{value}',
        },

    },
    series,
};