"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
const child_process_1 = require("child_process");
const exec = (cmd, argv, options) => {
    return new Promise((resolev, reject) => {
        // exec(cmd, function (error, sto) {
        //   console.log(error, sto);
        //   resolev();
        // });
        child_process_1.spawn(cmd, argv, options)
            .on('error', (error) => {
            console.log(error);
        })
            .on('close', () => {
            resolev();
        });
    });
};
exports.exec = exec;
