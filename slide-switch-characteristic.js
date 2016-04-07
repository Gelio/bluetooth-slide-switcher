'use strict';

const bleno = require('bleno'),
    util = require('util'),
    Logger = require('./Logger')('SlideSwitchCharacteristic');

function SlideSwitchCharacteristic(_switcher) {
    SlideSwitchCharacteristic.super_.call(this, {
        uuid: '123456',
        properties: ['write'],
        value: null
    });

    this.switcher = _switcher;
    //this.currentSlide = new Uint8Array(1);
    //this.currentSlide[0] = 1;
    Logger(['Generating new characteristic']);
}
util.inherits(SlideSwitchCharacteristic, bleno.Characteristic);

SlideSwitchCharacteristic.prototype.onReadRequest = function (offset, callback) {
    Logger(['Read request']);

    callback(this.RESULT_SUCCESS, this.currentSlide);
};

SlideSwitchCharacteristic.prototype.onWriteRequest = function (data, offset, withoutResponse, callback) {
    const convertedData = new Uint8Array(data);
    Logger(['Write request']);
    
    if(convertedData[0] === 1) {
        this.switcher.next();
    } else if (convertedData[0] === 0) {
        this.switcher.previous();
    }

    //this.currentSlide[0] = convertedData[0];
    callback(this.RESULT_SUCCESS);
};

module.exports = SlideSwitchCharacteristic;