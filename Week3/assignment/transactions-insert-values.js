import mysql2 from 'mysql2/promise';

async function insertData() {
  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'accountMoney_db'
  });

  try {
    const accounts = [
      [101, 5000.0],
      [102, 3000.0]
    ];

    const insertAccount = `INSERT INTO account (account_number, balance) VALUES ?`;

    await connection.query(insertAccount, [accounts]);

    console.log('Sample data inserted.');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await connection.end();
  }
}

insertData();
