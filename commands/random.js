const { SlashCommandBuilder } = require('@discordjs/builders');
const drgData = require('json/drg.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('random build'),
	async execute(interaction, message) {
		let msg = message.toLowerCase();
		if (message === drgData['data']['class']['gunner']) {
			let rndBuild = [];
			//primary randomizer
			let rndPrimary = drgData['data']['class'][msg]['primary'][Math.floor(Math.random() * drgData['data']['class'][msg]['primary'].length)];
			rndBuild.push(rndPrimary);

			let rndPrimaryModification = [];
			for (let i = 1; i < drgData['data']['class'][msg]['primary'][rndPrimary]['modifications'].length; i++) {
				rndPrimaryModification = 'tier' + i;
				rndPrimaryModification['tier' + i] = drgData['data']['class'][msg]['primary'][rndPrimary]['modifications']['tier' + i][Math.floor(Math.random() * drgData['data']['class'][msg]['primary'][rndPrimary]['modifications']['tier' + i].length)];
				rndBuild.push(rndPrimaryModification['tier' + i]);
			}
			
			let rndPrimaryOverclock = drgData['data']['class'][msg]['primary'][rndPrimary]['overclock'][Math.floor(Math.random() * drgData['data']['class'][msg]['primary'][rndPrimary]['overclock'])];
			rndBuild.push(rndPrimaryOverclock);

			//secondary randomizer
			let rndSecondary = drgData['data']['class'][msg]['secondary'][Math.floor(Math.random() * drgData['data']['class'][msg]['secondary'].length)];
		} else {
			await interaction.reply('Not a valid DRG class!');
		}
		await interaction.reply('Pong!');
	},
};