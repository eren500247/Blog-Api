const { DataTypes } = require("sequelize");

module.exports = (sequelize)=>{
    return sequelize.define("authors",{
        author_id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },
        address : {
            type : DataTypes.STRING,
            allowNull : true
        }
    });
}