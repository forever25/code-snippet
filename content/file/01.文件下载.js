

/**
 * @description: 文件下载
 * @param {*} data 文件流
 * @param {*} fileName 文件名称
 */

function fileDownload(data, fileName) {
  const blob = new Blob([data]);
  //const blob = new Blob([data], {type: 'audio/wav'})
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName; // 这里填保存成的文件名 需要加后缀名称
  a.click();
  URL.revokeObjectURL(a.href);
  a.remove();
}