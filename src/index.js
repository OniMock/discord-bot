import { DiscordBot } from './bot/DiscordBot.js';
import { config } from './config.js';

const bot = new DiscordBot(config.token);
bot.start();