const setupDB = require('./setup.js');
const transferMoney = require('./transfer.js');

async function main() {
  try {
    await setupDB();
    await transferMoney(101, 102, 1000, 'Transfer from account 101 to 102');
  } catch (error) {
    console.error(error);
  }
}

main();
