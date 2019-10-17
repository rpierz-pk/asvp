'use strict';

const apickli = require('apickli');
const {Before} = require('cucumber');

Before(function() {
    this.apickli = new apickli.Apickli('http', 'rpierz-eval-test.apigee.net/bdd-security');
    this.apickli.addRequestHeader('Cache-Control', 'no-cache');
    this.apickli.setGlobalVariable('clientId', 'Oq25rBRefGBdtFM9gN4S9s5rFwXHETjq');
    this.apickli.setGlobalVariable('clientSecret', 'dMgBQu9Gvorb95W3');
});
