const { SlashCommandBuilder } = require('@discordjs/builders');
const drgData = require('json/drg.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('random build'),
	async execute(interaction, message) {
		let msg = message.toLowerCase();
		if (message === drgData['data']['class']['gunner']) {
			//Storing the build im randomizing in this array
			let rndBuild = [];
			//primary randomizer
			let rndPrimary = drgData['data']['class'][msg]['primary'][Math.floor(Math.random() * drgData['data']['class'][msg]['primary'].length)];
			rndBuild.push(rndPrimary);

			//random primary modifications
			RandomWeapon(msg, 'primary', rndPrimary);
			
			let rndPrimaryOverclock = drgData['data']['class'][msg]['primary'][rndPrimary]['overclock'][Math.floor(Math.random() * drgData['data']['class'][msg]['primary'][rndPrimary]['overclock'])];
			rndBuild.push(rndPrimaryOverclock);

			//secondary randomizer
			let rndSecondary = drgData['data']['class'][msg]['secondary'][Math.floor(Math.random() * drgData['data']['class'][msg]['secondary'].length)];
			rndBuild.push(rndSecondary);

			//random secondary modifications
			RandomWeapon(msg, 'secondary', rndSecondary);
		} else {
			await interaction.reply('Not a valid DRG class!');
		}
		await interaction.reply('build');
	},
};

function RandomWeapon(msg, gunType, rndWeapon) {
	for (let i = 1; i < drgData['data']['class'][msg][gunType][rndWeapon]['modifications'].length; i++) {
		let rndWeaponModification = 'tier' + i;
		rndWeaponModification['tier' + i] = drgData['data']['class'][msg][gunType][rndWeapon]['modifications']['tier' + i][Math.floor(Math.random() * drgData['data']['class'][msg][gunType][rndWeapon]['modifications']['tier' + i].length)];
		rndBuild.push(rndWeaponModification['tier' + i]);
	}
}