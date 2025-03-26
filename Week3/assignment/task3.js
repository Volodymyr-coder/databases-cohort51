function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      cb(null, result[0].name);
    }
  );
}
const select = `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`;
`if somebody use name = "' OR '1'='1";
code = "' OR '1'='1";
he can take some data from DB
SELECT Population FROM countries WHERE Name = '' OR '1'='1' AND code = '' OR '1'='1';
`;

function getPopulation(Country, name, code, cb) {
  const query = `SELECT Population FROM ?? WHERE Name = ? AND code = ?`;

  conn.query(query, [Country, name, code], function (err, result) {
    if (err) return cb(err);
    if (result.length === 0) return cb(new Error('Not found'));
    cb(null, result[0].Population);
  });
}
