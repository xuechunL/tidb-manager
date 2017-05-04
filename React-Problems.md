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

## 3. Component 的状态和数据流

-  props 与 state 的区别
    
> State
> 如果 component 的某些状态需要被改变，并且会影响到 component 的 render，那么这些状态就应该用 state 表示。 例如：一个购物车的component，会根据用户在购物车中添加的产品和产品数量，显示不同的价格，那么“总价”这个状态，就应该用 state 表示。

> Props
> 如果 component 的某些状态由**外部**所决定，并且会影响到 component 的 render，那么这些状态就应该用 props 表示。 例如：一个下拉菜单的 component，有哪些菜单项，是由这个 component 的使用者和使用场景决定的，那么“菜单项”这个状态，就应该用 props 表示，并且由外部传入。

需要理解的是，props 是一个父组件传递给子组件的数据流，这个数据流可以一直传递到子孙组件。而 state 代表的是一个组件内部自身的状态（可以是父组件、子孙组件）。
改变一个组件自身状态，从语义上来说，就是这个组件内部已经发生变化，有可能需要对此组件以及组件所包含的子孙组件进行重渲染。
而 props 是父组件传递的参数，可以被用于显示内容，或者用于此组件自身状态的设置（部分 props 可以用来设置组件的 state），不仅仅是组件内部 state 改变才会导致重渲染，父组件传递的 props 发生变化，也会执行。
既然两者的变化都有可能导致组件重渲染，所以只有理解 props 与 state 的意义，才能很好地决定到底什么时候用 props 或 state。

more: [https://github.com/uberVU/react-guide/blob/master/props-vs-state.md](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)

## React 版本变换

*  RouterContext: React.createClass is deprecated and will be removed in version 16. Use plain JavaScript classes instead. If you're not yet ready to migrate, create-react-class is available on npm as a drop-in replacement.

* Accessing PropTypes via the main React package is deprecated. Use the prop-types package from npm instead.

    With React 15.5, importing PropTypes from React is deprecated in favour of importing from the new 'prop-types' package.

    See this link: 
    [react-v15.5.0](https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html)

    Thus, using react-toolbox with the latest version of react gives a deprecation warning in the console.

### React 15.3

- React.PureComponent 
    [在React.js中使用PureComponent的重要性和使用方式](http://www.zcfy.cc/article/why-and-how-to-use-purecomponent-in-react-js-60devs-2344.html?utm_source=tuicool&utm_medium=referral)

## ES6 语法