// require("dotenv").config();

const path = require("node:path");
const express = require("express");
const app = express();

const usersRouter = require("./routes/usersRouter");
const authRouter = require("./routes/authRouter");
const conversationsRouter = require("./routes/conversationsRouter");
const messagesRouter = require("./routes/messagesRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/conversations", conversationsRouter);
app.use("/messages", messagesRouter);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));

module.exports = app;
