import React from 'react';
import { BarChart } from 'react-d3';

var barData = [
  {label: 'A', value: 5},
  {label: 'B', value: 6},
  {label: 'F', value: 7}
];

<BarChart data={barData} width={500} height={200} fill={'#3182bd'} title='Bar Chart' />