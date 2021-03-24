#!/usr/bin/env node

// const clone = require('git-clone')
const program = require('commander')
const ora = require('ora');
const shell = require('shelljs');
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const path = require('path');
const templateUrl  = ''; // git 地址 copy


// 提示ui
const success = chalk.greenBright;
const error = chalk.bold.red;


const changePackage = (projectname) => {
    fs.readFile(`${process.cwd()}/${projectname}/package.json`, (err, data) => {
        if (err) throw err;
        let _data = JSON.parse(data.toString());
        _data.name = program.init;
        _data.version = '1.0.0';
        let str = JSON.stringify(_data, null, 4);
        fs.writeFile(`${process.cwd()}/${projectname}/package.json`, str, function (err) {
            if (err) throw err;
        })
    });
}

program
    .version((path.resolve(__dirname,'../package.json')).version)
    .description('ct 项目cli')
    .command('init <branch> <projectname>')
    .action(function(branch,project) {

        if (project) {
            let pwd = shell.pwd()
            const spinner = ora('正在创建项目....').start()

              try {
                  execSync(`git clone -b ${branch} ${templateUrl}`, { stdio: 'ignore' });
                  shell.rm('-rf', pwd + `/${project}/.git`)
                  changePackage(project)
                  spinner.succeed(success(`创建成功 cd ${project}`))
                } catch (e) {
                    spinner.stop();
                    console.error(error(e))
                   
                }
        } else {
            console.error(error('项目名不得为空。请输入ct-cli init <project-name>'))
            
        }
    })

program.parse(process.argv)

