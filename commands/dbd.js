const { SlashCommandBuilder } = require('@discordjs/builders');
const dbdPerks = require('https://dbd-api.herokuapp.com/perks?lang=en');
const dbdKillers = require('https://dbd-api.herokuapp.com/killers');
const dbdSurvivors = require('https://dbd-api.herokuapp.com/survivors');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dbd')
        .setDescription('dbd')
        .addSubcommand(subcommand =>
            subcommand.setName('killerInfo')
                .setDescription('info over een killer')
                .addStringOption(option => option.setName('killer').setDescription('The killer you want info about').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('survivorInfo')
                .setDescription('info over een survivor')
                .addStringOption(option => option.setName('survivor').setDescription('The survivor you want info about').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('randomPerksKiller')
                .setDescription('random perks voor een killer')
                .addStringOption(option => option.setName('killer').setDescription('The killer you want a random build for').setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand.setName('randomPerksSurvivor')
                .setDescription('random perks voor een survivor')
                .addStringOption(option => option.setName('survivor').setDescription('The survivor you want a random build for').setRequired(true))),
    async execute(interaction) {
        try {

            if (interaction.options.getSubcommand() === 'survivorInfo') {
                let survivor = interaction.option.getString('survivor');
                let survivorInfo = getSurvivorInfo(survivor);
            }

            if (interaction.options.getSubcommand() === 'killerInfo') {
                let killer = interaction.option.getString('killer');
                let killerInfo = getKillerInfo(msg);
            }

        }
        catch (error) {

            await interaction.reply('Killer or survivor niet herkend');
            console.log(error);

        }
    }
}

function getKillerInfo(killerName) {

    for (let i = 0; i < dbdKillers.length; i++) {

        if (dbdKillers[i]['name'] == killerName) {

            let killerObj = new Object();

            killerObj = {
                killerName : dbdKillers[i]['name'],
                killerGender : dbdKillers[i]['gender'],
                killerNationality : dbdKillers[i]['nationality'],
                killerRealm : dbdKillers[i]['realm'],
                killerPower : dbdKillers[i]['power'],
                killerWeapon : dbdKillers[i]['weapon'],
                killerSpeed : dbdKillers[i]['speed'],
                killerTerrorRadius : dbdKillers[i]['terror_radius'],
                killerHeight : dbdKillers[i]['height'],
                killerDifficulty : dbdKillers[i]['difficulty'],
                killerOverview : dbdKillers[i]['overview'],
                killerDLC : dbdKillers[i]['dlc'],
                killerPortrait : dbdKillers[i]['icon']['portrait'],
                killerPreviewPortrait : dbdKillers[i]['icon']['preview_portrait'],
                killerShopbackground : dbdKillers[i]['icon']['shop_background'],
                killerPerk0 : dbdKillers[i]['perks'][0],
                killerPerk1 : dbdKillers[i]['perks'][1],
                killerPerk2 : dbdKillers[i]['perks'][2]
            };

            return killerObj;

        } else {

            return await interaction.reply('Not a valid killer!');

        }

    }

}

function getSurvivorInfo(survivorName) {

    for (let i = 0; i < dbdSurvivors.length; i++) {

        if (dbdSurvivors[i]['name'] == survivorName) {

            let survivorObj = new Object();

            survivorObj = {
                survivorName: dbdSurvivors[i]['name'],
                survivorGender : dbdSurvivors[i]['gender'],
                survivorRole : dbdSurvivors[i]['role'],
                survivorNationality : dbdSurvivors[i]['nationality'],
                survivorOverview : dbdSurvivors[i]['overview'],
                survivorDifficulty : dbdSurvivors[i]['difficulty'],
                survivorDLC : dbdSurvivors[i]['dlc'],
                survivorPortrait : dbdSurvivors[i]['icon']['portrait'],
                survivorPreviewPortrait : dbdSurvivors[i]['icon']['preview_portrait'],
                survivorShopbackground : dbdSurvivors[i]['icon']['shop_background'],
                survivorPerk0 : dbdSurvivors[i]['perks'][0],
                survivorPerk1 : dbdSurvivors[i]['perks'][1],
                survivorPerk2 : dbdSurvivors[i]['perks'][2]
            };

            return survivorObj;

        } else {

            return await interaction.reply('Not a valid survivor!');

        }

    }

}

function getRandomPerksKiller() {

}

function getRandomPerksSurvivor() {

}