const { DataTypes } = require("sequelize");

module.exports = (sequelize)=>{
    return sequelize.define("posts",{
        post_id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        category_id : {
            type : DataTypes.INTEGER
        },
        author_id : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        title : {
            type : DataTypes.STRING,
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