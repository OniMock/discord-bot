import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';
import { ChannelRepository } from '../database/ChannelRepository.js';
import { LinkHandler } from '../services/LinkHandler.js';
import { config } from '../config.js';

class DiscordBot {
  constructor(token) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.channelRepository = new ChannelRepository(config.dbFile);
    this.linkHandler = new LinkHandler();
    this.token = token;
  }

  async start() {
    await this.registerSlashCommands();

    this.client.on('ready', () => {
      console.log(`Bot está online como ${this.client.user.tag}`);
    });

    this.client.on('guildDelete', (guild) => {
      console.log(`Removido do servidor: ${guild.name} (ID: ${guild.id})`);
      this.channelRepository.removeAllChannelsFromGuild(guild.id);
    });

    this.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;

      const { commandName } = interaction;

      if (commandName === 'setchannel') {
        await this.handleSetChannel(interaction);
      } else if (commandName === 'removechannel') {
        await this.handleRemoveChannel(interaction);
      } else if (commandName === 'sendlink') {
        await this.handleSendLink(interaction);
      }
    });

    this.client.login(this.token);
  }

  async registerSlashCommands() {
    const commands = [
      new SlashCommandBuilder()
        .setName('setchannel')
        .setDescription('Defines a channel for link monitoring')
        .addChannelOption(option =>
          option.setName('channel')
            .setDescription('Channel to monitor')
            .setRequired(true)),

      new SlashCommandBuilder()
        .setName('removechannel')
        .setDescription('Remove a channel from link monitoring')
        .addChannelOption(option =>
          option.setName('channel')
            .setDescription('Channel to remove from monitoring')
            .setRequired(true)),

      new SlashCommandBuilder()
        .setName('sendlink')
        .setDescription('Send a link to the bot to perform the necessary action')
        .addStringOption(option => 
          option.setName('link')
            .setDescription('The link you want to send')
            .setRequired(true))
    ].map(command => command.toJSON());

    const rest = new REST({ version: '10' }).setToken(this.token);

    try {
      console.log('Registering slash commands...');
      await rest.put(
        Routes.applicationCommands(config.clientId),
        { body: commands }
      );
      console.log('Commands registered successfully.');
    } catch (error) {
      console.error('Error registering slash commands:', error);
    }
  }

  async handleSetChannel(interaction) {
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      return interaction.reply('You do not have permission to set the channel.');
    }

    const channel = interaction.options.getChannel('channel');
    if (!channel) {
      return interaction.reply('Please provide a valid channel.');
    }

    this.channelRepository.addChannel(interaction.guild.id, channel.id);
    return interaction.reply(`Channel ${channel} has been added for monitoring.`);
  }

  async handleRemoveChannel(interaction) {
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      return interaction.reply('You do not have permission to remove the channel.');
    }

    const channel = interaction.options.getChannel('channel');
    if (!channel) {
      return interaction.reply('Please provide a valid channel.');
    }

    this.channelRepository.removeChannel(interaction.guild.id, channel.id);
    return interaction.reply(`Channel ${channel} has been removed from monitoring.`);
  }

  async handleSendLink(interaction) {
    const link = interaction.options.getString('link');
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    if (!urlRegex.test(link)) {
      return interaction.reply('Please provide a valid link.');
    }

    const responseMessage = await this.linkHandler.handleLinkAction(link);
    return interaction.reply(responseMessage);
  }
}

const _DiscordBot = DiscordBot;
export { _DiscordBot as DiscordBot };