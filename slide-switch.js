'use strict';

const robot = require('kbm-robot'),
    Logger = require('./Logger')('ROBOT');

robot.startJar();
Logger(['Started JAR']);

function next() {
    robot.type('RIGHT');
    Logger(['Next slide']);
}

function previous() {
    robot.type('LEFT');
    Logger(['Previous slide']);
}

module.exports = {
    next: next,
    previous: previous
};