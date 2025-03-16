import mysql2 from 'mysql2/promise';
async function createRecipesDB() {
  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
  });

  try {
    await connection.query(`DROP DATABASE IF EXISTS recipes_db;`);

    const recipe_db = `
    CREATE DATABASE IF NOT EXISTS recipes_db;
  `;

    const recipe = `CREATE TABLE IF NOT EXISTS recipes (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL
)`;

    const categories = `CREATE TABLE IF NOT EXISTS categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL
)`;

    const recipe_categories = `CREATE TABLE IF NOT EXISTS recipe_categories(
  recipe_id INT,
  category_id INT,
  PRIMARY KEY(recipe_id, category_id),
  FOREIGN KEY(recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE,
  FOREIGN KEY(category_id) REFERENCES categories(category_id) ON DELETE CASCADE
  )`;

    const ingredients = `CREATE TABLE IF NOT EXISTS ingredients (
  ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL
 )`;

    const recipe_ingredients = `
CREATE TABLE IF NOT EXISTS recipe_ingredients(
recipe_id INT,
ingredient_id INT,
PRIMARY KEY(recipe_id, ingredient_id),
FOREIGN KEY(recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE,
FOREIGN KEY(ingredient_id) REFERENCES ingredients(ingredient_id) ON DELETE CASCADE
)`;

    const steps = `
CREATE TABLE IF NOT EXISTS steps (
step_id INT AUTO_INCREMENT PRIMARY KEY,
description TEXT NOT NULL
)`;

    const recipe_steps = `CREATE TABLE recipe_steps(
  recipe_id INT,
  step_id INT,
  stepByOrder INT NOT NULL,
  PRIMARY KEY(recipe_id, step_id),
  FOREIGN KEY(recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE,
  FOREIGN KEY(step_id) REFERENCES steps(step_id) ON DELETE CASCADE
  )`;

    const newCategories = [['Cake'], ['No-Bake'], ['Vegetarian']];
    const insertCategories = `INSERT INTO categories (name) VALUES ?`;

    const newIngredients = [
      ['Condensed milk'],
      ['Cream Cheese'],
      ['Lemon Juice'],
      ['Pie Crust'],
      ['Cherry Jam']
    ];

    const insertIngredients = 'INSERT INTO ingredients (name) VALUE ?';

    const newSteps = [
      ['Beat Cream Cheese'],
      ['Add condensed Milk and blend'],
      ['Add Lemon Juice and blend'],
      ['Add the mix to the pie crust'],
      ['Spread the Cherry Jam'],
      ['Place in refrigerator for 3h.']
    ];

    const insertSteps = `INSERT INTO steps (description) VALUE ?`;
    await connection.query(recipe_db);
    await connection.query(`USE recipes_db`);

    await connection.query(recipe);
    await connection.query(categories);
    await connection.query(recipe_categories);
    await connection.query(ingredients);
    await connection.query(recipe_ingredients);
    await connection.query(steps);
    await connection.query(recipe_steps);
    await connection.query(insertCategories, [newCategories]);
    await connection.query(insertIngredients, [newIngredients]);
    await connection.query(insertSteps, [newSteps]);

    console.log('data base and tables create');
  } catch (error) {
    console.error('Error: ', error.message);
  } finally {
    await connection.end();
  }
}

createRecipesDB();
