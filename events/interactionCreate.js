const logger = require('node-color-log');
logger.setDate(() => (new Date()).toLocaleTimeString())

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		logger.info(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};