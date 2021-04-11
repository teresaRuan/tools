import inquirer from 'inquirer';
import { listResult } from '../config/list';

export const getOptions = (ctx: any) => {
  return new Promise<void>((reslove, reject) => {
    inquirer
      .prompt([
        //   模块名称
        {
          type: 'list',
          name: 'template',
          message: 'Choose a template',
          choices: listResult.map((item) => `${item.name}(${item.des})`)
        },
        // 项目名称
        {
          type: 'input',
          name: 'projectName',
          default: ctx.name,
          message: 'Please enter project name'
        },
        // 项目版本
        {
          type: 'input',
          name: 'projectVersion',
          default: '0.0.1',
          message: 'Please enter project version'
        },
        // 项目描述
        {
          type: 'input',
          name: 'des',
          message: 'Please enter project description'
        },
        // 选择一些额外配置
        {
          type: 'checkbox',
          name: 'options',
          choices: ['TypeScript']
        }
      ])
      .then((answers) => {
        ctx.options = answers;
        reslove();
      });
  });
};
