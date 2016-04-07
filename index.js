'use strict';

const bleno = require('bleno');
const SlideSwitcher = require('./slide-switch');
const SlideSwitchCharacteristic = require('./slide-switch-characteristic');
const Logger = require('./Logger')('MAIN');

const primaryService = new bleno.PrimaryService({
    uuid: '1234',
    characteristics: [
        new SlideSwitchCharacteristic(SlideSwitcher)
    ]
});

bleno.on('stateChange', state => {
    Logger(['on stateChange', state]);

    if (state === 'poweredOn') {
        bleno.startAdvertising('slide-switch', ['1234']);
    } else {
        bleno.stopAdvertising();
    }
});

bleno.on('advertisingStart', error => {
    Logger(['on advertisingStart', error]);

    if (!error) {
        bleno.setServices([
            primaryService
        ]);
    }
});

Logger(['Server started']);