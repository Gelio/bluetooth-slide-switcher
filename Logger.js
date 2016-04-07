'use strict';

function Logger(prefix) {
    return log.bind({}, prefix);
}

function log(prefix, args) {
    let toPrint = [prefix + ':'];
    args.forEach(arg => toPrint.push(arg));
    console.log.apply(console, toPrint);
}

module.exports = Logger;