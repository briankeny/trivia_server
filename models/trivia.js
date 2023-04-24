const db = require("../config/database");
const Trivia = {};
Trivia.createRandomTrivia = () => {
  return new Promise((resolve, reject) => {
    const statement = `SELECT * FROM questions ORDER BY RAND()  LIMIT 10;`;
    db.query(statement, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = Trivia;
