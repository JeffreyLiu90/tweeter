"use strict";

const Chance      = require("chance"),
      chance      = new Chance();

const md5 = require("md5");


module.exports = {
  generateRandomUser: () => {
    const gender    = chance.gender();
    const firstName = chance.first({gender: gender});
    const lastName  = chance.last();
    const userName  = firstName + " " + lastName;
    
    let userHandle = "@";
    if (Math.random() > 0.5) {
      let prefix    = chance.prefix({gender: gender});
      prefix = prefix.replace(".", "");
      userHandle += prefix
    }

    userHandle += lastName;

    if (Math.random() > 0.5) {
      const suffix = Math.round(Math.random() * 100);
      userHandle += suffix;
    }
   
    const avatars = {
    
      Female: ["https://cdn.lowgif.com/small/5249f6ef405137f8-dank-meme-gifs-tumblr-meme-funny-memes-best-of-the-best.gif","https://media.giphy.com/media/inwq2Z73bbqdW/giphy.gif", "https://media.tenor.com/images/af88192347f98ecc37a8c5b2d0c7a401/tenor.gif","https://media.tenor.com/images/2c474b0b4404b624d80df839bc688b5f/tenor.gif", "https://media.giphy.com/media/JRE3AvLsSRXg360F6l/giphy.gif"],
      Male: ["https://i.gifer.com/X2gn.gif","https://media0.giphy.com/media/a5viI92PAF89q/giphy.gif","https://media.tenor.com/images/adb4c3dfc1552fb064d3d300959b4c56/tenor.gif","https://media1.giphy.com/media/1dIo6kDOPMzsnMOJTj/giphy.gif", "https://media2.giphy.com/media/4ilFRqgbzbx4c/giphy.gif"]
    
    }
    
    const avatarArray = avatars[gender]
    const userAvatar = avatarArray[Math.floor(Math.random()*avatarArray.length)]
  

    return {
      name: userName,
      handle: userHandle,
      avatars: userAvatar
    };
  }
};