// Command for filling waffle orders
module.exports = {
    name: "stekt",
    description:
        "Command for signaling that there are waffles ready, sends dm to the people first in line",
    execute(message, args) {
        if (args.length() < 1 || args === undefined) {
            return;
        }
        const num_waffles = args[0];
        if (!isInteger(num_waffles) || num_waffles > 6) {
            return;
        }
        message.channel.send(
            `Våre fantastiske orakler har stekt ${args[0]} nye vaffler!`
        );
    },
};
