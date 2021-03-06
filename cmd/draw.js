const Discord = require("discord.js");

function tokenGen () {
    let chars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'q','w','e','r','t','y','u','i','o','p', 'a', 's', 'd','f','g','h','j','k','l', 'z','x','c','v','b','n','m','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M','Q','W','E','R','T','Y','U','I','O','P']
    let token = [];
    for (var i = 0; i < 100; i++) {
        token.push(chars[Math.floor(Math.random() * chars.length)]);
    }
    token = token.join('');
    return token;
}
module.exports = {
    name: 'draw',
    alises: ['그리기', '그림', '그림그리기', '드로잉', 'drawing', 'draw'],
    description: '웹에서 그림을 그릴 수 있어요(Minibox#8888님의 아이디어 참고)',
    category: 'play',
    usage: '/draw',
    run: async (client, message, args, ops) => {
        let t = tokenGen();
        client.drawings.set(t, {
            nick: message.author.tag,
            token: t,
            channel: message.channel.id,
            usr: message.author.id
        });
        await message.channel.send('DM으로 링크를 보냈어요');
        await message.author.send(new Discord.MessageEmbed()
            .setTitle(`그림 그리기 링크`)
            .setColor('RANDOM')
            .setDescription('기다려주셔서 고마워요!\n모바일 브라우저에서는 그림이 잘 그려지지 않을 수 있어요.')
            .setFooter(message.author.tag, message.author.avatarURL())
            .setTimestamp()
            .setURL(`${process.env.WEBSITE}/draw?token=${t}`)
        );
    }
}