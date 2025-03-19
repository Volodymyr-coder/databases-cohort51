import mysql2 from 'mysql2/promise';
async function createAuthorsDB() {
  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
  });

  try {
    await connection.query(`DROP DATABASE IF EXISTS authors_db;`);

    const authors_db = `
    CREATE DATABASE IF NOT EXISTS authors_db;
  `;

    const authors = `CREATE TABLE IF NOT EXISTS authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(200) NOT NULL,
    university VARCHAR(200) NOT NULL,
    date_of_birth DATE,
    h_index INT, 
    gender ENUM('Male', 'Female', 'Other')
)`;

    await connection.query(authors_db);
    await connection.query(`USE authors_db`);
    await connection.query(authors);

    const addColumnMentor = `ALTER TABLE authors ADD mentor INT NULL`;
    await connection.query(addColumnMentor);

    const addForeignKey = `ALTER TABLE authors ADD CONSTRAINT FK_Mentor FOREIGN KEY(mentor) REFERENCES authors(author_id)`;
    await connection.query(addForeignKey);

    const insertAuthorsInfo = `INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) VALUES
    ('Alik Fenson', 'Politeh', '1979-03-12', 46, 'Female', NULL),
    ('Bil Soms', 'Politeh University', '1974-07-24', 51, 'Male', NULL),
    ('Eric Brown', 'NTY University', '1985-09-10', 40, 'Male', 1),
    ('Diana Prince', 'Oxford', '1990-12-05', 35, 'Female', 2),
    ('Edward Norton', 'Oiscamp Univ', '1976-08-22', 62, 'Male', NULL),
    ('Serkan Orman', 'Tilburg Zuid', '1982-04-17', 55, 'Female', 5),
    ('Dmitriy Krivula', 'Karazin Univer', '1970-05-14', 65, 'Male', NULL),
    ('Hanna Baker', 'Amsterdam University', '1980-07-03', 45, 'Female', 3),
    ('Ian Curtis', 'Breda University', '1991-02-15', 34, 'Male', 4),
    ('Julia Nazarenko', 'NTY University', '1967-11-20', 58, 'Female', NULL),
    ('Sergiy Tushen', 'Lucca Univ', '1983-10-30', 42, 'Male', 6),
    ('Natalia Chala', 'UC Piza', '1990-09-09', 35, 'Female', 7),
    ('Michael Scott', 'LUCCA', '1965-05-05', 60, 'Male', NULL),
    ('Antony Chern', 'NTY University', '1989-12-11', 33, 'Female', 8),
    ('Luuk Kopal', 'Breda University', '1995-08-31', 30, 'Male', 9)`;

    await connection.query(insertAuthorsInfo);

    console.log('data base and tables create');
  } catch (error) {
    console.error('Error: ', error.message);
  } finally {
    await connection.end();
  }
}

createAuthorsDB();
