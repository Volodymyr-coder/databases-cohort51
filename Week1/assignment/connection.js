import mysql from 'mysql2';
export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'meetup'
});

export default connection;
