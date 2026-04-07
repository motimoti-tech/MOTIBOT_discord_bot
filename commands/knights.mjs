// commands/illumination.mjs
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('knights') // コマンド名（小文字のみ）
    .setDescription('騎士の誇りを...'); // コマンドの説明

export async function execute(interaction) {
    // コマンドが実行されたときの処理
    await interaction.reply('剣にかけて...！⚔');
    console.log(`📝 ${interaction.user.tag} が /knights コマンドを使用`);
}