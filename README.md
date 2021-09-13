<h1 align="center"> Vaffelbot :waffle: </h1>
<p align="center"> A lightweight discord bot that functions as a ordering and queue system </p>

## Why?
We informatics students at UiB are very fond of both waffles and programming, which is why we decided to combine them. Every thursday students can come to our reading hall and recieve free waffles and some guidance from our student oracles. This often resulted in long lines of people waiting to recieve their waffles, and long waiting times. During the COVID-19 pandemic this became impossible to do, as 50 people cramped in a small room is a big no-no. That is why one week, we oracles decided to throw together this discord bot that could take orders digitally. This way people could still get their waffles, but without the whole 50 people in one room part. Though this was meant as a temporary solution, it now appears that the Waffle-bot is here to stay. Because of this we have decided to revamp the structure of this repo, and allow for any students that wish, to contribute to the project. 

## Installation
### Config
Before anything can be done you first have to create your ``` .env ``` file. Take a look at the .env.example file and replace the placeholder items with the relevant information. Take a look at this [guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) to set up a discord bot, and enter your token in your ``` .env ``` file.

### Development
Before you start development we suggest that you install some Javascript-friendly IDE (like Visual Studio Code) and you must have Node installed on your system. 
To clone the repository and install dependencies run:
```
  $ git clone git@github.com:alvarhonsi/Vaffelbot.git
  $ cd Vaffelbot
  $ yarn install
```

You can now start development. To start the bot simply run ```node main.js```. The bot will then be hosted locally on your machine, and it can be added to a discord server for testing. If you have already created a bot-application on the discord developer portal, then you can follow this [guide](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links) for how to add the bot to a server. 

### How to contribute
If you have followed the steps above and want to contribute to the project, you can fork the project. When you have commited your new changes you can create a pull request to the <b>develop</b> branch. We will then review the code and give feedback if any changes are needed. If there are no problems with the code it will be merged into the development branch and later merged into the main branch for deployment. :rocket:

## Useful links
https://discordjs.guide/

## License
MIT
