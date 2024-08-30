import { GatewayIntentBits } from "discord.js";
import { Bot } from "./Bot";
const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits;
const config = {
  TOKEN: process.env.TOKEN,
  CLIENT_ID: process.env.CLIENT_ID,
}
const client = new Bot([Guilds, MessageContent, GuildMessages, GuildMembers], config);

client.init();
