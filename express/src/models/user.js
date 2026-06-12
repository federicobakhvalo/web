// const users = [];

// module.exports = class User {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   static getAll() {
//     return users;
//   }
//   save() {
//     users.push(this);
//   }
//   //   delete() {
//   //     const index = users.indexOf(this);
//   //     if (index !== -1) {
//   //       users.splice(index, 1);
//   //     }
//   //   }
//   //   update(name, age) {
//   //     this.name = name;
//   //     this.age = age;
//   //   }
// };

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
