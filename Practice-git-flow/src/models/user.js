const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        user_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        password: {
            type: Sequelize.STRING(20),
            unique: true,
        },
        nickname: {
            type: Sequelize.STRING(10),
            unique: true,
        },
        email: {
            type: Sequelize.STRING(45),
            unique: true,
        }
      }, {
        sequelize,
        underscored: false,
        modelName: 'User',
        tableName: 'user',
        timestamps: false,
        paranoid: false, 
        charset: 'utf8',
        collate: 'utf8_general_ci',
      });
    }
}