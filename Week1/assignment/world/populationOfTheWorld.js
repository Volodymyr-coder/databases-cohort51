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
     SELECT SUM(Population) AS total_population
      FROM country
    `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    const totalPopulation = results[0].total_population;
    console.log('Population number of the world:', totalPopulation);

    connection.end();
  });
});
