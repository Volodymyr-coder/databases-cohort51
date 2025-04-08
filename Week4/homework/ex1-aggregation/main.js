const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const csv = require('csv-parser');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URL, {
  serverApi: ServerApiVersion.v1
});

async function insertData(filePath) {
  await client.connect();
  const db = client.db('PopulationDB');
  const populationCollection = db.collection('population');

  await populationCollection.deleteMany({});
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          Country: data.Country,
          Year: parseInt(data.Year),
          Age: data.Age,
          M: parseInt(data.M),
          F: parseInt(data.F)
        });
      })
      .on('end', async () => {
        try {
          await populationCollection.insertMany(results);
          console.log('Data inserted');
          resolve();
        } catch (err) {
          reject(err);
        }
      })
      .on('error', reject);
  });
}

async function getPopulationPerYear(countryName) {
  const db = client.db('PopulationDB');
  const collection = db.collection('population');

  const result = await collection
    .aggregate([
      { $match: { Country: countryName } },
      {
        $group: {
          _id: '$Year',
          countPopulation: { $sum: { $add: ['$M', '$F'] } }
        }
      },
      { $sort: { _id: 1 } }
    ])
    .toArray();

  console.log(result);
}

async function getContinentPopulation(year, age) {
  const db = client.db('PopulationDB');
  const collection = db.collection('population');
  const result = await collection
    .aggregate([
      {
        $match: {
          Year: year,
          Age: age,
          Country: {
            $in: [
              'AFRICA',
              'ASIA',
              'EUROPE',
              'LATIN AMERICA AND THE CARIBBEAN',
              'NORTHERN AMERICA',
              'OCEANIA'
            ]
          }
        }
      },
      {
        $addFields: {
          TotalPopulation: { $add: ['$M', '$F'] }
        }
      }
    ])
    .toArray();

  console.log(result);
}

const filePath = 'population_pyramid_1950-2022.csv';

async function main() {
  try {
    await insertData(filePath);
    await getPopulationPerYear('Ukraine');
    await getContinentPopulation(2020, '100+');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

main();
