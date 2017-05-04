import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Manager from './components/Manager.js';


// 获取数据的异步 AJAX 请求操作
var getData = function(url) {
  //创建一个 Promise 实例
  var promise = new Promise(function(resolve, reject) {
    //发送 ajax 请求 - 未来将要发生的事情（异步操作）
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response); //将异步操作（ajax请求）的结果暴露出来
      } else {
        reject(new Error(this.statusText));
      }
    };

  });

  return promise; //返回生成的 Promise 实例

};

// Test Promise.all() 
var getJSON = url => {
	return new Promise((resolve, reject) => { 
		if(url)
			resolve(url);
		else
			reject(new Error(url));
	});
}

//使用构造函数生成 Promise 实例之后， 可通过 then 方法指定异步操作变为 Resolved 和 Rejected 状态的回调函数
//then()方法接受两个参数， 第一个是 reslove 状态的回调函数（异步操作成功），第二个参数是 rejected 状态的回调函数（可省略）
getData("http://localhost:3000/pingcap.com/api/v1/clusters").then(
	response => {
		if(response.code == 200)
			console.log(response.data);
    	return getData("http://localhost:3000/pingcap.com/api/v1/cluster?cluster_name=demo");
	}, function(error) {
  console.error('出错了', error);
}).then(function(response) {
  if (response.code == 200)
    ReactDOM.render( <Manager /> ,
      document.querySelector('#app')
    );
}).catch(function(error) {
    // error
    console.error('出错了', error);
});


// 生成一个 Promise 对象的数组 -> 是一个 iterator 接口
var promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON("/post/" + id + ".json");
});

Promise.all(promises).then(function (posts) {
  // resolved 状态的回调函数
  console.log(posts)
}).catch(function(reason){
  // rejected 状态的回调函数
  console.error(reason)
});
