exports.register = async (req, res) => {
  try {
    res.render("register");
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

exports.login = async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};
