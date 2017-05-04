// CreateBtn.js (UI Component)

import React from 'react';
import {
	Button,
	Popover
} from 'rsuite';

// var AMUIReact = require('amazeui-react');
// var Button = AMUIReact.Button;

export default class CreateBtn extends React.Component {
	createHandler () {
		// TODO: Create a Cluster
		
	}

	render() {
	    // 父组件通过 props 属性传递数据给子组件

	    return (
		      	<Button shape='primary' onClick={this.createHandler}>{this.props.action}</Button>
	    );
	}
}
