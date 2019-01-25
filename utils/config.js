'use strict';

const config = require('../config');
const eq = require('./eq');

const masterById = /^\d+$/.test(config.master);
const masterByUsername = /^@?\w+$/.test(config.master);

if (!masterById && !masterByUsername) {
	throw new Error('Invalid value for `master` in config file: ' +
		config.master);
}

const isMaster = masterByUsername
	? user => user && user.username && eq.username(user.username, config.master)
	: user => user && user.id === Number(config.master);

module.exports = {
	isMaster,
};