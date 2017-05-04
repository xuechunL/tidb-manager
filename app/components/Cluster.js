// Cluster.js (Business Component)

import React from 'react';
import ReactDOM from 'react-dom';
import Node from './Node.js'
import './Cluster.less';

const payload = [{
        name: "demo-1",
        pd_count: 1,
        tikv_count: 3,
        tidb_count: 1,
        pd_version: "v0.1.0",
        tidb_version: "v0.1.0",
        tikv_version: "v0.1.0",
        root_password: "",
        created_at: "2017-04-27T09:36:23Z",
        tidb_ip: "192.168.99.100",
        tidb_port: 32158,
        monitor_ip: "192.168.99.100",
        monitor_port: 31904,
        pd_status: [{
          name: "demo-pd-0000",
          pod_ip: "172.17.0.7",
          node_ip: "192.168.99.100",
          status: "Running"
        }],
        tidb_status: [{
          name: "demo-tidb-0000",
          pod_ip: "172.17.0.10",
          node_ip: "192.168.99.100",
          status: "Running"
        }],
        tikv_status: [{
          name: "demo-tikv-0000",
          pod_ip: "172.17.0.6",
          node_ip: "192.168.99.100",
          status: "Running"
        }, {
          name: "demo-tikv-0001",
          pod_ip: "172.17.0.9",
          node_ip: "192.168.99.100",
          status: "Running"
        }, {
          name: "demo-tikv-0002",
          pod_ip: "172.17.0.11",
          node_ip: "192.168.99.100",
          status: "Running"
        }]
      },{
      	name: "demo-2",
        pd_count: 1,
        tikv_count: 3,
        tidb_count: 1,
        pd_version: "v0.1.0",
        tidb_version: "v0.1.0",
        tikv_version: "v0.1.0",
        root_password: "",
        created_at: "2017-04-27T09:36:23Z",
        tidb_ip: "192.168.99.100",
        tidb_port: 32158,
        monitor_ip: "192.168.99.100",
        monitor_port: 31904,
        pd_status: [{
          name: "demo-pd-0000",
          pod_ip: "172.17.0.7",
          node_ip: "192.168.99.100",
          status: "Running"
        }],
        tidb_status: [{
          name: "demo-tidb-0000",
          pod_ip: "172.17.0.10",
          node_ip: "192.168.99.100",
          status: "Running"
        }],
        tikv_status: [{
          name: "demo-tikv-0000",
          pod_ip: "172.17.0.6",
          node_ip: "192.168.99.100",
          status: "Running"
        }, {
          name: "demo-tikv-0001",
          pod_ip: "172.17.0.9",
          node_ip: "192.168.99.100",
          status: "Running"
        }, {
          name: "demo-tikv-0002",
          pod_ip: "172.17.0.11",
          node_ip: "192.168.99.100",
          status: "Running"
        }]
      }];

export default class Cluster extends React.Component {
	getCluster() {
		// TODO： 异步请求获取 cluster 信息
		return payload;
	}
	getName(cluster) {
	    return cluster.name;
	}
	getMonitorIP(cluster) {
		var monitor_ip = cluster.monitor_ip ? cluster.monitor_ip.split(',')[0] : 'localhost',
        monitor_port = cluster.monitor_port,
        url = 'http://' + monitor_ip + ':' + monitor_port;
	    return url;
	}
  	render() {
	    // 父组件通过 props 属性传递数据给子组件
	    // 考虑多节点

	    return (
	    	<div className="cluster-container f-cb">
	    	{
              this.getCluster().map((cluster, index) => 
              	(
                    <div className="cluster" key={cluster.name}>
                    	<p>{cluster.name}</p>

                    	{
                    		cluster.tidb_status.map((node, index) => 
                    			(
                    				<Node node={node} key={index} />
                    			)
                    		)
                    	}
                    </div>
                )
              )
            }
	    	</div>
	    	
	    );
	}
}