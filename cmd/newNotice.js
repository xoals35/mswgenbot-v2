const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    name: 'noticechannel',
    alises: ['공지설정', '공지채널설정', 'noticechannel'],
    description: "봇의 공지 채널을 설정합니다.",
    run: async function (client, message, args, option) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 공지채널 등록 중`)
            .setThumbnail(client.user.displayAvatarURL({
                dynamic: true
            }))
            .setColor(0xffff00)
            .addField('공지 채널 이름', message.channel.name)
            .addField('공지 채널이 속한 서버 이름', message.guild.name)
            .addField('진행 상황', '공지 파일을 가져오는 중')
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        let m = await message.channel.send(embed);
        const notice = require('../assets/notice.json');
        if (!notice.channels[message.guild.id]) {
            notice.channels[message.guild.id] = '0';
        }
        const imbed = new Discord.MessageEmbed()
            .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 공지채널 등록 중`)
            .setThumbnail(client.user.displayAvatarURL({
                dynamic: true
            }))
            .setColor(0xffff00)
            .addField('공지 채널 이름', message.channel.name)
            .addField('공지 채널이 속한 서버 이름', message.guild.name)
            .addField('진행 상황', '공지 파일을 수정하는 중')
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        m.edit(imbed);
        notice.channels[message.guild.id] = message.channel.id;
        fs.writeFile('./assets/notice.json', JSON.stringify(notice), function (err) {
            if (err) console.log(err);
            const ymbed = new Discord.MessageEmbed()
                .setTitle(`공지채널 등록 완료`)
                .setThumbnail(client.user.displayAvatarURL({
                    dynamic: true
                }))
                .setColor(0x00ffff)
                .addField('공지 채널 이름', message.channel.name)
                .addField('공지 채널이 속한 서버 이름', message.guild.name)
                .setFooter(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setTimestamp()
            m.edit(ymbed);
        });
    }
}