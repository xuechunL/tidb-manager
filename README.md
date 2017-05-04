# TiDB Manager

TiDB Manager with React.

## root
main.js

## Components
Manager Module
    + Manager (Container Components)
        - Actions Component (UI Components)
            + Create Cluster
        - ClustersList Component (Business Components) -> table
            + ClusterItem Component -> tr
                - infos -> name tidb_count pd_count tikv_count
                - actions -> resize checkinfo delete
        - ClusterTopo Component (Business Components)
            + Node Component
                * TiDB
                * PD
                * TiKV
            + Tips Component
            + Monitor Component

## Code Style

- CSS
    +  LESS / SCSS PreProcessors
    
- JS
    + ES6 Standard
    + Use [ESLint](http://eslint.cn/docs/user-guide/configuring)

    [JS校验工具比较](http://zhenhua-lee.github.io/tools/linter.html)



