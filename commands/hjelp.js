module.exports = {
    name: "hjelp",
    description: "overview over valid commands",
    execute(message, args) {
        let reply = "";
        const pre = process.env.PREFIX;
        if (message.guild != null) {
            //command is used in chatroom
            if (
                message.member.roles.cache.some(
                    (r) => r.name == process.env.ORAKELROLE
                )
            ) {
                reply += `
                Som orakel har du tilgang til ekstra kommandoer:
                ${pre}vaffelstart: Begynner et vaffelsalg.
                ${pre}vaffelstop: Avslutter et vaffelsalg.
                ${pre}stekt x: Registrerer x stekte vaffler.
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
            ${pre}vaffel: Bestill en vaffel.
            ${pre}info: Info om vaffel-torsdag.
            ${pre}kø: Antall personer i køen.
            ${pre}salg: Antall vaffler utgitt iløpet av det gjeldende salget.
            `;

        message.author.send(reply);
    },
};
