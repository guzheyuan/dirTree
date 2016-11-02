# dirTree

以树状图列出目录的内容的nodejs实现，类似于linux下的tree命令

dfs遍历目录得到一个树状的json对象：
```
{
  "name": 'dirTree',
  "type": 'dir',
  childD: [{
    name: 'lib',
    type: 'dir',
    childD: [],
    childF: [{name: 'dirTree.js', type: 'file'}]
  }],
  childF: [{name: 'package.json', type: 'file'},
    {name: 'test.js', type: 'file'}]
}
```


打印树状图：
```
dirTree
  │
  ├lib
  │  │
  │  └dirTree.js
  │
  ├README.md
  │
  └test.js
```
