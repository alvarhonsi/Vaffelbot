module.exports = {
    name: "vaffelstop",
    description: "command for announcing the end of a waffle-sale",
    async execute(message, args, waffleData) {
        const { clear_state } = require("../util/state_functions");
        clear_state(waffleData);
        message.channel.send(
            "@here Da er vaffel stekingen stengt for idag. \n" +
                "Velkommen igjen neste Vaffel-Torsdag! :slight_smile:"
        );
    },
};
