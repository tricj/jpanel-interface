var Sequelize = require('sequelize');

function logDatabaseAction(query){
    //console.log("> " + query);
}

var orm = new Sequelize('jp_interface', 'jp_user', 'Sterl1nG', {
    host: 'localhost',
    dialect: 'mariadb',
    pool: {
        max: 5,
        min: 0,
        idle: 1000
    }
    ,logging: logDatabaseAction
});
module.exports = {
    orm: orm,
    Users : orm.define('users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {type: Sequelize.STRING},
        createdAt: {type: Sequelize.DATE},
        updatedAt: {type: Sequelize.DATE}
    }),
    Sessions : orm.define('sessions', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        sid: {type: Sequelize.STRING},
        data: {type: Sequelize.TEXT},
        createdAt: {type: Sequelize.DATE},
        updatedAt: {type: Sequelize.DATE}
    }),
    Clusters : orm.define('clusters', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        masterNode: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        description: {type: Sequelize.TEXT},
        createdAt: {type: Sequelize.DATE},
        updatedAt: {type: Sequelize.DATE}
    }),
    Logs : orm.define('logs', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        entry: {type: Sequelize.TEXT},
        createdAt: {type: Sequelize.DATE},
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: "users",
                key: "id"
            }
        }
    }),
    Nodes : orm.define('nodes', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        hostname: {
            type: Sequelize.STRING,
            unique: true
        },
        clusterId: {
            type: Sequelize.INTEGER
        },
        username: {
            type: Sequelize.STRING
        },
        privateKey: {
            type: Sequelize.TEXT
        },
        isMaster: {
            type: Sequelize.BOOLEAN,
            default: false
        },
        createdAt: {type: Sequelize.DATE},
        updatedAt: {type: Sequelize.DATE}
    })
};