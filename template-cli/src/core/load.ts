import download from 'download-git-repo';
import fs from 'fs';
import path from 'path';
import ora from 'ora';
import { exec } from '../util/exec';

export const load = async (ctx: any) => {
  const spinning = ora('downloading').start();

  spinning.color = 'yellow';

  ctx.stat || fs.mkdirSync(ctx.dest);

  download('zce/caz', ctx.dest, async function (err: any) {
    err ? spinning.fail('download fail') : spinning.succeed('download success');

    const spinningrename = ora('creating').start();

    try {
      // fs.rmdirSync(path.resolve(`${ctx.dest}/.git`));
      const pkg = path.resolve(`${ctx.dest}/package.json`);

      const data = JSON.parse(
        fs.readFileSync(pkg, {
          encoding: 'utf8'
        })
      );

      data.name = ctx.name;
      data.description = ctx.description;

      fs.writeFileSync(pkg, JSON.stringify(data));

      // fs.rmdirSync(`${ctx.dest}/.git`);

      await exec('rm', ['-rf'], { cwd: `${ctx.dest}/.git`, stdio: 'inherit' });

      await exec('git', ['init'], { cwd: ctx.dest, stdio: 'inherit' });

      // await exec('npm', ['install'], { cwd: ctx.dest, stdio: 'inherit' });
      spinningrename.succeed();
    } catch (error) {
      // console.log(error);
      spinningrename.fail(error);
    }
  });
};
