<p align="center">
  <a href="" rel="noopener">
 <img height=300px src="https://raw.githubusercontent.com/OniMock/.github/refs/heads/main/.resources/alphabot_webhook/logo.png" alt="Project logo"></a>
</p>

<h3 align="center">Discord-Bot</h3>


---



<p align="center"> This project is a Discord bot that allows you to monitor specific channels and perform actions based on links sent by users. The bot uses Slash Commands for easy interaction, allowing users to add channels to be monitored, remove channels, and process submitted links.
    <br> 
</p>

## 📝 Content
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Development](#development)
- [Authors](#authors)
- [Contributions](#support_me)


## Features <a name = "features"></a>

- Monitor specific channels for link-based actions.
- Slash Commands for easy user interaction.
- Supports multiple servers independently.
- Utilizes SQLite database for persisting monitored channels.

## Requirements <a name = "requirements"></a>

- Node.js v16.6.0 or higher
- A bot configured in the Discord Developer Portal
- Permissions to register slash commands and interact with servers


## 🏁 Installation <a name = "installation"></a>

1. Clone the repository:
    ```bash
    git clone https://github.com/OniMock/discord-bot.git
    cd discord-bot
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create the configuration file:
        
    In the root directory, create a file called config.js and add the following settings:

    ``` bash
        module.exports.config = {
        token: 'YOUR_BOT_TOKEN_HERE',
        clientId: 'YOUR_CLIENT_ID_HERE',
        dbFile: 'watched_channels.db', // Name of the SQLite database file
        };
    ```
4. Start the bot:
    ```bash
    npm start
    ```

## ⛏️ Development com <a name = "development"></a>
### Project Structure

```bash
.
├── src/
│   ├── bot/
│   │   └── DiscordBot.js         # Main bot logic
│   ├── services/
│   │   └── LinkHandler.js        # Handle links
│   └── database/
│       └── ChannelRepository.js  # SQLite database management
├── config.js                     # Configuration file
├── index.js                      # Main js file
├── package.json                  # Project dependencies
└── README.md   
```

### Testing
To perform tests, you can create mocks of the commands and use tools like Jest to ensure that the commands are functioning as expected.

## ✍️ Authors <a name = "authors"></a>

- [@OniMock](https://github.com/OniMock)

If you are interested in helping me with the script or have any suggestions, please contact me

## 🎉 Contributions <a name = "support_me"></a>


<p align="center">
<img width="24%" alt="Wallet" src="https://raw.githubusercontent.com/OniMock/.github/main/.resources/crypto_wallet.svg"/>
</p>

<table align="left">
    <thead>
        <tr>
            <th>Logo</th>
            <th>Network</th>
            <th>Wallet</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="center"><img alt="Bitcoin" src="https://raw.githubusercontent.com/OniMock/.github/main/.resources/bitcoin_logo.svg"/>
            </td>
            <td><font size="3">Bitcoin</font></td>
            <td><code>bc1p24ya6frpr053dhnhsw8mx46kmecxv4s64udecxc5lrk9qcssgxssf6zkpw</code></td>
        </tr>
         <tr>
            <td align="center"><img alt="Solana" src="https://raw.githubusercontent.com/OniMock/.github/main/.resources/solana_logo.svg"/>
            </td>
            <td><font size="3">Solana</font></td>
            <td><code>EMzhyAkJkV4jM8N99A7xJt8vUEcLxcoGT1ukjYXb8NVa</code></td>
         </tr>
         <tr>
            <td align="center" style="width: 20px;"><img alt="Ethereum" src="https://raw.githubusercontent.com/OniMock/.github/main/.resources/binance_logo.svg"/><img alt="Solana" src="https://raw.githubusercontent.com/OniMock/.github/main/.resources/ethereum_logo.svg"/><img alt="Polygon" src="https://raw.githubusercontent.com/OniMock/.github/main/.resources/polygon_logo.svg"/><img alt="Fantom" src="https://raw.githubusercontent.com/OniMock/.github/main/.resources/fantom_logo.svg"/>
            </td>
            <td style="width: 2px;"><font size="2">Binance, Ethereum, Polygon, Fantom ou outra EVM</font></td>
            <td><code>0xE7402cB0191D1C27c9EA0DB14FE62Db2F183bbDe</code></td>
        </tr>
    </tbody>
</table>
