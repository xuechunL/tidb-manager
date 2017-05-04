# React踩坑之路

## 1. 提升渲染性能

### react 组件性能优化探索实践
[react 组件性能优化探索实践](http://imweb.io/topic/577512fe732b4107576230b9)

### 实例说明

[React 爬坑秘籍（一）-- 提升渲染性能](http://www.cnblogs.com/YikaJ/p/4912187.html)

一般来说，React 作为一个高效的 UI Library，如果合理使用是很难出现性能问题的。它内部提供了虚拟 DOM 搭配上 Diff 算法，和子组件必要的 key 属性，都是非常优秀的优化了绝大部分的性能。

但是我们来模拟一个场景，在一个数组里有10000个对象，我们把这个数组的数据渲染出来后，其中一个属性用于控制页面状态。

## 2. Container Components

[Container Components](http://www.cnblogs.com/YikaJ/p/5130809.html)


## React 版本变换

*  RouterContext: React.createClass is deprecated and will be removed in version 16. Use plain JavaScript classes instead. If you're not yet ready to migrate, create-react-class is available on npm as a drop-in replacement.

* Accessing PropTypes via the main React package is deprecated. Use the prop-types package from npm instead.

    With React 15.5, importing PropTypes from React is deprecated in favour of importing from the new 'prop-types' package.

    See this link: 
    [react-v15.5.0](https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html)

    Thus, using react-toolbox with the latest version of react gives a deprecation warning in the console.

## ES6 语法