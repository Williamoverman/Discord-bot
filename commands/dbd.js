const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dbd')
        .setDescription('dbd')
        .addSubcommand(subcommand =>
            subcommand
                .setName('killerinfo')
                .setDescription('info over een killer')
                .addStringOption(option => option.setName('killer').setDescription('The killer you want info about').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('survivorinfo')
                .setDescription('info over een survivor')
                .addStringOption(option => option.setName('survivor').setDescription('The survivor you want info about').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('randomperkskiller')
                .setDescription('random perks voor een killer')
                .addStringOption(option => option.setName('killer').setDescription('The killer you want a random build for').setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
                .setName('randomperkssurvivor')
                .setDescription('random perks voor een survivor')
                .addStringOption(option => option.setName('survivor').setDescription('The survivor you want a random build for').setRequired(true))),
    async execute(interaction) {

        let message = "";

        if (interaction.options.getSubcommand() === 'survivorinfo') {
            const dbdSurvivors = await fetch('https://dbd-api.herokuapp.com/survivors').then(response => response.json());
            let survivorName = interaction.options.getString('survivor');

            for (let i = 0; i < dbdSurvivors.length; i++) {

                if (dbdSurvivors[i]['name'] == survivorName || dbdSurvivors[i]['name'].toLowerCase() == survivorName) {
        
                    let survivor = new GetSurvivor(dbdSurvivors[i]['name'], dbdSurvivors[i]['gender'], dbdSurvivors[i]['role'], dbdSurvivors[i]['nationality'], dbdSurvivors[i]['overview'], dbdSurvivors[i]['difficulty'],
                    dbdSurvivors[i]['dlc'], dbdSurvivors[i]['icon']['portrait'], dbdSurvivors[i]['icon']['preview_portrait'], dbdSurvivors[i]['icon']['shop_background'], dbdSurvivors[i]['perks'][0], dbdSurvivors[i]['perks'][1],
                    dbdSurvivors[i]['perks'][2]);

                    let survivorDCEmbed = survivorEmbed(survivor.survivorName, survivor.survivorGender, survivor.survivorRole, survivor.survivorNationality, survivor.survivorOverview, survivor.survivorDifficulty, survivor.survivorDLC,
                        survivor.survivorPortrait, survivor.survivorPreviewPortrait, survivor.survivorPerk0, survivor.survivorPerk1, survivor.survivorPerk2);

                    message = { embeds: [survivorDCEmbed] };
                    break;

                } else {

                    message = 'Survivor bestaat niet!';

                }

            }
        }

        if (interaction.options.getSubcommand() === 'killerinfo') {
            const dbdKillers = await fetch('https://dbd-api.herokuapp.com/killers').then(response => response.json());
            let killerName = interaction.options.getString('killer');

            for (let i = 0; i < dbdKillers.length; i++) {

                if (dbdKillers[i]['name'] == killerName || dbdKillers[i]['name'].toLowerCase() == killerName) {
        
                    let killer = new GetKiller(dbdKillers[i]['name'], dbdKillers[i]['gender'], dbdKillers[i]['nationality'], dbdKillers[i]['realm'], dbdKillers[i]['power'], dbdKillers[i]['weapon'],
                    dbdKillers[i]['speed'], dbdKillers[i]['terror_radius'], dbdKillers[i]['height'], dbdKillers[i]['difficulty'], dbdKillers[i]['overview'], dbdKillers[i]['dlc'], dbdKillers[i]['icon']['portrait'],
                    dbdKillers[i]['icon']['preview_portrait'], dbdKillers[i]['icon']['shop_background'], dbdKillers[i]['perks'][0], dbdKillers[i]['perks'][1], dbdKillers[i]['perks'][2]);

                    let killerDCEmbed = killerEmbed(killer.killerName, killer.killerGender, killer.killerNationality, killer.killerRealm, killer.killerPower, killer.killerWeapon, killer.killerSpeed, killer.killerTerrorRadius,killer.killerHeight,
                        killer.killerDifficulty, killer.killerOverview, killer.killerDLC, killer.killerPortrait, killer.killerPreviewPortrait, killer.killerPerk0, killer.killerPerk1, killer.killerPerk2);

                    message = { embeds: [killerDCEmbed] };
                    break;

                } else {
        
                    message = 'Killer bestaat niet!';
        
                }
            }
        }

        await interaction.reply(message);

    }
}


function GetKiller(killerName, killerGender, killerNationality, killerRealm, killerPower, killerWeapon, killerSpeed, killerTerrorRadius, killerHeight, killerDifficulty, killerOverview, killerDLC, killerPortrait,
    killerPreviewPortrait, killerShopbackground, killerPerk0, killerPerk1, killerPerk2) {

        this.killerName = killerName;
        this.killerGender = killerGender;
        this.killerNationality = killerNationality;
        this.killerRealm = killerRealm;
        this.killerPower = killerPower;
        this.killerWeapon = killerWeapon;
        this.killerSpeed = killerSpeed;
        this.killerTerrorRadius = killerTerrorRadius;
        this.killerHeight = killerHeight;
        this.killerDifficulty = killerDifficulty;
        this.killerOverview = killerOverview;
        this.killerDLC = killerDLC;
        this.killerPortrait = killerPortrait;
        this.killerPreviewPortrait = killerPreviewPortrait;
        this.killerShopbackground = killerShopbackground;
        this.killerPerk0 = killerPerk0;
        this.killerPerk1 = killerPerk1;
        this.killerPerk2 = killerPerk2;

}

function GetSurvivor(survivorName, survivorGender, survivorRole, survivorNationality, survivorOverview, survivorDifficulty, survivorDLC, survivorPortrait, survivorPreviewPortrait, survivorShopbackground, survivorPerk0, survivorPerk1, survivorPerk2) {
    
        this.survivorName = survivorName;
        this.survivorGender = survivorGender;
        this.survivorRole = survivorRole;
        this.survivorNationality = survivorNationality;
        this.survivorOverview = survivorOverview;
        this.survivorDifficulty = survivorDifficulty;
        this.survivorDLC = survivorDLC;
        this.survivorPortrait = survivorPortrait;
        this.survivorPreviewPortrait = survivorPreviewPortrait;
        this.survivorShopbackground = survivorShopbackground;
        this.survivorPerk0 = survivorPerk0;
        this.survivorPerk1 = survivorPerk1;
        this.survivorPerk2 = survivorPerk2;

}

function getRandomPerksKiller() {

}

function getRandomPerksSurvivor() {

}

function survivorEmbed(survivorName, survivorGender, survivorRole, survivorNationality, survivorOverview, survivorDifficulty, survivorDLC, survivorPortrait, survivorPreviewPortrait, survivorPerk0, survivorPerk1, survivorPerk2) {
    survivorPerk0 = survivorPerk0.replace(/([A-Z])/g, ' $1').trim()
    survivorPerk1 = survivorPerk1.replace(/([A-Z])/g, ' $1').trim()
    survivorPerk2 = survivorPerk2.replace(/([A-Z])/g, ' $1').trim()
    let survivorEmbed = new MessageEmbed()
	.setColor('#424549')
	.setTitle(survivorName)
	.setAuthor({ name: 'Moosike#5116' })
	.setDescription(survivorOverview)
	.setThumbnail(survivorPortrait)
	.addFields(
        { name: 'DLC', value: `${survivorDLC}`, inline: true },
        { name: 'Difficulty', value: `${survivorDifficulty}`, inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: `${survivorName}'s gender`, value: `${survivorGender}`, inline: true },
        { name: `${survivorName}'s role`, value: `${survivorRole}`, inline: true },
		{ name: `${survivorName}'s nationality`, value: `${survivorNationality}`, inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: `${survivorName}'s first teachable perk`, value: `${survivorPerk0}`, inline: true },
        { name: `${survivorName}'s second teachable perk`, value: `${survivorPerk1}`, inline: true },
        { name: `${survivorName}'s last teachable perk`, value: `${survivorPerk2}`, inline: true },
	)
	.setImage(survivorPreviewPortrait)
	.setTimestamp()
	.setFooter({ text: `How about you play ${survivorName} next game?` });

    return survivorEmbed;
}

function killerEmbed(killerName, killerGender, killerNationality, killerRealm, killerPower, killerWeapon, killerSpeed, killerTerrorRadius, killerHeight, killerDifficulty, killerOverview, killerDLC, killerPortrait,
    killerPreviewPortrait, killerPerk0, killerPerk1, killerPerk2) {
    if (killerRealm == "") {
        killerRealm = "No realm";
    }
    killerPerk0 = killerPerk0.replace(/([A-Z])/g, ' $1').trim()
    killerPerk1 = killerPerk1.replace(/([A-Z])/g, ' $1').trim()
    killerPerk2 = killerPerk2.replace(/([A-Z])/g, ' $1').trim()

    let killerEmbed = new MessageEmbed()
	.setColor('#424549')
	.setTitle(killerName)
	.setAuthor({ name: 'Moosike#5116' })
	.setDescription(killerOverview)
	.setThumbnail(killerPortrait)
	.addFields(
        { name: 'DLC', value: `${killerDLC}`, inline: true },
        { name: 'Difficulty', value: `${killerDifficulty}`, inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: `${killerName}'s gender`, value: `${killerGender}`, inline: true },
        { name: `${killerName}'s power`, value: `${killerPower}`, inline: true },
        { name: `${killerName}'s realm`, value: `${killerRealm}`, inline: true },
		{ name: `${killerName}'s nationality`, value: `${killerNationality}`, inline: true },
        { name: `${killerName}'s weapon`, value: `${killerWeapon}`, inline: true },
        { name: `${killerName}'s speed`, value: `${killerSpeed}`, inline: true },
        { name: `${killerName}'s terror radius range`, value: `${killerTerrorRadius}`, inline: true },
        { name: `${killerName}'s height`, value: `${killerHeight}`, inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: `${killerName}'s first teachable perk`, value: `${killerPerk0}`, inline: true },
        { name: `${killerName}'s second teachable perk`, value: `${killerPerk1}`, inline: true },
        { name: `${killerName}'s last teachable perk`, value: `${killerPerk2}`, inline: true },
	)
	.setImage(killerPreviewPortrait)
	.setTimestamp()
	.setFooter({ text: `How about you play ${killerName} next game?` });

    return killerEmbed;
}
