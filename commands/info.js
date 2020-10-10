module.exports = {
    name: "info",
    description: "command for getting info about the waffle sale",
    execute(message, args) {
        message.author.send(`
        Info:
        Vaffel-Torsdager har nå startet opp igjen, men det er viktig at vi passer på smittevern.
        Oraklene kommer til å steke vafler på kjøkkenet som normalt, men vi kan ikke ha hele lesesalen stående
        i kø på kjøkkenet. Derfor har vi lappet sammen denne vaffelboten som alternativ til kø.
        
        Når du bruker !vaffel kommandoen blir du satt i en kø og når oraklene steker vaffler vil de første i køen få
        en melding om at de kan komme og hente vaffelen sin. Når du henter vaffelen din viser du først meldingen fra vaffelbot
        til oraklene, så får du en vaffel utlevert.

        Takk for at du bidrar til å holde lesesalen smittefri :)
        `);
    },
};
