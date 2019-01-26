const Sequelize = require('sequelize').Sequelize;
const url_db = "postgresql://onlineuser:online@127.0.0.1:5432/onlineboard_db";
const User = new Sequelize("myDB","onlineuser","online",{
    // omitNull:true,
    dialect:"postgres",
    operatorsAliases:false
}).define('user_entity',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
        unique: true,
    },
    login:{
       type:Sequelize.STRING,
        allowNull: false,
    },
    password:{
        type:Sequelize.STRING,
        allowNull: false,
    },

},{
    timestamps: false,
    tableName:"user_entity",
    freezeTableName: true,
});

module.exports.User = User;