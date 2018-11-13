module.exports = {
    name: 'warsetup',
    description: 'Setup the basics of the war minigamemode',
    syntax: 'warsetup',
    init(token) {
        this.syntax = token + this.syntax;
    },
    async execute(warMembers, warStats, arsenal, bigGuns) {
        const spetsnaz = await warStats.findOne({where: {faction: 'Spetsnaz'}});
        const ss = await warStats.findOne({where: {faction: 'SS'}});
        if (!spetsnaz) {
            const makeSpetsnaz = await warStats.create({
                faction: 'Spetsnaz'
            });
            if (makeSpetsnaz === undefined) return console.log('error making spetsnaz');
            console.log('Spetsnaz made');
        }
        if (!ss) {
            const makeSs = await warStats.create({
                faction: 'Die SS'
            });
            if (makeSs === undefined) return console.log('error making ss');
            console.log('SS made');
        }
        const makeArsenal = await arsenal.bulkCreate([
            {
                team: 1,
                levelreq: 0,
                armour: 20,
                primary: 'Mosin–Nagant M1938 Carbine',
                secondary: 'Tokarev TT-33',
                primarydamage: 25,
                secondarydamage: 17,
                primaryammo: 5,
                secondaryammo: 8,
                type: 'starter'
            },
            {
                team: 2,
                levelreq: 0,
                armour: 20,
                primary: 'Karabiner 98k',
                secondary: 'Luger P08 pistol',
                primarydamage: 25,
                secondarydamage: 14,
                primaryammo: 5,
                secondaryammo: 9,
                type: 'starter'
            }
        ]);
        if (makeArsenal === undefined) return console.log('error making arsenal');
    }
};