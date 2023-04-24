const config = {
  development: {
    port: 3302,
    database: {
      host: "localhost",
      user: "root",
      password: "",
      database: "trivia",
    },
  },
  production: {
     port: process.env.PORT,
    database: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  },
};

module.exports = config;
