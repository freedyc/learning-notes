import { useEffect, useRef, useState } from 'react';
import ReactECharts from "echarts-for-react";
const HMLable = {
  formatter: ['{a|  }', '{b| {b}}'].join(''),
  rich: {
    a: {
      fontSize: 15,
      backgroundColor: {
        image: 'data:image/png;base64,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'
      }
    }
  }
}
const data = {
  name: "zdns.cn",
  collapsed: false,
  children: [
    {
      name: "pool1",
      data: {
        type: 'A',
        ttl: '3600',
        hms: ['icmp1'],
        name: 'pool1',
      },
      collapsed: false,
      label: HMLable,
      lineStyle: {
        color: 'green'
      },
      children: [
        {
          name: "dc1-1.2.2.3:34",
        },
        {
          name: "dc2-1.2.2.3:34",
          lineStyle: {
            color: 'green'
          },
        },
        {
          name: "dc1-3.2.2.3:34",
        },
        {
          name: "dc1-4.2.2.3:34",
        },
      ],
    },
    {
      name: "pool2",
      collapsed: false,
      label: HMLable,
      data: {
        type: 'A',
        ttl: '3600',
        hms: ['icmp1'],
        name: 'pool3',
      },
      children: [
        {
          name: "dc1-1.2.2.3:34",
          data: {
            type: 'A',
            ttl: '3600',
            hms: ['icmp1', 'icmp3'],
            name: 'dc1-1.2.2.3:34',
          },
        },
        {
          name: "dc2-1.2.2.3:34",
        },
        {
          name: "dc1-3.2.2.3:34",
        },
        {
          name: "dc1-4.2.2.3:34",
        },
      ],
    },
    {
      name: "pool-0003",
      collapsed: false,
      children: [
        {
          name: "dc1-1.2.2.3:34",
        },
        {
          name: "dc2-1.2.2.3:34",
        },
        {
          name: "dc1-3.2.2.3:34",
        },
        {
          name: "dc1-4.2.2.3:34",
        },
      ],
    },
    {
      name: "pool1",
      collapsed: false,
      children: [
        {
          name: "dc1-1.2.2.3:34",
        },
        {
          name: "dc2-1.2.2.3:34",
        },
        {
          name: "dc1-3.2.2.3:34",
        },
        {
          name: "dc1-4.2.2.3:34",
        },
      ],
    },
  ],
};

const Tree = () => {
  const chartInstance = useRef<any>(null!);
  useEffect(() => {
    const echartInstance = chartInstance.current.getEchartsInstance();
    console.log(echartInstance);
  })
  const clickFn = (params: any) => {
    
    const echartInstance = chartInstance.current.getEchartsInstance();
    console.log(params, echartInstance)
    if(params.event.target.culling === true){
    } else if(params.event.target.culling === false){
      echartInstance.setOption({ symbolSize: 12 })
    }
  }
  const option = {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      hideDelay: 1000,
      enterable: true
    },
    series: [
      {
        type: "tree",
        data: [data],
        top: "1%",
        left: "7%",
        bottom: "1%",
        right: "20%",
        symbolSize: 7,
        // roam: true,
        label: {
          position: "left",
          verticalAlign: "middle",
          align: "right",
          fontSize: 9,
        },
        lineStyle: {
          curveness: 0.3,
          width: 0.5
        },
        emphasis: {
          focus: "ancestor",
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        },
        tooltip: {
          formatter: (p1: any, p2: any) => {
            console.log(p1, p2)
            const s = p1.data?.data || {};
            const str = Object.keys(s).map(it => `<div>${it}: ${s[it]}</div>`)
            return str.join('')
          }
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
      },
    ],
  };
  return (
    <div>
      <h3>Echart Tree</h3>
      <ReactECharts option={option} onEvents={{ click: clickFn }} ref={chartInstance}/>
    </div>
  );
};

export default Tree;
