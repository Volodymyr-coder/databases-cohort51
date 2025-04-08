const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URL, {
  serverApi: ServerApiVersion.v1
});

async function transferMoney(
  fromAccountNumber,
  toAccountNumber,
  amount,
  remark
) {
  const session = client.startSession();

  try {
    await client.connect();
    console.log('Connected to the database');
    const db = client.db('BankDB');
    const accountsCollection = db.collection('accounts');

    session.startTransaction();

    const fromAccount = await accountsCollection.findOne({
      account_number: fromAccountNumber
    });
    const toAccount = await accountsCollection.findOne({
      account_number: toAccountNumber
    });

    if (!fromAccount || !toAccount) {
      throw new Error('One or both accounts not found');
    }

    const fromChangeNumber = fromAccount.account_changes.length + 1;
    const toChangeNumber = toAccount.account_changes.length + 1;

    const fromUpdate = {
      $inc: { balance: -amount },
      $push: {
        account_changes: {
          change_number: fromChangeNumber,
          amount: -amount,
          changed_date: new Date(),
          remark: remark
        }
      }
    };

    const toUpdate = {
      $inc: { balance: amount },
      $push: {
        account_changes: {
          change_number: toChangeNumber,
          amount: amount,
          changed_date: new Date(),
          remark: remark
        }
      }
    };

    await accountsCollection.updateOne(
      { account_number: fromAccountNumber },
      fromUpdate,
      { session }
    );
    await accountsCollection.updateOne(
      { account_number: toAccountNumber },
      toUpdate,
      { session }
    );

    await session.commitTransaction();
    console.log('Transaction committed');
  } catch (error) {
    await session.abortTransaction();
    console.error('Transaction aborted:', error.message);
  } finally {
    session.endSession();
    await client.close();
  }
}

module.exports = transferMoney;
