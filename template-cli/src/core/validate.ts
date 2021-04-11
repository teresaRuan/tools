import path from 'path';
import fs from 'fs';
import { file } from '../util';

// validate file exists
export default async (ctx: any): Promise<void> => {
  ctx.dest = path.resolve(ctx.name);

  const stat = file.exists(ctx.dest);

  if (stat === 'dir' && !file.isEmpty(ctx.dest)) {
    throw new Error(`floder ${ctx.name} is not empty`);
  }

  // 文件情况
  ctx.stat = stat;
};
