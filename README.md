# dirTree

以树状图列出目录内容的nodejs实现，类似于linux下的tree命令

## 结构

dirTree  －－－－－－根目录
  │
  ├lib  －－－－－－相关函数目录
  │  │
  │  └dirTree.js  －－－－－－相关函数接口
  │
  ├README.md  －－－－－－说明文档
  │
  ├conf.js  －－－－－－配置文件
  │
  └tree.js  －－－－－－入口文件


## 例子

配置conf.js
```JavaScript
module.exports = {
    "name": "dirTree",       // 根目录名 
    "path": "./",            // 根目录路径
    "ignoreList": [/^\./],   // 忽略列表，当正则匹配成功时忽略该文件／目录
    "type": "console"        // 打印方式，console表示打印到控制台
}
```

运行tree.js
```
node tree.js
```

程序将会dfs遍历目录得到一个树状的json对象：
```
{
  name: 'dirTree',
  type: 'dir',
  childD: [{
    name: 'lib',
    type: 'dir',
    childD: [],
    childF: [{name: 'dirTree.js', type: 'file'}]
  }],
  childF: [{name: 'conf.js', type: 'file'},
    {name: 'tree.js', type: 'file'}]
}
```

打印树状图到控制台：
```
dirTree
  │
  ├lib
  │  │
  │  └dirTree.js
  │
  ├README.md
  │
  ├conf.js
  │
  └tree.js
```


