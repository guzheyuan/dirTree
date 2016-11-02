var dirTree = require('./lib/dirTree')

var jsonObj = dirTree.dirDFS("./", "dirTree", [/^\./]);
var str = dirTree.stringifyDirTree(jsonObj);

console.log(str);
