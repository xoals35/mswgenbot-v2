const Discord = require('discord.js');
module.exports = {
    name: 'firework',
    alises: ['전체전송', 'firework', '파이어워크', '불꽃놀이'],
    description: '명령어를 입력한 서버의 모든 채널에 입력한 메세지를 전송합니다.(봇 제작자만 가능)',
    run: async function (client, message, args, option) {
        if (message.author.id != option.ownerId) return;
        var toSend = args.slice(1).join(' ').toString();
        message.guild.channels.cache.forEach(function (x) {
            if (x.type == 'text') {
                x.send(toSend);
            }
        });
    }
}