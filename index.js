const Discord = require('discord.js');
const bot = new Discord.Client();

const prefix = '!';

const fs = require('fs');
const fichier = fs.readFileSync('./db.json','utf-8');
const db = JSON.parse(fichier);

let emoji_pierre = 'https://cdn.discordapp.com/emojis/700670896448471090.png?v=1'

bot.on('guildMemberAdd', member => {
  member.createDM().then(channel => {
    return channel.send('Bienvenue sur mon serveur **'+member.displayName+'** !')
  }).catch(console.error)
})

function dbWrite(){
  fs.writeFile('./db.json', JSON.stringify(db),(err)=>{
    if (err){
      return channel.send('Une erreur est survenue lors de l\'écriture des données.');
    }
  });
}


function shifumiEmbedResult(issue,enjeu){
  let s ='';
  if (enjeu > 1){
    s = 's';
  }
  let scissorswin = new Discord.MessageEmbed()
    .setColor('#2CB03E')
    .setTitle('Gagné !')
    .setDescription(`Vous avez gagné **${enjeu}** coin${s} !`)
    .addField('\u200b','Vous : ✂ ** | ** Bot : 🧻');
  let scissorslose = new Discord.MessageEmbed()
    .setColor('#B02832')
    .setTitle('Perdu !')
    .setDescription(`Vous avez perdu **${enjeu}** coin${s} !`)
    .addField('\u200b','Vous : ✂ ** | ** Bot : <:rock_game:700670896448471090>');
  let schissorsequal = new Discord.MessageEmbed()
    .setColor('#3648EC')
    .setTitle('Egalité !')
    .setDescription('Vous n\'avez rien gagné ni perdu !')
    .addField('\u200b','Vous : ✂ ** | ** Bot : ✂');
  let rockwin = new Discord.MessageEmbed()
    .setColor('#2CB03E')
    .setTitle('Gagné !')
    .setDescription(`Vous avez gagné **${enjeu}** coin${s} !`)
    .addField('\u200b','Vous : <:rock_game:700670896448471090> ** | ** Bot : ✂');
  let rocklose = new Discord.MessageEmbed()
    .setColor('#B02832')
    .setTitle('Perdu !')
    .setDescription(`Vous avez perdu **${enjeu}** coin${s} !`)
    .addField('\u200b','Vous : <:rock_game:700670896448471090> ** | ** Bot : 🧻');
  let rockequal = new Discord.MessageEmbed()
    .setColor('#3648EC')
    .setTitle('Egalité !')
    .setDescription('Vous n\'avez rien gagné ni perdu !')
    .addField('\u200b','Vous : <:rock_game:700670896448471090> ** | ** Bot : <:rock_game:700670896448471090>');
  let paperwin = new Discord.MessageEmbed()
    .setColor('#2CB03E')
    .setTitle('Gagné !')
    .setDescription(`Vous avez gagné **${enjeu}** coin${s} !`)
    .addField('\u200b','Vous : 🧻 ** | ** Bot : <:rock_game:700670896448471090>');
  let paperlose = new Discord.MessageEmbed()
    .setColor('#B02832')
    .setTitle('Perdu !')
    .setDescription(`Vous avez perdu **${enjeu}** coin${s} !`)
    .addField('\u200b','Vous : 🧻 ** | ** Bot : ✂');
  let paperequal = new Discord.MessageEmbed()
    .setColor('#3648EC')
    .setTitle('Egalité !')
    .setDescription('Vous n\'avez rien gagné ni perdu !')
    .addField('\u200b','Vous : 🧻 ** | ** Bot : 🧻');

  switch (issue){
    case 1:
      return scissorswin;
      break;
    case 2:
      return scissorslose;
      break;
    case 3:
      return schissorsequal
      break;
    case 4:
      return rockwin;
      break;
    case 5:
      return rocklose;
      break;
    case 6:
      return rockequal;
      break;
    case 7:
      return paperwin;
      break;
    case 8:
      return paperlose;
      break;
    case 9:
      return paperequal;
      break;
  }
}

