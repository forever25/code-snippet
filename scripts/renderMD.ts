import fs from 'fs';
import path from 'path';

export default class CreateMDFile {
  outputText: string; //
  entry: string = '';

  constructor(config: Config) {
    this.outputText = '';
    this.entry = path.join(__dirname, config.dir);
    this.createTitle(config.title);
    this.readDir(this.entry);
  }

  /**
   * @description: 创建带链接的标题
   * @param {string} path
   * @param {number} text
   * @return {*}
   */
  createLinkTitle(path: string, text: string, level: number = 0): void {
    let titleStr: string = '';
    for (let i = 0; i <= level; i++) {
      titleStr += '#';
    }
    this.outputText += `${titleStr} [${text}](${path}) \n`;
  }

  /**
   * @description: 根据生成对应层级的标题
   * @param {string} text
   * @param {number} level
   * @return {*}
   */
  createTitle(text: string, level: number = 0): void {
    let titleStr = '';
    for (let i = 0; i <= level; i++) {
      titleStr += '#';
    }
    this.outputText += `${titleStr} ${text} \n`;
  }

  /**
   * @description: 递归获取文件夹
   * @param {string} dirPath 需要获取文件夹地址
   */
  readDir(dirPath: string, level = 1) {
    const dirInfo = fs.readdirSync(dirPath);
    dirInfo.forEach(item => {
      const location = path.join(dirPath, item);
      const info = fs.statSync(location);
      if (info.isDirectory()) {
        const title = location.split(path.sep).at(-1) || '';
        this.createTitle(title, level);
        this.readDir(location, 1 + level);
      } else {
        let winPath = location.replace(this.entry, 'content/');
        let linuxPath = winPath.replaceAll(path.sep, '/');
        this.createLinkTitle(linuxPath, location.split(path.sep).at(-1) || '', level);
      }
    });
  }

  /**
   * @description: 获取生成后的数据
   * @return {*}
   */
  getOutputText(): string {
    return this.outputText;
  }
}
