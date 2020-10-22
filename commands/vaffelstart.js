module.exports = {
    name: "vaffelstart",
    description: "Command for announcing the start of a waffle-sale",
    async execute(message, args, waffleData) {
        const { clear_state } = require("../util/state_functions");
        clear_state(waffleData);

        message.channel.send(`
        @here Hei allesammen! Vaffelstekingen er nå satt igang!
        \n  $vaffel : Bestill en vaffel.
        \n  $info : Info om vaffelserveringen.
        \n  $hjelp : oversikt over gyldige kommandoer.
        `);
    },
};
