require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DATABASE_HOSTNAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
