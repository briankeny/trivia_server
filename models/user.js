const db = require("../config/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { reject } = require("bcrypt/promises");

const User = {};

User.createUser = (name, username, password, email) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (error, hash) => {
      if (error) {
        reject(error);
      } else {
        const query = `INSERT INTO users (name, username, password,email) VALUES (?, ?,?,?)`;
        db.query(query, [name, username, hash, email], (error, results) => {
          if (error) {
            reject(error);
          } else {
            const user = { id: results.insertId, username };
            resolve(user);
          }
        });
      }
    });
  });
};
User.findByCredentials = (username, password) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE username = ?`;
    db.query(query, [username], (error, results) => {
      if (error) {
        reject(error);
      } else if (results.length === 0) {
        reject(new Error("Invalid login credentials"));
      } else {
        const thisUser = results[0];
        bcrypt.compare(password, thisUser.password, (error, isMatch) => {
          if (error) {
            reject(error);
          } else if (!isMatch) {
            reject(new Error("Invalid login credentials"));
          } else {
            resolve(thisUser);
          }
        });
      }
    });
  });
};

User.getUsers = () => {
  const query = `SELECT * FROM users`;
  db.query(query, (error, results) => {
    if (error) {
      reject(error);
    } else {
      return results;
    }
  });
};

// User.deleteUser = (existingUser, result) => {
//   db.query("DELETE * FROM Customers WHERE id ?", existingUser, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//     } else {
//       console.log("created user: ", { id: res.deleteId, ...newUser });
//       result(null, { id: res.deleteId, ...newUser });
//     }
//   });
// };

User.findById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE id =  ${id}`;
    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};

User.findProfilePic = (id) => {
  return new Promise(() => {
    const query = `SELECT profile_picture FROM users WHERE id = ${id}`;
    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

User.generateAuthToken = (id) => {
  const token = jwt.sign({ id: id }, "mysecretkey");
  return token;
};

module.exports = User;
