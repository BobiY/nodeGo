/**
 * 按照目标文件夹的层级目录拷贝文件到目标目录
 */
const fs = require("fs");
const path = require("path");
const utlis = require("../utils/fileRelative");
const findSync = require("../directoryAndFile/getDirectoryAndFileUrl");
const findFileName = require("../utils/normalUtils").findFileName;
const copyFileToDir = ( rootDir, aimDir, includeFile, excludeFile ) => {
    const { filePathArr, dirPathArr } = findSync(rootDir);
    dirPathArr.forEach( async item => {
        const dirName = findFileName(item, path.sep);
        const aimDirUrl = path.join(aimDir,dirName);
        const isExist = await utlis.dirIsExist(aimDirUrl);
        if ( !isExist ) {
            await utlis.mkDirPromise(aimDirUrl);
        }
    } )
    filePathArr.forEach( item => {
        const file = fs.readFileSync(item, "utf-8");
        const fileName = findFileName(item, path.sep);
        const aimUrl = path.join(aimDir,fileName);
        fs.writeFileSync(aimUrl, file, "utf-8");
    } )
}

copyFileToDir("../../readAndWrite", "../../dist");
// module.exports = copyFileToDir;