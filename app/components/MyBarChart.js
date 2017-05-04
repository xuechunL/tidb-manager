import React from 'react';
import { BarChart } from 'react-d3';

var barData = [
  {label: 'TiDB', value: 1},
  {label: 'PD', value: 1},
  {label: 'TiKV', value: 3}
];

export default class MyBarChart extends React.Component {

  render() {
    // 父组件通过 props 属性传递数据给子组件

    return (
			<BarChart data={barData} width={500} height={200} fill={'#3182bd'} title='Bar Chart' />
    );
  }
}