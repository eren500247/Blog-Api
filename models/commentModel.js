const { DataTypes } = require("sequelize");

module.exports = (sequelize)=>{
    return sequelize.define("comments",{
        comment_id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        post_id : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        content : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        date : {
            type : DataTypes.DATE,
            defaultValue : DataTypes.NOW
        }
    });
}