"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ora_1 = __importDefault(require("ora"));
const exec_1 = require("../util/exec");
const load = async (ctx) => {
    // const spinning = ora('downloading').start();
    // spinning.color = 'yellow';
    // ctx.stat || fs.mkdirSync(ctx.dest);
    // download('zce/caz', ctx.dest, function (err: any) {
    //   err ? spinning.fail('download fail') : spinning.succeed('download success');
    const spinningrename = ora_1.default('creating').start();
    try {
        // fs.rmdirSync(path.resolve(`${ctx.dest}/.git`));
        const pkg = path_1.default.resolve(`${ctx.dest}/package.json`);
        const data = JSON.parse(fs_1.default.readFileSync(pkg, {
            encoding: 'utf8'
        }));
        data.name = ctx.name;
        data.description = ctx.description;
        fs_1.default.writeFileSync(pkg, JSON.stringify(data));
        // fs.rmdirSync(`${ctx.dest}/.git`);
        await exec_1.exec('rm', ['-rf'], { cwd: `${ctx.dest}/.git`, stdio: 'inherit' });
        // await exec('git', ['init'], { cwd: ctx.dest, stdio: 'inherit' });
        // await exec('npm', ['install'], { cwd: ctx.dest, stdio: 'inherit' });
        spinningrename.succeed();
    }
    catch (error) {
        // console.log(error);
        spinningrename.fail(error);
    }
    //   });
};
exports.load = load;
