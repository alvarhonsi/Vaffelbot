module.exports = {
    name: "salg",
    description: "get current sales",
    execute(message, args, waffelData) {
        message.channel.send(`
        Vaffler utdelt idag: ${waffelData["totalSales"]}
        `);
    },
};
