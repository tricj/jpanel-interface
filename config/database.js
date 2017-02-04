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

module.exports = orm;