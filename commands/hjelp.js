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
                reply += `
                Som orakel har du tilgang til ekstra kommandoer:
                ${prefix}vaffelstart: Begynner et vaffelsalg.
                ${prefix}vaffelstop: Avslutter et vaffelsalg.
                ${prefix}stekt x: Registrerer x stekte vaffler.
                \n I tillegg til de vanlige kommandoene:
                `;
            } else {
                reply += `Som vanlig bruker har du tilgang på disse komandoene:`;
            }
        }
        if (reply === "") {
            //command is used in dm
            reply += `Som vanlig bruker har du tilgang på disse komandoene:`;
        }
        reply += `
            ${prefix}vaffel: Bestill en vaffel.
            ${prefix}info: Info om vaffel-torsdag.
            ${prefix}kø: Antall personer i køen.
            ${prefix}salg: Antall vaffler utgitt iløpet av det gjeldende salget.
            `;

        message.author.send(reply);
    },
};