function whichChoose(){
  let randomise = Math.random();
  let choose = ""
  if(randomise<=0.33){;
    choose = "ciseaux"
  }else if(randomise>0.33 && randomise<=0.66){
    choose = "papier";
  }else{
    choose = "pierre";
  }
  console.log(randomise);
  return choose;
}

function hasWin(choose){
  whichChoose();
  let whichChooser = whichChoose();
  let status = "";
  if(whichChooser==choose){
    status = "equality";
    return status;
  } else if (whichChooser == "ciseaux" && choose == "papier"){
    status = "lose";
    return status;
  }else if (whichChooser == "ciseaux" && choose == "pierre"){
    status = "win";
    return status;
  }else if (whichChooser == "papier" && choose == "ciseaux"){
    status = "win";
    return status;
  }else if (whichChooser=="papier" && choose == "pierre"){
    status = "lose"
    return status;
  }else if(whichChooser=="pierre" && choose == "ciseaux"){
    status = "lose";
    return status;
  }else if (whichChooser=="pierre" && choose == "papier"){
    status = "win";
    return status;
  }
}

bot.on('message',message=>{
  if(message.content.startsWith(prefix)){
    let args = message.content.split(' ');
    let args1 = args[0];
    let channel = message.channel;
    let user = message.mentions.users.first() || message.author;
    switch (args1){
      case prefix+'say':
        if(args.length==1){
          channel.send("Veuillez insérez une phrase / des mots après la commande !say");
          break;
        }
        let phrase = "";
        for(let i = 1;i<args.length;i++){
          phrase+=args[i];
          if(i<args.length-1){
            phrase += ' ';
          }
        }
        channel.send(phrase);
        message.delete();
        break;
      case prefix+'ping':
        channel.send("Pong !")
        break;
      case prefix+'coin':
        if(user.id===message.author.id){
          return channel.send('Vous ne pouvez pas vous donnez vous même une pièce !');
        }
        if(!db[user.id]){
          db[user.id].coins = 0;
        }
        if(!db[message.author.id]){
          db[message.author.id].coins = 0;
        }
        if(db[message.author.id].coins < 1){
          return channel.send('Vous n\'avez pas assez de pièces pour en donnez !');
        }
        db[message.author.id].coins--;
        db[user.id].coins++;
        fs.writeFile('./db.json', JSON.stringify(db),(err)=>{
          if (err){
            return channel.send('Une erreur est survenue lors de l\'écriture des données.');
          }
          channel.send(`Vous avez donné 1 coin à **${user.username}**`);
        });
        break;
      case prefix+'coins':
        if(!db[user.id] || !db[user.id].coins){
          return channel.send(`**${user.username}** n'est pas enregistrée et n'a donc par conséquant aucune pièce !`);
        }
        else{
          channel.send(`**${user.username}** a **${db[user.id].coins}** coins !`)
        }
        break;
      case prefix+'sudogive':
        if(!message.member.hasPermission('ADMINISTRATOR')){
          return channel.send('Vous n\'avez pas les permissions nécessaires !');
        }
        let ajout = 1;
        let index = 1;
        if(args[1].startsWith('<@')){
          index = 2;
        }
        if(!isNaN(args[index])){
          ajout = parseInt(args[index]);
        }
        if(!db[user.id]){
          db[user.id] = {};
          db[user.id].coins = 0;
        }
        if(!db[user.id].coins){
          db[user.id].coins = 0;
        }
        db[user.id].coins+=ajout;
        fs.writeFile('./db.json', JSON.stringify(db),(err)=>{
          if (err){
            return channel.send('Une erreur est survenue lors de l\'écriture des données.');
          }
          channel.send(`Vous avez give ${ajout} coins à **${user.username}**`);
        });
        break;
      case prefix+'warn':
        if(!message.member.hasPermission('ADMINISTRATOR')){
          return channel.send('Vous n\'avez pas les permissions nécessaires !');
        }
        if(args.length==1){
          return channel.send('Veuillez inserez quelqu\'un derrière la commande !warn');
        }
        if(!db[user.id]){
          db[user.id].warns = 0;
        }else if(!db[user.id].warns){
          db[user.id].warns = 0;
        }
        db[user.id].warns++;
        if(db[user.id].warns==3){
          db[user.id].warns = 0;
          let kickMember = message.guild.member(user); 
          kickMember.createDM().then(channel =>{
            channel.send('Tu as été kick car tu as été warn 3 fois ! Fais plus attention désormais.');
          }).catch(console.error);
          kickMember.kick();
          db[user.id] = {};
          return;
        }
        fs.writeFile('./db.json', JSON.stringify(db),(err)=>{
          if (err){
            return channel.send('Une erreur est survenue lors de l\'écriture des données.');
          }
          channel.send(`Vous avez warn **${user.username}**`);
        });
        break;
      case prefix+'warns':
        if(!db[user.id].warns){
          return channel.send('Vous n\'avez encore jamais été warn ! Vous êtes un membre exemplaire !');
        }
        else{
          channel.send(`${user.username} a été warn **${db[user.id].warns}** fois !`);
        }
        break;
      case prefix+'kick':
        let kickReason = ""
        if(!message.member.hasPermission('ADMINISTRATOR')){
          return channel.send("Vous n'avez pas les permissions nécessaires !");
        }
        if(args.length == 1){
          return channel.send("Veuillez tag quelqu'un dans la commande kick !")
        }
        if(!args[1].startsWith('<@')){
          return channel.send("Veuillez tag quelqu'un dans la commande kick !")
        }
        if(user == message.author){
          return channel.send("Vous ne pouvez pas vous auto-kick !")
        }
        for(let i = 2;i < args.length; i++){
          kickReason += args[i];
          if(i < args.length-1){
            kickReason += ' ';
          }
        }
        let kickMember = message.guild.member(user);
        kickMember.kick();
        message.delete();
        channel.send('**'+user.username + '** a été expulsé pour : **'+kickReason+'**');
        break;
      case prefix+'ban':
        let banReason = ""
        if(!message.member.hasPermission('ADMINISTRATOR')){
          return channel.send("Vous n'avez pas les permissions nécessaires !");
        }
        if(args.length == 1){
          return channel.send("Veuillez tag quelqu'un dans la commande ban !")
        }
        if(!args[1].startsWith('<@')){
          return channel.send("Veuillez tag quelqu'un dans la commande ban !")
        }
        if(user == message.author){
          return channel.send("Vous ne pouvez pas vous auto-ban !")
        }
        for(let i = 2;i < args.length; i++){
          banReason += args[i];
          if(i < args.length-1){
            banReason += ' ';
          }
        }
        let banMember = message.guild.member(user);
        banMember.ban();
        message.delete();
        channel.send('**'+user.username + '** a été banni pour : **'+banReason+'**');
        break;
      case prefix+'help':
        const helpEmbed = new Discord.MessageEmbed()
          .setColor('#0081C1')
          .setTitle('Commands Help')
          .setDescription('A presentation of the bot\'s commands, for remember the bot\s prefix is : **'+prefix+"**")
          .addFields(
            {name: '\u200b',value:'\u200b'},
            {name: 'Help', value : 'This command shows this !'},
            {name: 'Ping', value: 'Pong !'},
            {name : 'Coin',value:'Give somebody one of your coins !'},
            {name: 'Coins',value:'To see somebody\'s coins !'},
            {name:'Sudogive', value:'Give somebody a coin (need the administrator permission)'},
            {name:'Warn',value:'To warn somebody (need the administrator permission)'},
            {name:'Warns',value:'To see someone warns'},
            {name:'Kick',value:'To kick somebody (need the administrator permission)'},
            {name:'Ban',value:'To ban somebody (need the administrator permission)'}
          )
        channel.send(helpEmbed);
        break;
      case prefix+'shifumi':
        let enjeu;
        let i = 1;
        if(args.length > 1){
          if(args[1].startsWith('<@')){
            i = 2;
          }
        }
        if(!isNaN(args[i])){
          enjeu = args[i];
          enjeu = parseInt(enjeu);
        }else{
          enjeu = 1;
        }
        if(!db[user.id]){
          db[user.id] = {};
        }
        if(!db[user.id].coins){
          db[user.id].coins = 0
        }
        if(db[user.id].coins < enjeu){
          return channel.send('Vous n\'avez pas l\'argent nécessaire !');
        }
        db[user.id].coins-=enjeu;

        dbWrite();

        let mess = new Discord.Message()
        const shifumiEmbed = new Discord.MessageEmbed()
            .setColor('#0081C1')
            .setTitle('SHI-FU-MI')
            .setDescription('Clique sur une réaction pour choisir !')
        channel.send(shifumiEmbed).then(message =>{
          message.react("✂");
          message.react("700670896448471090");
          message.react("🧻");
          mess = message;
        });
        let alreadyChoose = false;
        bot.on('messageReactionAdd',(MessageReaction,user)=>{
          if(MessageReaction.client.id != user.id){
            return;
          }
          if(MessageReaction.message.id != mess.id){
            return;
          }
          if(user.id =='696732399479816283' || user.id == 696732399479816283){
            return;
          }
          let choose = "";
          if(MessageReaction.emoji.name=='✂' && !alreadyChoose){
            alreadyChoose = true;
            choose = "ciseaux";
            switch(hasWin(choose)){
              case 'equality':
                db[user.id].coins += enjeu;
                dbWrite();
                return channel.send(shifumiEmbedResult(3,enjeu));
                break;
              case 'win':
                db[user.id].coins += enjeu*2;
                dbWrite();
                return channel.send(shifumiEmbedResult(1,enjeu));
                break;
              case 'lose':
                return channel.send(shifumiEmbedResult(2,enjeu));
                break;
            }
          }else if(MessageReaction.emoji.name=='🧻' && !alreadyChoose){
            alreadyChoose = true;
            choose = "papier";
            switch(hasWin(choose)){
              case 'equality':
                db[user.id].coins += enjeu;
                dbWrite();
                return channel.send(shifumiEmbedResult(9,enjeu));
                break;
              case 'win':
                db[user.id].coins += enjeu*2;
                dbWrite();
                return channel.send(shifumiEmbedResult(7,enjeu));
                break;
              case 'lose':
                return channel.send(shifumiEmbedResult(8,enjeu));
                break;
            }
          }else if(MessageReaction.emoji.id=='700670896448471090' && !alreadyChoose){
            alreadyChoose = true;
            choose = "pierre";
            switch(hasWin(choose)){
              case 'equality':
                db[user.id].coins += enjeu;
                dbWrite();
                return channel.send(shifumiEmbedResult(6,enjeu));
                break;
              case 'win':
                db[user.id].coins += enjeu*2;
                dbWrite();
                return channel.send(shifumiEmbedResult(4,enjeu));
                break;
              case 'lose':
                return channel.send(shifumiEmbedResult(5,enjeu));
                break;
            }
          }else{
            return channel.send('Vous avez ajouter un émoji invalide !')
          }
        })
        break;
      case prefix+'setcoins':
        if(!message.member.hasPermission('ADMINISTRATOR')){
          return channel.send("Vous n'avez pas les permissions nécessaires !");
        }
        if(args.length==1){
          return channel.send('Veuillez insérez des arguments derrière la commande svp !');
        }
        let indexor = 1;
        if(!db[user.id]){
          db[user.id] = {};
        }
        if(!db[user.id].coins){
          db[user.id].coins = 0;
        }
        let toSet = db[user.id].coins;
        if(args[1].startsWith('<@')){
          indexor = 2;
        }
        if(!isNaN(args[indexor])){
          toSet = args[indexor];
        }
        db[user.id].coins = toSet;
        dbWrite()
        channel.send(`Vous avez bien set l'argent de **${user.username}** à **${toSet}**`);
        break;
      default:
        return channel.send('Je ne connais pas cette commande !');
    }
  }
});

bot.login('Njk2NzMyMzk5NDc5ODE2Mjgz.XotBaQ.8Ds1_lf5ygwSXm9IOxBGDYJshQs')

