var Sequelize   = require('sequelize');

function logDatabaseAction(query){
    console.log("> " + query);
}

var orm = new Sequelize('jp_interface', 'jp_user', 'Sterl1nG', {
    host: 'localhost',
    dialect: 'mariadb',
    pool: {
        max: 5,
        min: 0,
        idle: 1000
    }
    //,logging: logDatabaseAction
});

var Users = orm.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: { type:   Sequelize.STRING },
    password: { type:   Sequelize.STRING },
    createdAt: { type:  Sequelize.DATE },
    updatedAt: { type:  Sequelize.DATE }
});

var Sessions = orm.define('sessions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    sid: { type:        Sequelize.STRING },
    data: { type:       Sequelize.TEXT },
    createdAt: { type:  Sequelize.DATE },
    updatedAt: { type:  Sequelize.DATE }
});

var Clusters = orm.define('clusters', {
    id: {
       type:            Sequelize.INTEGER,
       autoIncrement:   true,
       primaryKey:      true
    },
    name: {         type: Sequelize.STRING },
    description: {  type: Sequelize.TEXT },
    createdAt: {    type: Sequelize.DATE },
    updatedAt: {    type: Sequelize.DATE }
});

var Log = orm.define('log', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    line: { type: Sequelize.TEXT },
    createdAt: { type: Sequelize.DATE },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: "id"
        }
    }
});

var Nodes = orm.define('nodes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: { type: Sequelize.STRING },
    hostname: {type: Sequelize.STRING },
    privateKey: {type: Sequelize.TEXT },
    createdAt: { type: Sequelize.DATE },
    updatedAt: { type: Sequelize.DATE },
    clusterId: {
        type: Sequelize.INTEGER,
        references: {
            model: Clusters,
            key: "id"
        }
    }
});

Users.sync();
Sessions.sync();
Log.sync();
Clusters.sync();
Nodes.sync();

module.exports = {
    orm: orm,
    Users: Users,
    Sessions: Sessions,
    Log: Log
};