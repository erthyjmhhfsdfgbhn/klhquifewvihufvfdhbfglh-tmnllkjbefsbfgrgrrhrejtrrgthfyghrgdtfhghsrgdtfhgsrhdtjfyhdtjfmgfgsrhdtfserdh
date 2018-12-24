const Discord = require('discord.js');
const client = new Discord.Client({ fetchAllMembers: true });
const fs = require("fs");
const Canvas = require('canvas')
const jimp = require('jimp')
const moment = require('moment');
const dateFormat = require('dateformat');
let done = {};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(`server BRG `,"http://twitch.tv/S-F")
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});

client.on('message', message => {
    if (message.content === ('$bot')) {
    message.channel.send({
        embed: new Discord.RichEmbed()
            .setAuthor(client.user.username,client.user.avatarURL)
            .setThumbnail(client.user.avatarURL)
            .setColor('RANDOM')
            .addField('**Bot Ping**🚀 :' , [`${Date.now() - message.createdTimestamp}` + 'MS'], true)
            .addField('**Servers**📚 :', [client.guilds.size], true)
            .addField('**Channels**📝 :' , `[ ${client.channels.size} ]` , true)
            .addField('**Users**🔮 :' ,`[ ${client.users.size} ]` , true)
            .addField('**Bot Name**🔰 :' , `[ ${client.user.tag} ]` , true)
            .addField('**Bot Owner**👑 :' , `[<@368124062997938177>]` , true)
            .setFooter(message.author.username, message.author.avatarURL)
    })
}
});


client.on("message", (message) => {
   if (message.content.startsWith("$new")) {     
        const reason = message.content.split(" ").slice(1).join(" ");     
        if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
        if (message.guild.channels.exists("name", "ticket-{message.author.id}" + message.author.id)) return message.channel.send(`You already have a ticket open.`);    
        message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Support Team");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });    
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: **تم إنشاء تذكرتك ، #${c.name}.**`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .addField(`مرحباّ ${message.author.username}!`, `يرجى محاولة شرح سبب فتح هذه التذكرة بأكبر قدر ممكن من التفاصيل. سيكون فريق الدعم لدينا قريبا للمساعدة.`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error);
    }
 
 
  if (message.content.startsWith("$close")) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
 
        message.channel.send(`هل أنت متأكد؟ بعد التأكيد ، لا يمكنك عكس هذا الإجراء!\n للتأكيد ، اكتب\`$confirm\`. سيؤدي ذلك إلى مهلة زمنية في غضون 10 ثوانٍ وإلغائها`)
            .then((m) => {
                message.channel.awaitMessages(response => response.content === '$confirm', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })   
                    .then((collected) => {
                        message.channel.delete();
                    })    
                    .catch(() => {
                        m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                            m2.delete();
                        }, 3000);
                    });
            });
    }
 
});


const pretty = require('pretty-ms'); // npm i pretty-ms
const credits = require('./Credits.json');
const creditsPath = './Credits.json';
hero.on('message',async message => {
    if(message.author.bot || message.channel.type === 'dm') return;
    let args = message.content.split(' ');
    let author = message.author.id;
    if(!credits[author]) credits[author] = { messages: 0, credits: 0, xp: 0, daily: 86400000 };
    credits[author].messages += 1;
    credits[author].xp += 1;
    if(credits[author].xp === 5) {
        credits[author].xp = 0;
        credits[author].credits += 1;
        fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 4));
    }
    fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 4));
 
   
   if(args[0].toLowerCase() == `${prefix}credit` || args[0].toLowerCase() === `${prefix}credits`) {
       let mention = message.mentions.users.first() || message.author;
       let mentionn = message.mentions.users.first();
       if(!credits[mention.id]) return message.channel.send(`**❎ |** Failed To Find the **Needed Data**.`);
       if(!args[2]) {
        let creditsEmbed = new Discord.RichEmbed()
       .setColor("#36393e")
       .setAuthor(mention.username, mention.avatarURL)
       .setThumbnail(mention.avatarURL)
       .addField(`❯ الكردت`, `» \`${credits[mention.id].credits} $\`\n`, true)
       .addField(`❯ الرسائل`, `» \`${credits[mention.id].messages} 💬\``, true);
       message.channel.send(creditsEmbed);
       
       } else if(mentionn && args[2]) {
           if(isNaN(args[2])) return message.channel.send(`**❎ |** The **"Number"** You Entered **Isn't Correct**.`);
          if(mentionn.id === message.author.id) return message.channel.send(`**❎ |** You Can't Give **Credits** To **Yourself**.`);
           if(args[2] > credits[author].credits) return message.channel.send(`**❎ |** You don't have **Enough** credits to give to ${mentionn}`);
          let first = Math.floor(Math.random() * 9);
          let second = Math.floor(Math.random() * 9);
          let third = Math.floor(Math.random() * 9);
          let fourth = Math.floor(Math.random() * 9);
          let num = `${first}${second}${third}${fourth}`;
         
          message.channel.send(`**${hero.guilds.find(r => r.id === '525039237939200001').emojis.find(e => e.name === 'shield')} |** **Type** \`${num}\` To **Complete** the transfer!`).then(m => {
              message.channel.awaitMessages(r => r.author.id === message.author.id, { max: 1, time: 20000, errors:['time'] }).then(collected => {
                  let c = collected.first();
                  if(c.content === num) {
                          message.channel.send(`**✅ |** Successfully **Transfered** \`$${args[2]}\` !`);
                          m.delete();
                          c.delete();
                          credits[author].credits += (-args[2]);
                          credits[mentionn.id].credits += (+args[2]);
                          fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 4));
                  } else {
                          m.delete();
                  }
              });
          });
         
      } else {
          message.channel.send(`**❎ |** The **Syntax** should be like **\`${$}credits <Mention> [Ammount]\`**`);
      }
  } else if(args[0].toLowerCase() === `${$}daily`) {
      if(credits[author].daily !== 86400000 && Date.now() - credits[author].daily !== 86400000) {
          message.channel.send(`**❎ |** You already **Claimed** the daily ammount of credits since \`${pretty(Date.now() - credits[author].daily)}\`.`);
      } else {
          let ammount = getRandom(300, 500);
          credits[author].daily = Date.now();
          credits[author].credits += ammount;
          fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 4));
          message.channel.send(`**${hero.guilds.find(r => r.id === '525039237939200001').emojis.find(e => e.name === 'True')} |** \`${ammount}\`, Successfully **Claimed** Your daily ammount of credits!`);
      }
  }
});





client.login(process.env.BOT_TOKEN);
