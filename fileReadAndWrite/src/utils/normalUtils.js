/**
 * 通用的工具函数
 */
const path = require("path");

const findUrlFontLeval = splitArr => {
    return splitArr.filter( item => item === ".." ).length;
}

const findFileName = ( url, separator ) => {
    const fileMark = ".";
    const fileSplit = url.split(separator);
    const levalNum = findUrlFontLeval(fileSplit);
    const newFile = fileSplit.slice(levalNum + 1);
    return newFile.join(path.sep);

} 

module.exports = { findFileName };