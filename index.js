const express = require("express");

const { sequelize } = require("./models");
require("dotenv").config();

const authorRoute = require("./routes/authorRoute");
const categoryRoute = require("./routes/categoryRoute");
const postRoute = require("./routes/postRouter");
const commentRoute = require("./routes/commentRoute");
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.use("/authors", authorRoute);
app.use("/categories", categoryRoute);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);
// console.log(process.env.PORT)
// console.log(process.env.HOST)
sequelize.sync({ force: true }).then(() => {
  console.log("DB synced");
  app.listen(port, () => console.log(`Server is running on port ${port}`));
});
