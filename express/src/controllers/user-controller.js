const User = require("../models/user");

exports.addUser = function (request, response) {
  response.render("create.hbs");
};
exports.getUsers = async function (request, response) {
  const users = await User.find();

  response.render("users.hbs", {
    users: users,
  });

  //   response.render("users.hbs", {
  //     users: User.getAll(),
  //   });
};
exports.postUser = async function (request, response) {
  if (!request.body.name || !request.body.age) {
    response.status(400).send("Name and age are required");
    return;
  }

  const username = request.body.name;
  const userage = request.body.age;
  const user = new User({
    name: username,
    age: userage,
  });
  await user.save();
  response.redirect("/users");
};
