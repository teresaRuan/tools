"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const inquirer_1 = require("./inquirer");
const load_1 = require("./load");
const validate_1 = __importDefault(require("./validate"));
const init = (name, options = {}) => {
    const context = {
        name
    };
    validate_1.default(context);
    inquirer_1.getOptions(context).then(() => {
        load_1.load(context);
    });
};
exports.init = init;
