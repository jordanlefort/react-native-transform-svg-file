const chalk = require("chalk");

const err = (err) => {
    return chalk.red(chalk.bold(err));
};

const success = (success) => {
    return chalk.green(chalk.bold(success));
};

const info = (info) => {
    return chalk.gray(chalk.italic(info))
};

module.exports = {
    err,
    success,
    info,
};
