import mysql2 from 'mysql2/promise';
async function createAggregateFunc() {
  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
  });

  try {
    await connection.query(`USE authors_db`);

    // All research papers and the number of authors that wrote that paper.
    const sumPaperAuthors = ` SELECT research.paper_id, research.paper_title,
         COUNT(author.author_id) AS sum
  FROM research_papers research
  JOIN author_papers author ON research.paper_id = author.paper_id
  GROUP BY research.paper_id, research.paper_title
  ORDER BY research.paper_id;
 `;
    const [results] = await connection.query(sumPaperAuthors);
    for (const result of results) {
      console.log(result);
    }

    // Sum of the research papers published by all female authors
    const countWomenPapers = `SELECT COUNT(*) FROM authors WHERE gender = 'female'`;
    const [results2] = await connection.query(countWomenPapers);
    const obj2 = results2[0];
    const result = obj2['COUNT(*)'];
    console.log('result count func:', result);

    // Average of the h-index of all authors per university.
    const avgAuthorsInd = `SELECT AVG(h_index) FROM authors`;
    const [results3] = await connection.query(avgAuthorsInd);
    const obj3 = results3[0];
    const avg = obj3['AVG(h_index)'];
    console.log('result avg funk:', avg);

    // Sum of the research papers of the authors per university.
    const sumUniv = `SELECT
    author.university,
    COUNT(paper.paper_id) AS paper_count
FROM
    authors author
JOIN
    author_papers authorpaper ON author.author_id = authorpaper.author_id
JOIN
    research_papers paper ON authorpaper.paper_id = paper.paper_id
GROUP BY
    author.university
ORDER BY
    paper_count DESC; `;

    const [results4] = await connection.query(sumUniv);
    for (const result of results4) {
      console.log(
        'result of search university:',
        result.university,
        'and paper:',
        result.paper_count
      );
    }
    // Minimum and maximum of the h-index of all authors per university.
    const selectValue = `SELECT 
        MIN(h_index) AS min_h_index, 
    MAX(h_index) AS max_h_index
FROM authors
`;
    const [value] = await connection.query(selectValue);
    const obj5 = value[0];
    const minResult = obj5.min_h_index;
    const maxResult = obj5.max_h_index;

    console.log('value min index: ', minResult);
    console.log('value max index: ', maxResult);
  } catch (error) {
    console.error('Error: ', error.message);
  } finally {
    await connection.end();
  }
}

createAggregateFunc();
