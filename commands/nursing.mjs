import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('nursing')
  .setDescription('プロデューサーさんは...!');

export async function execute(interaction){
  const arr = ["エビさん...ですから...これからおいしいおいしい...てんぷらさんに...なるんですよ...?", "もちもちさん...ですから...ぎゅって...してあげます...", "江戸切子職人さん...ですから...霧子のどこが...好きですか...？"]
  const random = Math.floor( Math.random() * arr.length);
  const color = arr[random];

    await interaction.reply(`プロデューサーさんは...${color}`);
}
