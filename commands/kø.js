module.exports = {
    name: "kø",
    description: "show current queue",
    execute(message, args, waffleData) {
        message.channel.send(`
        Vi har for øyeblikket ${waffleData[
            "waffleQueue"
        ].size()} personer i køen.
        `);
    },
};
