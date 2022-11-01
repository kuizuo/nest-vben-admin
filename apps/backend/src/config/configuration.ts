import * as fs from 'fs';
import { IConfig } from './defineConfig';

export default () => {
  let config: IConfig = {};

  try {
    // 读取同目录下的配置 需使用require载入
    const configPath = fs.readdirSync(__dirname);
    for (const p of configPath) {
      if (/\.config\.[t|j]s$/.test(p)) {
        const temp = require('./' + p).default;
        config = { ...config, ...temp };
      }
    }
  } catch (e) {
    console.log(e);
    // 无效配置则自动忽略
  }
  return config;
};
