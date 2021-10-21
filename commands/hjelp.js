module.exports = {
    name: "hjelp",
    description: "overview over valid commands",
    execute(message, args, botState) {
        let reply = "";
        const { adminRole, prefix } = botState
        if (message.guild != null) {
            //command is used in chatroom
            if (
                message.member.roles.cache.some(
                    (r) => r.name == adminRole
                )
            ) {
                reply += `Som orakel har du tilgang til ekstra kommandoer: \n`
                + `> ${prefix}vaffelstart: Begynner et vaffelsalg. \n`
                + `> ${prefix}vaffelstop: Avslutter et vaffelsalg. \n` 
                + `> ${prefix}stekt x: Registrerer x stekte vaffler. \n\n`
                + `I tillegg til de vanlige kommandoene: \n`  
            } else {
                reply += `Som vanlig bruker har du tilgang på disse komandoene: \n`;
            }
        }
        if (reply === "") {
            //command is used in dm
            reply += `Som vanlig bruker har du tilgang på disse komandoene: \n`;
        }
        reply += `> ${prefix}vaffel: Bestill en vaffel. \n`
            + `> ${prefix}info: Info om vaffel-torsdag. \n`
            + `> ${prefix}kø: Antall personer forran deg i køen. \n`
            + `> ${prefix}totalkø: Antall personer i køen. \n`
            + `> ${prefix}salg: Antall vaffler utgitt iløpet av det gjeldende salget. \n`

        message.author.send(reply);
    },
};
