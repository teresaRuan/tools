"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = exports.exists = void 0;
const fs_1 = __importDefault(require("fs"));
const exists = (path) => {
    try {
        const stat = fs_1.default.statSync(path);
        if (stat.isDirectory()) {
            return 'dir';
        }
        return false;
    }
    catch (error) {
        // 文件不存在
        if (error.code === 'ENOENT') {
            return false;
        }
        throw new Error(error);
    }
};
exports.exists = exists;
const isEmpty = (path) => {
    try {
        const files = fs_1.default.readdirSync(path);
        return files.length === 0;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.isEmpty = isEmpty;
