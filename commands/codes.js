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
        fs.readFile('./accounts/codes.txt', 'utf8', function(err, data) {
            if (err) throw err;

            data = data + '';
            var lines = data.split('\n');
            let account = lines[Math.floor(Math.random() * 1)];

            fs.writeFile('./accounts/codes.txt', lines.slice(1).join('\n'), function(err) {
                if(err) throw err;
            });

            let embed = new Discord.RichEmbed()
            .addField('Generated', `Fortnite Code: ${account}`)
            .setThumbnail('')
            .setColor('#000000')
            .setFooter('')

            msg.author.send(embed);

            let embed1 = new Discord.RichEmbed()
            .setTitle("Fortnite Code Generated")
            .setDescription("Please check your DM")
            .setFooter("To buy Discord Bots contact andr3w#0001")
            .setThumbnail("https://media.giphy.com/media/hQVr8eVjRWqsjuovo6/200w_d.gif")
            .setColor("#FF2D01")
   
             msg.channel.send(embed1);
            cooldown.add(msg.author.id);
            setTimeout(() => {
                cooldown.delete(msg.author.id);
            }, config.cooldown *60);
        });
    }
};

module.exports.help = {
    name: `codes`,
    description: `Sends you a Fortnite Code!`
};