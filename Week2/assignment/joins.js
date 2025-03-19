import mysql2 from 'mysql2/promise';
async function createQuery() {
  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
  });

  try {
    await connection.query(`USE authors_db`);
    const selectAuthorsAndMentors = `
   SELECT authors.author_name AS author, 
       mentor.author_name AS mentor
FROM authors 
LEFT JOIN authors mentor ON authors.mentor = mentor.author_id;`;
    const [results] = await connection.query(selectAuthorsAndMentors);

    console.log('Authors and their mentors:', results);
  } catch (error) {
    console.error('Error: ', error.message);
  } finally {
    await connection.end();
  }
}

createQuery();
