require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client({
   partials: ['MESSAGE', 'REACTION']
});

const PREFIX = "$";


client.on('ready', () => {
   console.log(`${client.user.tag} logged in successfully`);
});


client.on('message', async (message) => {
   if (message.author.bot) return;
   // console.log(`[${message.author.tag}]: ${message.content}`);
   if (message.content === 'hello') {
      message.channel.send('hello');
   } else if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
         .trim()
         .substring(PREFIX.length)
         .split(/\s+/);
      
      if (CMD_NAME === 'kick') {
         if (message.member.hasPermission('KICK_MEMBERS'))
            return message.reply('You do not have permission to use that command');
         
         if (args.length === 0)
            return message.reply('Please provide an ID');
         
         const member = message.guild.members.cache.get(args[0]);
         if (member) {
            member
               .kick()
               .then((member) => message.channel.send(`${member} was kicked.`))
               .catch((err) => message.channel.send('Cannot perform the action'));
         } else {
            message.channel.send('That member was not found');
         }
      } else if (CMD_NAME === 'ban') {
         if (message.member.hasPermission('KICK_MEMBERS'))
            return message.reply('You do not have permission to use that command');
         
         if (args.length === 0)
            return message.reply('Please provide an ID');
         
         try {
            const user = await message.guild.members.ban(args[0]);
            message.channel.send(`${user} was banned successfully`);
         } catch (err) {
            message.channel.send('ERROR: Either I do not have permission or user was not found');
         }
      }
   }
});


client.on('messageReactionAdd', (reaction, user) => {
   const { name } = reaction.emoji;
   const member = reaction.message.guild.members.cache.get(user.id);
   if (reaction.message.id === '845991197025894411') {
      switch (name) {
         case '🍎':
            member.roles.add('845994297361956884');
            break;
         case '🍌':
            member.roles.add('845994367964938250');
            break;
         case '🍇':
            member.roles.add('845994426937376768');
            break;
         case '🍑':
            member.roles.add('845994474013196288');
            break;
      }
   }
})



client.on('messageReactionRemove', (reaction, user) => {
   const { name } = reaction.emoji;
   const member = reaction.message.guild.members.cache.get(user.id);
   if (reaction.message.id === '845991197025894411') {
      switch (name) {
         case '🍎':
            member.roles.remove('845994297361956884');
            break;
         case '🍌':
            member.roles.remove('845994367964938250');
            break;
         case '🍇':
            member.roles.remove('845994426937376768');
            break;
         case '🍑':
            member.roles.remove('845994474013196288');
            break;
      }
   }
})

client.login(process.env.DISCORD_BOT_TOKEN);

