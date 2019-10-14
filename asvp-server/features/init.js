'use strict';

const apickli = require('apickli');
const {Before} = require('cucumber');

Before(function() {
    this.apickli = new apickli.Apickli('http', INPUT_URL);
    this.apickli.addRequestHeader('Cache-Control', 'no-cache');
    this.apickli.setGlobalVariable('clientId', INPUT_CLIENTID);
    this.apickli.setGlobalVariable('clientSecret', INPUT_CLIENTSECRET);.
});
