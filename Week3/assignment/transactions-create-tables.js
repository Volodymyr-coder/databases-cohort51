import mysql2 from 'mysql2/promise';
async function createAccountDb() {
  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
  });
  const accountMoney_db = `
  CREATE DATABASE IF NOT EXISTS accountMoney_db;
`;
  try {
    const account = `CREATE TABLE IF NOT EXISTS account(account_number INT AUTO_INCREMENT PRIMARY KEY,
        balance INT NOT NULL DEFAULT 0) `;

    const account_changes = `CREATE TABLE IF NOT EXISTS account_changes(
    change_number INT AUTO_INCREMENT PRIMARY KEY,
      account_number INT NOT NULL,
      amount INT NOT NULL,
      changed_date DATE,
      remark VARCHAR(255),
      FOREIGN KEY (account_number) REFERENCES account(account_number) ON DELETE CASCADE)`;

    await connection.query(accountMoney_db);
    await connection.query(`USE accountMoney_db`);
    await connection.query(account);
    await connection.query(account_changes);
    console.log('database created');
  } catch (error) {
    console.error('Error: ', error.message);
  } finally {
    await connection.end();
  }
}
createAccountDb();
