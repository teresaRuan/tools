import fs from 'fs';

export const exists = (path: string) => {
  try {
    const stat = fs.statSync(path);

    if (stat.isDirectory()) {
      return 'dir';
    }

    return false;
  } catch (error) {
    // 文件不存在
    if (error.code === 'ENOENT') {
      return false;
    }

    throw new Error(error);
  }
};

export const isEmpty = (path: string) => {
  try {
    const files = fs.readdirSync(path);
    return files.length === 0;
  } catch (error) {
    throw new Error(error);
  }
};
