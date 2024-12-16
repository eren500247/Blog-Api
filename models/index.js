const { Sequelize } = require("sequelize")

const config = require("../config")
console.log(config.db.password)

const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {
        host : config.db.host,
        dialect : "mysql"
    }
);

const models = {
    Category : require("./categoryModel")(sequelize),
    Author : require("./authorModel")(sequelize),
    Post : require("./postModel")(sequelize),
    Comment : require("./commentModel")(sequelize),
}

//Author - Post : One-to-Many

models.Author.hasMany(models.Post,{
    foreignKey : "author_id",
    onDelete : "CASCADE",
    onUpdate : "CASCADE"
})

models.Post.belongsTo(models.Author,{
    foreignKey : "author_id",
    onDelete : "CASCADE",
    onUpdate : "CASCADE"
})



//Author - Post : One-to-Many

models.Category.hasMany(models.Post,{
    foreignKey : "category_id",
    onDelete : "SET NULL",
    onUpdate : "CASCADE"
})

models.Post.belongsTo(models.Category,{
    foreignKey : "category_id",
    onDelete : "SET NULL",
    onUpdate : "CASCADE"
})

//Post - Comment : One-to-Many

models.Post.hasMany(models.Comment,{
    foreignKey : "post_id",
    onDelete : "CASCADE",
    onUpdate : "CASCADE"
})

models.Comment.belongsTo(models.Post,{
    foreignKey : "post_id",
    onDelete : "CASCADE",
    onUpdate : "CASCADE"
})


models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;