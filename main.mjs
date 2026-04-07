import { Client, GatewayIntentBits, Collection, ActivityType } from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';

// --- 各Botのコマンドとハンドラーを読み込み ---

// もちみやめぐる用
import * as meguruIllumination from './commands/illumination.mjs';
import * as meguruJanken from './commands/janken.mjs';
import { handleMessage as meguruChat } from './handlers/chatHandler_meguru.mjs';

// もちこくきりこ用
import * as kirikoKnights from './commands/knights.mjs';
import * as kirikoNursing from './commands/nursing.mjs';
import { handleMessage as kirikoChat } from './handlers/chatHandler_kiriko.mjs';

dotenv.config();

// 共通のインテント設定
const botIntents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
];

// --- 1. もちみやめぐるのインスタンス作成 ---
const clientMeguru = new Client({ intents: botIntents });
clientMeguru.commands = new Collection();
clientMeguru.commands.set(meguruIllumination.data.name, meguruIllumination);
clientMeguru.commands.set(meguruJanken.data.name, meguruJanken);

// --- 2. もちこくきりこのインスタンス作成 ---
const clientKiriko = new Client({ intents: botIntents });
clientKiriko.commands = new Collection();
clientKiriko.commands.set(kirikoKnights.data.name, kirikoKnights);
clientKiriko.commands.set(kirikoNursing.data.name, kirikoNursing);

/**
 * Botの共通セットアップ関数
 * @param {Client} client - Botのインスタンス
 * @param {string} name - ログ表示用の名前
 * @param {string} activityText - プロフィールに表示するステータス
 * @param {Array} commandsList - 登録するコマンドファイルの配列
 */
const setupBot = (client, name, activityText, commandsList) => {
    client.once('ready', () => {
        console.log(`🎉 ${client.user.tag} (${name}) が正常に起動しました！`);
        client.user.setActivity(activityText, { 
            type: ActivityType.Custom, 
            state: activityText 
        });

        // コマンド登録
        const commands = commandsList.map(cmd => cmd.data.toJSON());
        client.application.commands.set(commands)
            .then(() => console.log(`✅ ${name} のコマンド登録完了`))
            .catch(console.error);
    });

    // スラッシュコマンド処理
    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            const errorMsg = { content: '❌ エラーが発生しました', ephemeral: true };
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(errorMsg).catch(console.error);
            } else {
                await interaction.reply(errorMsg).catch(console.error);
            }
        }
    });
};

// --- それぞれをセットアップ ---
setupBot(clientMeguru, 'めぐる', 'みんなのことがだいちゅき❤', [meguruIllumination, meguruJanken]);
setupBot(clientKiriko, '霧子', 'Pさんは...もちもち...ですから...！', [kirikoKnights, kirikoNursing]);

// --- メッセージ受信処理（個別に設定） ---
clientMeguru.on('messageCreate', (message) => {
    if (message.author.bot) return;
    meguruChat(message);
});

clientKiriko.on('messageCreate', (message) => {
    if (message.author.bot) return;
    kirikoChat(message);
});

// --- Webサーバー設定（Render用：1つに統合） ---
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        status: 'All Bots are running! 🤖🤖',
        meguru: clientMeguru.user?.tag || 'offline',
        kiriko: clientKiriko.user?.tag || 'offline',
        uptime: process.uptime()
    });
});

app.listen(port, () => {
    console.log(`🌐 Web サーバーがポート ${port} で起動しました`);
});

// --- 各トークンでログイン ---
clientMeguru.login(process.env.DISCORD_TOKEN_MEGURU);
clientKiriko.login(process.env.DISCORD_TOKEN_KIRIKO);