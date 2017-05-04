// ClusterTopo.js (Business Component)

import React from 'react';
import './Node.less';

// const tooltip = (
//     <Popover title="Popover">
//        This is a <i>popover</i> .
//     </Popover>
// );

export default class Node extends React.Component {
  clickHandler() {
    //TODO
  }

  render() {
    // 父组件通过 props 属性传递数据给子组件

    return ( < button className = "node"
      onClick = { this.clickHandler } > { this.props.node.name } < /button>
    );
  }
}
