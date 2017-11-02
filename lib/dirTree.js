var fs = require('fs')


/* *
 * 名称：needIgnore
 * 功能：判断该目录／文件是否需要忽略
 * 作者：guzheyuan
 * 输入：name [string]  --目录／文件名称
 *       ignoreList [arr]  --正则表达式数组，匹配成功的将忽略  
 * 输出：result [bool]  --布尔值，true表示需要忽略该目录／文件
 */
function needIgnore(name, ignoreList) {
    var result = false;
    ignoreList.forEach(function(regExp) { if(regExp.test(name)) result = true; });
    return result;
}


/* *
 * 名称：dirDFS
 * 功能：DFS遍历文件夹
 * 作者：guzheyuan
 * 输入：path [string]  --目录路径
 *       dirName [string]  --目录名称
 *       ignoreList [arr]  --正则表达式数组，匹配成功的将忽略  
 * 输出：result [obj]  --树形json对象
 */
function dirDFS(path, dirName, ignoreList) {
    // path是否合法
    var rootStat = fs.statSync(path);
    if(!rootStat.isDirectory()) {
        console.log("\"" + path + "\" is not directory");
        return null;
     }
    
    // 初始化json对象
    var result = new Object();
    result["name"] = dirName;
    result["type"] = "dir"
    result["childD"] = [];
    result["childF"] = [];    

    // 从根目录开始遍历所有文件
    files = fs.readdirSync(path); 
    files.forEach(function(fileName) {
        var stat = fs.statSync(path + '/' + fileName);
       
        // 忽略当前文件／目录
        if(needIgnore(fileName, ignoreList)) {

        // 这是一个文件夹
        } else if(stat.isDirectory()) {
            var dirObj = dirDFS(path + "/" + fileName, fileName, ignoreList)
            result["childD"].push(dirObj);
           
        // 这是一个文件
        } else {
            var fileObj = new Object();            
            fileObj["name"] = fileName;
            fileObj["type"] = "file";
            result["childF"].push(fileObj);
        }

    });

    return result;
}


/* *
 * 名称：stringifyHelper
 * 功能：序列化辅助函数
 * 作者：guzheyuan
 * 输入：type [str]  --序列化模式 “simple”：简洁模式 “clear”：清晰模式
 *       obj [obj]  --树形json对象的节点，目录／文件
 *       depth [int]  --遍历的深度
 *       isEnd [arr]  --bool数组，表示各级是否是文件夹中最后一个
 * 输出：str [string]  --返回序列化obj后的字符串 
 */
function stringifyHelper(type, obj, depth, isEnd) {
    var tmpStr = "";

    // 是文件夹
    if(obj["type"] == "dir") {
 
        // 填充中间行
	if(type != "simple") { 
            for(let i = 1; i <= depth-1; i++ ) {
                tmpStr += ("  " + (isEnd[i] ? " " : "│"));
            }
            tmpStr += "  │\r\n";
	}

        for(let i = 1; i <= depth-1; i++ ) {
            tmpStr += ("  " + (isEnd[i] ? " " : "│"));
        }
        tmpStr += ("  " + (isEnd[depth] ? "└─" : "├─"));
        tmpStr += obj["name"] + "\r\n";
  
        var arrLength =  obj["childD"].length + obj["childF"].length;
        for(let i = 0; i < obj["childD"].length; i++) {
            isEnd[depth+1] = (--arrLength ? false : true);
            tmpStr += stringifyHelper(type, obj["childD"][i], depth+1, isEnd);
        }
        for(let i = 0; i < obj["childF"].length; i++) {
            isEnd[depth+1] = (--arrLength ? false : true);
            tmpStr += stringifyHelper(type, obj["childF"][i], depth+1, isEnd);
        }

    // 是文件
    } else {
        
	// 填充中间行
        if(type != "simple") {
            for(let i = 1; i <= depth-1; i++ ) {
                tmpStr += ("  " + (isEnd[i] ? " " : "│"));
            }
            tmpStr += "  │\r\n";
        }

        for(let i = 1; i <= depth-1; i++ ) {
            tmpStr += ("  " + (isEnd[i] ? " " : "│"));
        }
        tmpStr += ("  " + (isEnd[depth] ? "└─" : "├─"));
        tmpStr += obj["name"] + "\r\n";
        
    }

    return tmpStr;
}


/* *
 * 名称：stringifyDirTree
 * 功能：序列化文件目录树，将其转化为string串
 * 作者：guzheyuan
 * 输入：dirTree [obj]  --树形json对象       
 *       type [str]  --序列化模式 “simple”：简洁模式 “clear”：清晰模式
 * 输出：str [string]  --序列化的文件目录树
 */
function stringifyDirTree(dirTree, type) {
    var str = "";
    var depth = 0;
    var arrLength = dirTree["childD"].length + dirTree["childF"].length;
    var isEnd = [true];
    
    str += dirTree["name"] + "\r\n";   
     
    for(let i = 0; i < dirTree["childD"].length; i++) {
        isEnd[depth+1] = --arrLength ? false : true;
        str += stringifyHelper(type, dirTree["childD"][i], depth+1, isEnd);
    }
    for(let i = 0; i < dirTree["childF"].length; i++) {
        isEnd[depth+1] = --arrLength ? false : true;
        str += stringifyHelper(type, dirTree["childF"][i], depth+1, isEnd);
    }

    return str;
}

module.exports = {
    "dirDFS": dirDFS,
    "stringifyDirTree": stringifyDirTree
};





