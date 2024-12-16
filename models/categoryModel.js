const { DataTypes } = require("sequelize");

module.exports = (sequelize)=>{
    return sequelize.define("categories",{
        category_id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },
        description : {
            type : DataTypes.STRING,
            allowNull : true,
        }
    });
}