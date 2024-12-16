require("dotenv").config();
console.log(process.env.HOST)
console.log(process.env.PASSWORD)
module.exports = {
    db : {
        host : process.env.HOST,
        database : process.env.DB,
        username : process.env.USERNAME,
        password : process.env.PASSWORD
    }   
}