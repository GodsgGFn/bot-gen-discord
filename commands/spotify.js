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
        fs.readFile('./accounts/spotify.txt', 'utf8', function(err, data) {
            if (err) throw err;

            data = data + '';
            var lines = data.split('\n');
            let account = lines[Math.floor(Math.random() * 1)];

            fs.writeFile('./accounts/spotify.txt', lines.slice(1).join('\n'), function(err) {
                if(err) throw err;
            });

            let embed = new Discord.RichEmbed()
            .addField('Generated', `Account: ${account}`)
            .setThumbnail('')
            .setColor('#000000')
            .setFooter('')

            msg.author.send(embed);

            let embed1 = new Discord.RichEmbed()
            .setTitle("Spotify Account Generated")
            .setDescription("Please check your DM")
            .setFooter("To buy Discord Bots contact andr3w#0001")
            .setThumbnail("https://media.giphy.com/media/cP0B3J1bed89oWYoo5/200w_d.gif")
            .setColor("#501ad9")
   
             msg.channel.send(embed1);
            cooldown.add(msg.author.id);
            setTimeout(() => {
                cooldown.delete(msg.author.id);
            }, config.cooldown * 60 * 1000);
        });
    }
};

module.exports.help = {
    name: `spotify`,
    description: `Generate Spotify Premium Account`
};