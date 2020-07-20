const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);

client.once("ready", () => {
  console.log("Ready for action!");
});

client.on("message", (message) => {
  if (!message.member.roles.cache.has(config["announcer-role"]) || !message.content.startsWith("!") || message.author.bot) return;

  const args = message.content.slice(1).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command == "announce") {
    var announcement = "";
    for (const word in args) {
      announcement = announcement + args[word] + " ";
    }
    webhookClient.send(announcement)
  }
})

client.login(config.token);
