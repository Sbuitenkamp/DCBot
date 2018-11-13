module.exports = {
    name: 'dbinit',
    execute(Sequelize) {
        const sequelize = new Sequelize('database', 'user', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            operatorsAliases: false,
            // SQLite only
            storage: 'database.sqlite',
        });
        const warnings = sequelize.define('warnings', {
            id: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
                primaryKey: true
            },
            warned: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            }
        });
        const roles = sequelize.define('roles', {
            id: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
                primaryKey: true
            },
            roles: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });
        const muted = sequelize.define('muted', {
            id: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
                primaryKey: true
            },
            muted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            muteTime: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        });
// ww2 minigame tables
        const warMembers = sequelize.define('warmembers', {
            // member.id
            id: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
                primaryKey: true
            },
            faction: {
                type: Sequelize.INTEGER,
            },
            hp: {
                type: Sequelize.INTEGER,
                defaultValue: 100,
                min: 0,
                max: 100
            },
            exp: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            level: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            loadout: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            }
        });
// factions and their stats
        const warStats = sequelize.define('warstats', {
            id: {
                type: Sequelize.INTEGER,
                unique: true,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            faction: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            members: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            wonbattles: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            }
        });
// loadouts
        const arsenal = sequelize.define('arsenal', {
            id: {
                type: Sequelize.INTEGER,
                unique: true,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            team: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            levelreq: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            armour: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                min: 0,
                max: 100
            },
            primary: {
                type: Sequelize.STRING,
                allowNull: false
            },
            secondary: {
                type: Sequelize.STRING,
                allowNull: false
            },
            primarydamage: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
                min: 0,
                max: 50
            },
            secondarydamage: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
                min: 0,
                max: 40
            },
            primaryammo: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
                min: 0,
                max: 50
            },
            secondaryammo: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
                min: 0,
                max: 40
            },
            classtype: {
                type: Sequelize.STRING,
                defaultValue: 'starter'
            }
        });
// kill streaks
        const bigGuns = sequelize.define('bigguns', {
            id: {
                type: Sequelize.INTEGER,
                unique: true,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            damage: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        });
        return {
            warnings: warnings,
            roles: roles,
            muted: muted,
            warTables: {
                warMembers: warMembers,
                warStats: warStats,
                arsenal: arsenal,
                bigGuns: bigGuns
            }
        };
    }

};