const bcrypt = require("bcryptjs");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// GET /users — list all users
exports.usersListGet = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    // res.render("users/list", { users });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
};

// GET /users/search?username=xyz — search users by username
exports.usersSearch = async (req, res) => {
  const { username } = req.query;
  try {
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: username,
          mode: "insensitive",
        },
      },
    });
    // res.render("users/list", { users });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Search failed");
  }
};

// GET /users/create — show user creation form
exports.usersCreateGet = (req, res) => {
  res.render("users/create");
};

// POST /users/create — create new user
exports.usersCreatePost = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        passwordHash: hashedPassword,
      },
    });
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create user");
  }
};

// GET /users/:id/update — show update form
exports.usersUpdateGet = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).send("User not found");
    // res.render("users/update", { user });
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching user");
  }
};

// POST /users/:id/update — update user
exports.usersUpdatePost = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id },
      data: {
        username,
        passwordHash: hashedPassword,
      },
    });
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Update failed");
  }
};

// POST /users/:id/delete — delete user
exports.usersDeletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id } });
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Delete failed");
  }
};
