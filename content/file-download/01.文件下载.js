const data = res.data; // 这里填内容的字符串
const blob = new Blob([data]);
//const blob = new Blob([data], {type: 'audio/wav'})
const a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = new Date().getTime() + ".xlsx"; // 这里填保存成的文件名
a.click();
URL.revokeObjectURL(a.href);
a.remove();
