const logger = require('node-color-log');
logger.setDate(() => (new Date()).toLocaleTimeString());

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		logger.success(`Ready! Logged in as ${client.user.tag}`);
	},
};