const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URL, {
  serverApi: ServerApiVersion.v1
});

async function setupDB() {
  try {
    await client.connect();
    console.log('Connected to the database');
    const db = client.db('BankDB');
    const accountsCollection = db.collection('accounts');

    await accountsCollection.deleteMany({});
    console.log('Collection cleared');

    const accounts = [
      {
        account_number: 101,
        balance: 5000,
        account_changes: [
          {
            change_number: 1,
            amount: 1000,
            changed_date: new Date(),
            remark: 'Initial deposit'
          },
          {
            change_number: 2,
            amount: -500,
            changed_date: new Date(),
            remark: 'Withdrawal'
          }
        ]
      },
      {
        account_number: 102,
        balance: 3000,
        account_changes: [
          {
            change_number: 1,
            amount: 2000,
            changed_date: new Date(),
            remark: 'Initial deposit'
          },
          {
            change_number: 2,
            amount: -1000,
            changed_date: new Date(),
            remark: 'Withdrawal'
          }
        ]
      }
    ];

    await accountsCollection.insertMany(accounts);
    console.log('Sample data inserted');
  } catch (error) {
    console.error('Error setting up accounts:', error.message);
  } finally {
    await client.close();
  }
}

setupDB();

module.exports = setupDB;
