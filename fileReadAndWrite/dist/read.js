const fs = require("fs");

const readFileSelf = path => {  // 读取文件的异步方法
    console.log("开始读取文件.....");
    fs.readFile(path, "utf-8", ( error, file ) => {
        if ( error ) {
            console.log("error....");
            return;
        }
        console.log(file);
    })
    console.log("文件读取结束.....");
}

// readFileSelf( "./test/test.txt" );

const readFileSelfSync = path => {  // 同步读取文件的方法
    console.log("开始读取文件......");
    const data = fs.readFileSync(path, "utf-8");
    console.log(data);
    console.log("文件读取结束......");
    return data;
}

// readFileSelfSync("./test/test.txt");

const readFileSelfPromise = path => {
    return new Promise( (res, rej) => {
        fs.readFile(path, "utf-8", ( error, file ) => {
            if( error ) {
                rej(error);
            } else {
                res(file);
            }
        })
    } ) 
}

// const fs_Pro = readFileSelfPromise("./test/test.txt");
// fs_Pro.then( res => {
//     console.log(res);
// } ).catch( err => {
//     console.log(err);
// } )

// let exports = { readFileSelf, readFileSelfPromise, readFileSelfSync };
module.exports = { readFileSelf, readFileSelfPromise, readFileSelfSync };