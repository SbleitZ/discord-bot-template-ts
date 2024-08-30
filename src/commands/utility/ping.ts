import { CommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Comando Ping'),
	async execute(interaction:CommandInteraction){
		return await interaction.reply({content:"Pong",ephemeral:true})
	},

}

