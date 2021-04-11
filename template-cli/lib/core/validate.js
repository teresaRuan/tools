"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
// validate file exists
exports.default = async (ctx) => {
    ctx.dest = path_1.default.resolve(ctx.name);
    // const stat = file.exists(ctx.dest);
    // if (stat === 'dir' && !file.isEmpty(ctx.dest)) {
    //   throw new Error(`floder ${ctx.name} is not empty`);
    // }
    // // 文件情况
    // ctx.stat = stat;
};
