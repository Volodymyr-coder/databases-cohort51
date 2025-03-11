import connection from './connection.js';

connection.connect((err) => {
  if (err) {
    return;
  }
  console.log(
    'you connect to world database with threadId:',
    connection.threadId
  );

  const query = `
      SELECT Population
      FROM city
      WHERE Name = 'Rotterdam';
    `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    results.forEach((row) => {
      console.log(row.Population);
    });

    connection.end();
  });
});
