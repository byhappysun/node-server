/*
 * 处理文件信息
 */

const path = require('path');
const url = require('url');
const os = require('os');

let getFileInfo = function (req, res, workspace) {
  let pathResolve = workspace;
  if (!pathResolve) {
    pathResolve = path.resolve().replace(/\\/, '/') + '/asset';
  }
  let pathname = url.parse(req.url).pathname;

  let filePath = pathResolve + pathname;
  let pathArr = filePath.split('\/');

  let fileName = pathArr[ pathArr.length - 1 ];
  let basePath = pathArr.slice(0, pathArr.length - 1).join('/');

  let extName = path.extname(filePath);
  extName = extName ? extName.slice(1) : 'unknown';

  // 判断操作平台

  let platform = os.platform();

  if (platform === 'win32') {
    basePath = basePath.replace(/\//g, '\\');
    filePath = filePath.replace(/\//g, '\\');
  } else {
    basePath = basePath.replace(/\\/g, '\/');
    filePath = filePath.replace(/\\/g, '\/');
  }

  return {
    'basePath': basePath,
    'filePath': filePath,
    'fileName': fileName,
    'extName': extName
  };
};

module.exports = getFileInfo;
