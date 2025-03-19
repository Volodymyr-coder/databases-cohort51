import mysql2 from 'mysql2/promise';
async function createTablePapers() {
  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
  });

  try {
    await connection.query(`USE authors_db`);

    const research_Papers = `CREATE TABLE IF NOT EXISTS research_Papers (
    paper_id INT AUTO_INCREMENT PRIMARY KEY,
    paper_title VARCHAR(200) NOT NULL,
    conference VARCHAR(200) NOT NULL,
    publish_date DATE   
)`;

    await connection.query(research_Papers);

    const author_Papers = `CREATE TABLE IF NOT EXISTS author_Papers (
      author_id INT,
      paper_id INT,
      PRIMARY KEY (author_id, paper_id),
      FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE,
      FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id) ON DELETE CASCADE
  )`;

    await connection.query(author_Papers);

    const insertInfo = `INSERT INTO research_papers (paper_title, conference, publish_date) VALUES
('Learning for Healthcare', 'NeurIPS', '2018-12-10'),
('Quantum Computing ', 'ICML', '2020-07-15'),
('Language Processing Trends', 'ACL', '2021-06-20'),
('Self-driving Cars: Challenges', 'IEEE Blockchain', '2021-09-12'),
('AI Ethics and Bias', 'CVPR', '2022-05-18'),
('Cybersecurity in IoT', 'BlackHat', '2023-08-01'),
('Robotics and AI Integration', 'ICRA', '2020-04-22'),
('5G Networks and Applications', 'MobiCom', '2019-11-05'),
('Virtual Reality for Education', 'EDM', '2022-07-08'),
('Blockchain in Finance ', 'ICRA', '2023-06-30'),
('CRISPR and Genetic Editing', 'BioTech', '2021-03-15'),
('Renewable Energy Optimization', 'IEEE Power & Energy', '2020-10-12'),
('Augmented Reality in Medicine', 'VRST', '2022-11-22'),
('Neuroscience and AI', 'NeuroAI', '2019-09-30'),
('Mathematical Models in Economics', 'AAAI', '2021-12-17'),
('Climate Change Predictions', 'Nature Science', '2023-02-05'),
('Big Data Analytics', 'KDD', '2022-08-11'),
('Human-Computer Interaction', 'CHI', '2021-04-27'),
('Autonomous Drones', 'ICRA', '2020-09-09'),
('Space Exploration with AI', 'NASA Conference', '2023-01-19'),
('Social Media Analytics', 'WWW', '2022-05-30'),
('AI in Art and Creativity', 'ICCV', '2020-11-14'),
('Smart Cities and IoT', 'IEEE IoT', '2019-07-21'),
('Genomic Data Science', 'Bioinformatics', '2022-06-10'),
('Edge Computing Innovations', 'IEEE Cloud', '2021-08-25'),
('AI and Game Development', 'GDC', '2020-03-09'),
('Medical Image Processing', 'MICCAI', '2023-10-05'),
('AI-powered Chatbots', 'EMNLP', '2022-12-15'),
('Ethical Hacking', 'DefCon', '2021-07-19'),
('Future of Quantum AI', 'QIP', '2023-09-28')
`;

    await connection.query(insertInfo);

    const relationInfo = `INSERT INTO author_papers (author_id, paper_id) VALUES
(1, 1), (1, 2), (2, 3), (3,3), (1, 4), (5, 5),
(6, 6), (7, 7), (6, 8), (2, 9), (9, 10),
(11, 11), (12, 12), (13, 13), (10, 14), (15, 12)
`;
    await connection.query(relationInfo);

    console.log('data base and tables create');
  } catch (error) {
    console.error('Error: ', error.message);
  } finally {
    await connection.end();
  }
}

createTablePapers();
