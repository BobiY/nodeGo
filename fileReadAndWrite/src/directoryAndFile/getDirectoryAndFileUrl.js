const path = require("path");
const fs = require("fs");

const findDirAndFileUrls = (searchPath) => {
    const filePathArr = [];
    const dirPathArr = [];
    const files = fs.readdirSync(searchPath);
    files.forEach((val,index) => {
        const fPath = path.join(searchPath,val);
        const stats = fs.statSync(fPath);
        if(stats.isDirectory()) { // 获取文件夹路径
            dirPathArr.push(fPath);
            findDirAndFileUrls(fPath)
        };
        if(stats.isFile()) { // 获取文件路径
            filePathArr.push(fPath)
        };
    });
    return {filePathArr, dirPathArr};
}


module.exports = findDirAndFileUrls;