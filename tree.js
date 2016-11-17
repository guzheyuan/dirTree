var dirTree = require('./lib/dirTree')
var cfg = require('./conf.js')
var fs = require('fs')


var jsonObj = dirTree.dirDFS(cfg.path, cfg.name, cfg.ignoreList);
var str = dirTree.stringifyDirTree(jsonObj, cfg.outputType);

if(cfg.type == "console") {
    // 输出到控制台
    console.log(str);
} else {
    // 输出到文件
    
}
