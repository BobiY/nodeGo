
const  fs = require('fs');
const  join = require('path').join;
/**
 * 
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
    let result=[];
    function finder(path) {
        let files=fs.readdirSync(path);
        files.forEach((val,index) => {
            let fPath=join(path,val);
            let stats=fs.statSync(fPath);
            if(stats.isDirectory()) {
                // result.push(fPath);
                // 递归读取文件夹下文件
                finder(fPath)
            };
            // 读取文件名
            if(stats.isFile()) {
                result.push(fPath)
            };
        });

    }
    finder(startPath);
    console.log(result)
    return result;
}
let fileNames=findSync('../');