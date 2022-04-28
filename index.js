const Discord = require("discord.js");
const {token, prefix} = require('./config.json');
const ms = require("ms");
const fs = require("fs");
const Client = new Discord.Client();

Client.once('ready', async () => {
    console.log("Ready");
    
    Client.user.setPresence({
        status: "online",
        game: {
            name: "Games",
            type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
        }
    });
})

Client.on('message', message => {
    if(message.author.bot) return;
    // HELP
    if(message.content.startsWith(prefix + "help")) {
        if(message.channel.id != "857254589719248896" && message.channel.id != "806074336842612786"){
            message.reply("You're not allowed to use this command in this channel. Please use <#857254589719248896>.")
            return;
        }
        const exampleEmbed = new Discord.MessageEmbed()
          .setColor('#00FF00')
          .setTitle('Lyrel Entertainment!')
          .setAuthor('Lyrel Gaming Bot')
          .setDescription('You can explore subtopics by using **e!help <topicname>** command.')
          .setThumbnail('https://www.mysafetysign.com/img/lg/I/tourist-information-symbol-iso-sign-is-1293.png')
          .addFields(
              { name: 'Guessing Game:', value: "Bot will think of a random letter/word/number that users need to think." },
              { name: 'Word Game:', value: "Users need to say a word that starts with the last letter of the last word." },
              { name: 'Chat Bot:', value: "Users can chat with AI." },
              { name: 'Movie Night:', value: "Weekly Movie night consists of one user streaming the movie for others to see together." }
          )
          .setTimestamp()
          .setFooter('Lyrel Gaming Bot by TheUnknown', 'https://i.imgur.com/B4wf04F.jpg');
        message.channel.send(exampleEmbed);
    }
    
    //GUESSING GAME
    if(message.content.startsWith(prefix + "guess")) {
        if(message.channel.id != "857254589719248896" && message.channel.id != "806074336842612786"){
            message.reply("You're not allowed to use this command in this channel. Please use <#857254589719248896>.")
            return;
        }
        let responsesD = '99';
        message.reply('What game mode do you want to choose?\n(*Type your response in the number or the word associated with your choice* ) \n\n1) Number\n2) Letter\n3) Word')  
        const filter = m => !m.author.bot;
        const collector = message.channel.createMessageCollector(filter, { time: 10000 });

        collector.on('collect', m => {
            if (m.content == '1' || m.content.toUpperCase() == 'NUMBER') {
                responsesD = '1';
                collector.stop()
            } else if (m.content == '2' || m.content.toUpperCase() == 'LETTER') {
                responsesD = '2';
                collector.stop()
            } else if (m.content == '3' || m.content.toUpperCase() == 'WORD'){
                responsesD = '3';
                collector.stop()
            } else {
                message.channel.send('Invalid response!')
                collector.stop()
            }
        });
        
        collector.on('end', collected => {
            if(responsesD == '99') message.channel.send('An error occurred and the command has cancelled.');
            if(responsesD == '1'){
                message.channel.send('I will choose a random number and you have 3 tries to guess it.')
                message.channel.send('Ok here we go, let me know your choice.')
                var responsesDsDsDsDsDsDsDsDsDsD = '99';
                var Rnumber = Math.floor(Math.random() * 11);
            
                var boolS = false;
                const filter = m => !m.author.bot;
                const collector1 = message.channel.createMessageCollector(filter, { time: 10000 });
    
                collector1.on('collect', m => {
                    var a = parseInt(m.content)
                    if (a == Rnumber) {
                        m.channel.send('Bravo! You got it in first try!')
                        boolS = true;
                    }
                    else if (a<Rnumber){
                        m.channel.send('Your number was smaller than what I guessed. Try: 1 of 3')
                    }
                    else if (a>Rnumber){
                        m.channel.send('Your number was larger than what I guessed. Try: 1 of 3')
                    }
                    collector1.stop()
                });
    
                collector1.on('end', collected => {
                    if(!boolS){
                        const filter = m => !m.author.bot;
                        const collector2 = message.channel.createMessageCollector(filter, { time: 10000 });
    
                        collector2.on('collect', m => {
                            var a = parseInt(m.content)
                            if (a == Rnumber) {
                                m.channel.send('Well Played! Want to have another round? Use *e!guess*')
                                boolS = true;
                            }
                            else if (a<Rnumber){
                                m.channel.send('Your number was smaller than what I guessed. Try: 2 of 3')
                            }
                            else if (a>Rnumber){
                                m.channel.send('Your number was larger than what I guessed. Try: 2 of 3')
                            }
                            collector2.stop()
                        });
    
                        collector2.on('end', collected => {
                            if(!boolS){
                                const filter = m => !m.author.bot;
                                const collector3 = message.channel.createMessageCollector(filter, { time: 10000 });
    
                                collector3.on('collect', m => {
                                    var a = parseInt(m.content)
                                    if (a == Rnumber) {
                                        m.channel.send('Well Played! Want to have another round? Use *e!guess*')
                                        boolS = true;
                                    }
                                    else if (a<Rnumber){
                                        m.channel.send('Nice try. I guessed ' + String(Rnumber))
                                    }
                                    else if (a>Rnumber){
                                        m.channel.send('Nice try. I guessed ' + String(Rnumber))
                                    }
                                    collector3.stop()
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});

Client.login(token);
