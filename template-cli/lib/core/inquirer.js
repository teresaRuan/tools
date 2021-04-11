"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const list_1 = require("../config/list");
const getOptions = (ctx) => {
    return new Promise((reslove, reject) => {
        inquirer_1.default
            .prompt([
            //   模块名称
            {
                type: 'list',
                name: 'template',
                message: 'Choose a template',
                choices: list_1.listResult.map((item) => `${item.name}(${item.des})`)
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
exports.getOptions = getOptions;
