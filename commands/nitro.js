const Discord = require('discord.js');
const fs = require('fs');
const cooldown = new Set();

module.exports.run = async (client, msg, args, config) => {
    if(cooldown.has(msg.author.id)) {
        msg.reply(`You need to wait ${config.COOLDOWN} minutes to use this command again!`)
            .then((m) => {
                msg.delete();

                setTimeout(() => {
                    m.delete();
                }, 5000);
            });
    } else {
        fs.readFile('./accounts/nitro.txt', 'utf8', function(err, data) {
            if (err) throw err;

            data = data + '';
            var lines = data.split('\n');
            let account = lines[Math.floor(Math.random() * 1)];

            fs.writeFile('./accounts/nitro.txt', lines.slice(1).join('\n'), function(err) {
                if(err) throw err;
            });

            let embed = new Discord.RichEmbed()
            .addField('Generated', `Nitro Code: ${account}`)
            .setThumbnail('')
            .setColor('#000000')
            .setFooter('')

            msg.author.send(embed);

            let embed1 = new Discord.RichEmbed()
            .setTitle("Nitro Code Generated")
            .setDescription("Please check your DM")
            .setFooter("To buy Discord Bots contact andr3w#0001")
            .setThumbnail("")
            .setColor("#501ad9")
   
             msg.channel.send(embed1);
            cooldown.add(msg.author.id);
            setTimeout(() => {
                cooldown.delete(msg.author.id);
            }, config.cooldown *60);
        });
    }
};

module.exports.help = {
    name: `nitro`,
    description: `Sends you a Nitro Code!`
};