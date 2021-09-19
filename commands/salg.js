module.exports = {
    name: "salg",
    description: "get current sales",
    execute(message, args, botState) {
        const { saleOngoing, saleData } = botState
        const { totalSales } = saleData
        if (!saleOngoing) {
            message.channel.send("Det er for øyeblikket ikke vaffelsalg");
            return;
        }
        message.channel.send(`
        Vaffler utdelt idag: ${totalSales}
        `);
    },
};
