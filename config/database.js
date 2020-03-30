const userdb = process.env.USERDB || 'root';
const passdb = process.env.PASSDB || 'root';
const hostdb = process.env.HOSTDB || '127.0.0.1';
const database = process.env.DATABASE || 'gym';

module.exports = {
  username: userdb,
  password: passdb,
  database: database,
  host: hostdb,
  dialect: "mysql",
  define: {
    timestamps: true,
    underscored: true,
  },
};