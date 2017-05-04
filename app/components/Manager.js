// Manager.js (Container Component)

import React from 'react';
import CreateBtn from './CreateBtn.js';
import ClusterList from './ClusterList.js';
import Cluster from './Cluster.js';

export default class Manager extends React.Component {

  getCreate() {
    return <CreateBtn action= "Create Cluster" />
  }

  getClusterList() {
    return <ClusterList />
  }

  getCluster() {
    return <Cluster />
  }

  render() {
    return ( 
    	< div className = "manager" >
	      	<h1>TiDB Manager</h1>
          {this.getCreate()}
          {this.getClusterList()}
          {this.getCluster()}
	    < /div>
    );
  }
}