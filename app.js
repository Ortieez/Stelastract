/*
*   Stelastract - Simple multipurpose discord bot
*   Copyright (C) 2022  Adam Lipert - Ortieez
*   This program is just for learning purposes. 
*   If it grows into something bigger, 
*   I will be happy to work on it more.
*
*   Days worked on: 1
*   
*/

// Import all important libraries and setup config
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config/config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

const logger = require('node-color-log');
logger.setDate(() => (new Date()).toLocaleTimeString())

client.commands = new Collection();
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		logger.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);