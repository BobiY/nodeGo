/**
 * 文件操作相关的工具函数的二次封装
 */

 const fs = require("fs");
 const path = require("path");

 // 判断文件夹是否已经存在
const dirIsExist = urls => {
    return new Promise( ( res, rej ) => {
        fs.exists(urls, exist => {
            res(exist);
        })
    } )
}

const mkDirPromise = urls => {
    return new Promise( ( res, rej ) => {
        fs.mkdir( urls, ( error, file ) => {
            if ( error ) {
                rej(error)
            } else {
                res(file);
            }
        } )
    } )
}

module.exports = { dirIsExist, mkDirPromise };