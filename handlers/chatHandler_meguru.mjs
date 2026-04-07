// ▼▼▼ めぐる専用のセリフリスト ▼▼▼
const responseList = [
    { keyword: 'おはよう', reply: 'おはよう！☀' },
    { keyword: 'おやすみ', reply: '...zzz' },
    { keyword: 'よしよし', reply: 'よちよち❤' },
    { keyword: 'めぐりゅ', reply: 'ば～ぶ❤' },
    { keyword: 'めぐる', reply: 'もちみやめぐりゅ　でちゅ！' },
    { keyword: 'もち', reply: 'もちみや～～～' },
    { keyword: 'ぎゅ', reply: 'ぎゅーだよー！！' },
    { keyword: '悲', reply: 'やだよぉ...' },
    { keyword: ['疲れた', 'おつかれ', 'お疲れ'], reply: '今日はもうおちまい！' },
    { keyword: ['ねむい', '眠い'], reply: 'うとうと…' },
    { keyword: ['かわいい','可愛い'], reply: 'えへへへ～！' },
    { keyword: ['おかし','おやつ','お菓子'], reply: 'やったよ！ー！！' },
    { keyword: ['好き', 'すき'], reply: 'だいちゅき❤' },
    { keyword: ['応援', 'おうえん'], reply: 'フレ！フレ！がんばれ！君ならできりゅ！' }
];

export async function handleMessage(message) {
    if (message.author.bot) return;

    const allowedChannels = [
        '1468953901721063446',  
        '1271671804448084008'   
    ];

    if (!allowedChannels.includes(message.channel.id)) return;

    for (const item of responseList) {
        let isMatch = false;
        if (Array.isArray(item.keyword)) {
            isMatch = item.keyword.some(k => message.content.includes(k));
        } else {
            isMatch = message.content.includes(item.keyword);
        }

        if (isMatch) {
            try {
                await message.reply(item.reply);
                console.log(`💬 [めぐる] 反応: "${item.keyword}" -> ${message.author.tag}`);
                return;
            } catch (error) {
                console.error('❌ [めぐる] 返信エラー:', error);
            }
        }
    }
}