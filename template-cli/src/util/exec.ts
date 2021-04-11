import { spawn, SpawnOptions } from 'child_process';

export const exec = (cmd: string, argv: string[], options: SpawnOptions) => {
  return new Promise<void>((resolev, reject) => {
    // exec(cmd, function (error, sto) {
    //   console.log(error, sto);
    //   resolev();
    // });
    spawn(cmd, argv, options)
      .on('error', (error) => {
        console.log(error);
      })
      .on('close', () => {
        resolev();
      });
  });
};
