module.exports = {
    name: "info",
    description: "command for getting info about the waffle sale",
    execute(message, args) {
        message.author.send(`
        Info:
    \nVaffel-Torsdager har nå startet opp igjen, men det er viktig at vi passer på smittevern. Oraklene kommer til å steke vafler på kjøkkenet som normalt, men vi kan ikke ha hele lesesalen stående i kø på kjøkkenet. Derfor har vi lappet sammen denne vaffelboten som alternativ til kø.
    \nNår du bruker $vaffel kommandoen blir du satt i en kø og når oraklene steker vaffler vil de første i køen få en melding om at de kan komme og hente vaffelen sin.
    \nTakk for at du bidrar til å holde lesesalen smittefri :slight_smile:
    `);
    },
};
