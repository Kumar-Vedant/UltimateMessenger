require("dotenv").config();

const path = require("node:path");
const express = require("express");
const app = express();
const usersRouter = require("./routes/usersRouter");
const authRouter = require("./routes/authRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/users", usersRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
