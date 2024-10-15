import sqlite3 from 'better-sqlite3';

class ChannelRepository {
  constructor(dbFile) {
    this.db = sqlite3(dbFile);
    this.initialize();
  }

  initialize() {
    this.db.prepare(`
      CREATE TABLE IF NOT EXISTS channels (
        guild_id TEXT,
        channel_id TEXT,
        PRIMARY KEY (guild_id, channel_id)
      )
    `).run();
  }

  addChannel(guildId, channelId) {
    this.db.prepare(`
      INSERT OR IGNORE INTO channels (guild_id, channel_id)
      VALUES (?, ?)
    `).run(guildId, channelId);
  }

  removeChannel(guildId, channelId) {
    this.db.prepare('DELETE FROM channels WHERE guild_id = ? AND channel_id = ?')
      .run(guildId, channelId);
  }

  removeAllChannelsFromGuild(guildId) {
    this.db.prepare('DELETE FROM channels WHERE guild_id = ?').run(guildId);
  }

  getWatchedChannels(guildId) {
    return this.db.prepare('SELECT channel_id FROM channels WHERE guild_id = ?').all(guildId);
  }
}

const _ChannelRepository = ChannelRepository;
export { _ChannelRepository as ChannelRepository };
