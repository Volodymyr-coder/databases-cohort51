import mysql2 from 'mysql2/promise';

async function transferFunds() {
  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'accountMoney_db'
  });

  try {
    await connection.beginTransaction();

    const sender = 101;
    const receiver = 102;
    const amount = 1000.0;

    const [senderBalanceResult] = await connection.query(
      `SELECT balance FROM account WHERE account_number = ? FOR UPDATE`,
      [sender]
    );

    if (
      senderBalanceResult.length === 0 ||
      senderBalanceResult[0].balance < amount
    ) {
      throw new Error('Insufficient funds.');
    }

    await connection.query(
      `UPDATE account SET balance = balance - ? WHERE account_number = ?`,
      [amount, sender]
    );

    await connection.query(
      `INSERT INTO account_changes (account_number, amount, remark) VALUES (?, ?, ?)`,
      [sender, -amount, 'Transferred to account 102']
    );

    await connection.query(
      `UPDATE account SET balance = balance + ? WHERE account_number = ?`,
      [amount, receiver]
    );

    await connection.query(
      `INSERT INTO account_changes (account_number, amount, remark) VALUES (?, ?, ?)`,
      [receiver, amount, 'Received from account 101']
    );

    await connection.commit();
    console.log(
      `Successfully transferred ${amount} from ${sender} to ${receiver}`
    );
  } catch (error) {
    await connection.rollback();
    console.error('Transaction failed:', error.message);
  } finally {
    await connection.end();
  }
}

transferFunds();
