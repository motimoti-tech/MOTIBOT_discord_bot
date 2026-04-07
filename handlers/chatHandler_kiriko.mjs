// ▼▼▼ 霧子専用のセリフリスト ▼▼▼
const responseList = [
    { keyword: 'おはよう', reply: 'あ、プロデューサーさん...！' },
    { keyword: 'おやすみ', reply: 'おやすみ...するね...' },
    { keyword: 'よしよし', reply: 'ふふ...' },
    { keyword: ['きりこ', '霧子'], reply: 'きり...きり...きりちゃん...!' },
    { keyword: 'もち', reply: 'もちもちさん...！' },
    { keyword: 'ぎゅ', reply: 'ぎゅー!ふふ...' },
    { keyword: '悲', reply: 'モ...' },
    { keyword: ['疲れた', 'おつかれ', 'お疲れ'], reply: 'お疲れ様です' },
    { keyword: ['かわいい','可愛い'], reply: 'モ...///' },
    { keyword: ['おかし','おやつ','お菓子'], reply: 'モ...！' },
    { keyword: ['応援', 'おうえん'], reply: 'が、頑張ってください...！' }
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
                console.log(`💬 [霧子] 反応: "${item.keyword}" -> ${message.author.tag}`);
                return;
            } catch (error) {
                console.error('❌ [霧子] 返信エラー:', error);
            }
        }
    }
}