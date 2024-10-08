import { config} from "dotenv";
import {ActivityType, Client, Collection, Events, GatewayIntentBits, Snowflake } from "discord.js";
import { join } from "path";
import { readdirSync} from "fs";
import { Command } from "./types/command";

config();

interface IConfig{
    TOKEN:string | undefined;
    CLIENT_ID:string | undefined;
}

export class Bot extends Client{
    config : IConfig;
    commands: Collection<string, Command>;
    cooldowns: Collection<string, Collection<Snowflake, number>>;
    constructor(GTIntents:GatewayIntentBits[],config: IConfig){
        super({intents:[...GTIntents]});
        this.config = config
        this.commands = new Collection();
        this.cooldowns = new Collection();
        this.once(Events.ClientReady, (c) => {
            this.initCommands();
            this.interactionCreate();
            console.log(`Bot encendido Username:${c.user.tag}`);
            c.user.setActivity({
                name:"a ver, que pasa",
                type:ActivityType.Streaming
            });
        });
    }
    interactionCreate(){
        this.on(Events.InteractionCreate, async (interaction:any) => {
            if (!interaction.isChatInputCommand()) return;
        
            const command = interaction.client.commands.get(interaction.commandName);
        
            if (!command) return;
        
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        });
    }
    initCommands(){
        this.commands = new Collection();
        this.cooldowns = new Collection();
        const foldersPath = join(__dirname, 'commands');
        const commandFolders = readdirSync(foldersPath);

        for (const folder of commandFolders) {
            const commandsPath = join(foldersPath, folder);
            // .ts para el modo desarrollador
            const commandFiles = readdirSync(commandsPath).filter((file:string) => file.endsWith('.js'));
            for (const file of commandFiles) {
                const filePath = join(commandsPath, file);
                const command = require(filePath);
                if ('data' in command && 'execute' in command) {
                    this.commands.set(command.data.name, command);
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            }
        }
    }
    async init(){
        await this.login(this.config.TOKEN)
    }
}