import fs from 'fs';
import { config } from '../config/config';
import RenderMD from './renderMD';

/**
 * @description: 主函数
 */
function main() {
  const renderMD: RenderMD = new RenderMD(config);
  renderMD.readDir(renderMD.contentPath);

  // console.log(renderMD.getMDContent());
  //写入文件
  try {
    fs.writeFileSync('./README.md', renderMD.getMDContent(), {
      encoding: 'utf-8',
      flag: 'w+',
    });
  } catch (error) {
    console.log(error, 11);
  }
}

main();
