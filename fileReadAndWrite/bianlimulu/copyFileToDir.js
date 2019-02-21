/**
 * 1. 需要知道目标文件夹
 * 2. 需要知道要拷贝到的文件夹
 * 3. 可选的知道需要拷贝那些文件
 * 4. 需要知道哪些文件是需要排除的
 */
const path = require("path");
const fs = require("fs");
function findSync(startPath) {
    let result=[];
    const dirResult = [];
    function finder(paths) {
        let files=fs.readdirSync(paths);
        files.forEach((val,index) => {
            let fPath=path.join(paths,val);
            let stats=fs.statSync(fPath);
            if(stats.isDirectory()) {
                dirResult.push(fPath);
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
    return {result, dirResult};
}
const findFileName = ( url, separator ) => {
    const fileMark = ".";
    const fileSplit = url.split(separator);
    const newFile = fileSplit.slice(2);
    return newFile.join(path.sep);

}   
const copyFileToDir = ( rootDir, aimDir, includeFile, excludeFile ) => {
    const { result, dirResult } = findSync(rootDir);
    dirResult.forEach( item => {
        const dirName = findFileName(item, path.sep);
        const aimDirUrl = path.join(aimDir,dirName);
        fs.exists(aimDirUrl, exist => {
            if (!exist) {
                fs.mkdir(aimDirUrl, ( err, res ) => {
                    if (err) {
                        console.log("error......", err);
                        return;
                    }
                    result.forEach( item => {
                        const file = fs.readFileSync(item, "utf-8");
                        const fileName = findFileName(item, path.sep);
                        const aimUrl = path.join(aimDir,fileName);
                        fs.writeFileSync(aimUrl, file, "utf-8");
                    } )
                });
            }
        })
    } )
}

copyFileToDir("../readAndWrite", "../dist");