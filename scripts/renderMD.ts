import fs from 'fs';
import path from 'path';

export default class RenderMD {
  mdContent: string;
  contentPath: string = '';
  constructor(config: Config) {
    this.mdContent = '';
    this.contentPath = path.join(__dirname, config.dir);
    this.createTitle(config.title);
  }

  /**
   * @description: 创建链接的title
   * @param {string} path
   * @param {number} text
   * @return {*}
   */
  createLinkTitle(path: string, text: string, level: number = 0): void {
    let titleLevel: string = '';
    for (let i = 0; i <= level; i++) {
      titleLevel += '#';
    }
    this.mdContent += `${titleLevel} [${text}](${path}) \n`;
  }

  /**
   * @description: 根据level生成对应层级的标题
   * @param {string} text
   * @param {number} level
   * @return {*}
   */
  createTitle(text: string, level: number = 0): void {
    let titleLevel = '';
    for (let i = 0; i <= level; i++) {
      titleLevel += '#';
    }
    this.mdContent += `${titleLevel} ${text} \n`;
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
        let winPath = location.replace(this.contentPath, 'content/');
        let linuxPath = winPath.replaceAll(path.sep, '/');
        this.createLinkTitle(linuxPath, location.split(path.sep).at(-1) || '', level);
      }
    });
  }

  /**
   * @description: 获取生成后的数据
   * @return {*}
   */
  getMDContent(): string {
    return this.mdContent;
  }
}
