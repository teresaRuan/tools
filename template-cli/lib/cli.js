"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = __importDefault(require("cac"));
const init_1 = require("./core/init");
const cli = cac_1.default();
cli.command('create <name>', 'Create a new project').action(init_1.init);
cli.parse();
