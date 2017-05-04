// ClusterList.js (Business Component)

import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Column, Cell, HeaderCell } from 'rsuite-table';
import '../lib/rsuite-table/less/index.less';
import './ClusterList.less';

const clusters = [
    {id:1, name:'a', tidb:1, pd:1, tikv: 3, email: 'Leora13@yahoo.com', date: '2016-09-23T07:57:40.195Z'},
    {id:2, name:'b', tidb:2, pd:2, tikv: 3, email: 'Mose_Gerhold51@yahoo.com', date: '2017-03-06T09:59:12.551Z'},
    {id:3, name:'c', tidb:3, pd:2, tikv: 3, email: 'Eloisa.OHara@hotmail.com', date: '2016-07-19T12:54:30.994Z'},
    {id:4, name:'d', tidb:2, pd:2, tikv: 3, email: 'Brisa46@hotmail.com', date: '2017-02-23T17:11:53.875Z'},
    {id:5, name:'e', tidb:2, pd:2, tikv: 3, email: 'Cody.Schultz56@gmail.com', date: '2016-06-30T05:23:18.734Z'},
    {id:6, name:'f', tidb:3, pd:2, tikv: 4, email: 'Enrico_Beer@yahoo.com', date: '2017-03-13T21:09:47.253Z'}
];

const DateCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>
    {rowData[dataKey].toLocaleString()}
  </Cell>
);

const ImageCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>
    <img src={rowData[dataKey]} width="50" />
  </Cell>
);

const EmailCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>
    <a href={'mailto:' + rowData[dataKey]}>{rowData[dataKey]}</a>
  </Cell>
);

const ActionCell = ({ rowData, dataKey, ...props }) => {
  function handleAction() {
// TODO: Actions handler
    alert(`id:${rowData[dataKey]}`);
    console.log(rowData, dataKey);
  }
  return (
    <Cell {...props}>
      <a onClick={handleAction} href="javascript:;"> Check </a>
      |
      <a onClick={handleAction} href="javascript:;"> Resize </a>
      |
      <a onClick={handleAction} href="javascript:;"> Remove </a>
    </Cell>
  );
};

const preloadImage = path => new Promise((resolve, reject) => {
  let image = new Image();
  image.onload  = resolve;
  image.onerror = reject;
  image.src     = path;
  image.width   = "50";
});

const ClusterList = React.createClass({
  getInitialState() {
    return {
      data: clusters
    };
  },
  handleSortColumn(sortColumn, sortType) {
    this.setState({sortColumn, sortType});
  },
  render() {
    const { data } = this.state;
	// 父组件通过 props 属性传递数据给子组件
		return (
		<div>
		<Table height={400} data={data} rowHeight={64} headerHeight={36} className="clusters">

			<Column width={160} >
				<HeaderCell>Cluster Name</HeaderCell>
				<Cell dataKey="name" />
			</Column>

			<Column width={120} >
				<HeaderCell>TiDB Nodes</HeaderCell>
				<Cell dataKey="tidb" />
			</Column>

			<Column width={120} >
				<HeaderCell>PD Nodes</HeaderCell>
				<Cell dataKey="pd" />
			</Column>

			<Column width={120} >
				<HeaderCell>TiKV Nodes</HeaderCell>
				<Cell dataKey="tikv" />
			</Column>

			<Column width={300} >
				<HeaderCell>Email</HeaderCell>
				<EmailCell dataKey="email" />
			</Column>

			<Column width={300} >
				<HeaderCell>Date</HeaderCell>     
				<DateCell dataKey="date" />
			</Column>

			<Column width={300} >
				<HeaderCell>Action</HeaderCell>
				<ActionCell dataKey="id" />
			</Column>

	</Table>
	</div>);}
});

export default ClusterList;