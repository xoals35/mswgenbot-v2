const Discord = require('discord.js');
var verify = {
    NONE: '없음',
    LOW: '낮음',
    MEDIUM: '보통',
    HIGH: '높음',
    VERY_HIGH: '매우 높음'
};
function hasAFK(guild) {
    if (guild.afkChannel) {
        return guild.afkChannel.name;
    } else {
        return '없음';
    }
}
var filter = {
    DISABLED: '미디어 콘텐츠를 스캔하지 않음',
    MEMBERS_WITHOUT_ROLES: '역할 없는 멤버의 미디어 콘텐츠를 스캔함',
    ALL_MEMBERS: '모든 멤버의 미디어 콘텐츠를 스캔함'
};
function parseDate(date) {
    var days = {
        Sun: '일',
        Mon: '월',
        Tue: '화',
        Wed: '수',
        Thu: '목',
        Fri: '금',
        Sat: '토'
    };
    var months = {
        Jan: '1',
        Feb: '2',
        Mar: '3',
        Apr: '4',
        May: '5',
        Jun: '6',
        Jul: '7',
        Aug: '8',
        Sep: '9',
        Oct: '10',
        Nov: '11',
        Dec: '12'
    };
    var toParse = date.toString().split(/ /g);
    var toReturn = new Array();
    toReturn.push(toParse[3] + '년');
    toReturn.push(months[toParse[1]] + '월');
    toReturn.push(toParse[2] + '일');
    toReturn.push(days[toParse[0]] + '요일');
    var time = toParse[4].split(':');
    toReturn.push(time[0] + '시');
    toReturn.push(time[1] + '분');
    toReturn.push(time[2] + '초');
    var timeZone = toParse.slice(6).join(' ');
    toReturn.push(timeZone);
    var Final = toReturn.join(' ');
    return Final;
}
function isVerified(guild) {
    if (guild.verified) {
        return '인증됨';
    } else {
        return '인증되지 않음';
    }
}
var notify = {
    ALL: '모든 알림',
    MENTIONS: '@mentions만'
};
module.exports = {
    name: 'serverinfo',
    alises: ['서버정보', '정보서버', 'server-info', 'serverinfo'],
    description: '메세지를 입력한 서버의 정보를 알려줍니다.',
    run: async function (client, message, args, option) {
        const imbed = new Discord.MessageEmbed()
            .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 서버 정보를 받아오는 중...`)
            .setTimestamp()
            .setColor(0xffff00)
        let m = await message.channel.send(imbed);
        const embed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name} 정보`)
            .setColor(0x00ffff)
            .setThumbnail(message.guild.iconURL({
                dynamic: true
            }))
            .addField('서버 이름', message.guild.name)
            .addField('서버 주인', `${message.guild.owner.user}`)
            .addField('서버 생성일', parseDate(message.guild.createdAt))
            .addField('서버 인원 수', message.guild.memberCount)
            .addField('서버 부스트 레벨', message.guild.premiumTier)
            .addField('서버 위치', message.guild.region)
            .addField('서버 보안 레벨', verify[message.guild.verificationLevel])
            .addField('기본 알림 설정', notify[message.guild.defaultMessageNotifications])
            .addField('서버 인증 여부', isVerified(message.guild))
            .addField('시스템 메세지 채널', `${message.guild.systemChannel}` || '없음')
            .addField('잠수 채널 이름', hasAFK(message.guild))
            .addField('잠수 시간', `${message.guild.afkTimeout}초`)
            .addField('유해 미디어 콘텐츠 필터', filter[message.guild.explicitContentFilter])
            .setImage(message.guild.splashURL({
                dynamic: true
            }))
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        m.edit(embed);
        const ymbed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name} 서버의 역할(${message.guild.roles.cache.size}개)`)
            .setColor(0x00ffff)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
        var x = new Array();
        message.guild.roles.cache.forEach(function (i) {
            x.push(`${i}`);
        });
        x = x.join(', ');
        ymbed.setDescription(x);
        message.channel.send(ymbed);
        const emved = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name} 서버의 이모지(${message.guild.emojis.cache.size}개)`)
            .setColor(0x00ffff)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
        emved.setDescription(message.guild.emojis.cache.map(x => x.toString()).join(' '));
        message.channel.send(emved);
    }
}