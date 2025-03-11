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
      SELECT Name
      FROM country
      ORDER BY SurfaceArea DESC;
    `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    results.forEach((row) => {
      console.log(row.Name);
    });

    connection.end();
  });
});
