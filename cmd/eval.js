const Discord = require('discord.js');
const util = require('util');
module.exports = {
    name: 'eval', 
    alises: ['eval', '실행', 'compile', '컴파일', 'evaluate'],
    description: '자바스크립트 코드를 바로 실행합니다.(봇 제작자만 가능)',
    run: async function (client, message, args, option) {
        if (message.author.id != option.ownerId) return;
        const arg = message.content.split(" ").slice(1);
        const input = arg.join(" ");
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} Evaling...`)
            .setColor(0xffff00)
            .addField('Input', '```js\n' + input + '\n```')
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        let m = await message.channel.send(embed);
        try {
            let output = eval(input);
            if (typeof output !== "string") {
                output = util.inspect(output);
            }
            if (output.length >= 1020) {
                output = `${output.substr(0, 1010)}...`;
            }
            const embed2 = new Discord.MessageEmbed()
                .setTitle('Eval result')
                .setColor(0x00ffff)
                .addField('Input', '```js\n' + input + '\n```')
                .addField('Output', '```js\n' + output + '\n```')
                .addField('Type', '```js\n' + typeof output + '\n```')
                .setFooter(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setTimestamp()
            m.edit(embed2);
        } catch (err) {
            const embed3 = new Discord.MessageEmbed()
                .setTitle('Eval error...')
                .setColor(0xff0000)
                .addField('Input', '```js\n' + input + '\n```')
                .addField('Error', '```js\n' + err + '\n```')
                .setFooter(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setTimestamp()
            m.edit(embed3);
        }
    }
}