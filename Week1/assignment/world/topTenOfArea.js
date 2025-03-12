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
     SELECT Name, SurfaceArea 
      FROM country
      ORDER BY SurfaceArea DESC LIMIT 10 OFFSET 10
    `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    results.forEach((row) => {
      console.log(row.Name, row.SurfaceArea);
    });

    connection.end();
  });
});
