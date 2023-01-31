import fs from 'fs';
import { config } from '../config/config';
import CreateMDFile from './renderMD';

/**
 * @description: 主函数
 */
function main() {
  const MDFile: CreateMDFile = new CreateMDFile(config);
  //写入文件
  try {
    fs.writeFileSync('./README.md', MDFile.getOutputText(), {
      encoding: 'utf-8',
      flag: 'w+',
    });
  } catch (error) {
    console.log(error);
  }
}

main();
