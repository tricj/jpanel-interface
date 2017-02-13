var Sequelize   = require('sequelize');

var orm = new Sequelize('jp_interface', 'jp_user', 'Sterl1nG', {
    host: 'localhost',
    dialect: 'mariadb',
    pool: {
        max: 5,
        min: 0,
        idle: 1000
    }
});
var User = orm.define('user', {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
});
var Sessions = orm.define('sessions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    sid: { type: Sequelize.STRING },
    data: { type: Sequelize.TEXT },
    createdAt: { type: Sequelize.DATE },
    updatedAt: { type: Sequelize.DATE }

});

User.sync();
Sessions.sync();

module.exports = {
    orm: orm,
    User: User,
    Sessions: Sessions
};