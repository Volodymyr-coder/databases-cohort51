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
FOREIGN KEY(recipe_id) REFERENCES recipes(recipe_id),
FOREIGN KEY(ingredient_id) REFERENCES ingredients(ingredient_id) 
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

    await connection.query(recipe_db);
    await connection.query(`USE recipes_db`);

    await connection.query(recipe);
    await connection.query(categories);
    await connection.query(recipe_categories);
    await connection.query(ingredients);
    await connection.query(recipe_ingredients);
    await connection.query(steps);
    await connection.query(recipe_steps);

    const newRecipes = [
      ['No-Bake Cheesecake'],
      ['Roasted Brussels Sprouts'],
      ['Mac & Cheese'],
      ['Tamagoyaki Japanese Omelette']
    ];
    const insertRecipes = `INSERT INTO recipes (name) VALUES ?`;

    const newCategories = [
      ['Cake'],
      ['No-Bake'],
      ['Vegetarian'],
      ['Vegan'],
      ['Gluten-Free'],
      ['Japanese']
    ];
    const insertCategories = `INSERT INTO categories (name) VALUES ?`;

    const newIngredients = [
      ['Condensed milk'],
      ['Cream Cheese'],
      ['Lemon Juice'],
      ['Pie Crust'],
      ['Cherry Jam'],
      ['Brussels Sprouts'],
      ['Sesame seeds'],
      ['Pepper'],
      ['Salt'],
      ['Olive Oil'],
      ['Macaroni'],
      ['Butter'],
      ['Flour'],
      ['Milk'],
      ['Shredded Cheddar cheese'],
      ['Eggs'],
      ['Soy sauce'],
      ['Sugar']
    ];

    const insertIngredients = 'INSERT INTO ingredients (name) VALUES ?';

    const newSteps = [
      ['Beat Cream Cheese'],
      ['Add condensed Milk and blend'],
      ['Add Lemon Juice and blend'],
      ['Add the mix to the pie crust'],
      ['Spread the Cherry Jam'],
      ['Place in refrigerator for 3h'],
      ['Preheat the oven'],
      ['Mix the ingredients in a bowl'],
      ['Spread the mix on baking sheet'],
      ['Bake for 30 minutes'],
      ['Cook Macaroni for 8 minutes'],
      ['Melt butter in a saucepan'],
      ['Add flour, salt, pepper and mix'],
      ['Add Milk and mix'],
      ['Cook until mix is smooth'],
      ['Add cheddar cheese'],
      ['Add the macaroni'],
      ['Beat the eggs'],
      ['Add soya sauce, sugar and salt'],
      ['Add oil to a sauce pan'],
      ['Bring to medium heat'],
      ['Add some mix to the sauce pan'],
      ['Let it cook for 1 minute'],
      ['Remove pan from fire']
    ];

    const insertSteps = `INSERT INTO steps (description) VALUES ?`;

    await connection.query(insertRecipes, [newRecipes]);
    await connection.query(insertCategories, [newCategories]);
    await connection.query(insertIngredients, [newIngredients]);
    await connection.query(insertSteps, [newSteps]);

    const recipeCategories = [
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 4],
      [2, 5],
      [3, 3],
      [4, 3],
      [4, 6]
    ];
    const insertRecipeCategories = `INSERT INTO recipe_categories (recipe_id, category_id) VALUES ?`;
    await connection.query(insertRecipeCategories, [recipeCategories]);

    const recipeIngredients = [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [2, 6],
      [2, 3],
      [2, 7],
      [2, 8],
      [2, 9],
      [2, 10],
      [3, 11],
      [3, 12],
      [3, 13],
      [3, 9],
      [3, 8],
      [3, 14],
      [3, 15],
      [4, 16],
      [4, 17],
      [4, 18],
      [4, 9],
      [4, 10]
    ];
    const insertRecipeIngredients = `INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES ?`;
    await connection.query(insertRecipeIngredients, [recipeIngredients]);

    const recipeSteps = [
      [1, 1, 1],
      [1, 2, 2],
      [1, 3, 3],
      [1, 4, 4],
      [1, 5, 5],
      [1, 6, 6],
      [2, 7, 1],
      [2, 8, 2],
      [2, 9, 3],
      [2, 10, 4],
      [3, 11, 1],
      [3, 12, 2],
      [3, 13, 3],
      [3, 14, 4],
      [3, 15, 5],
      [3, 16, 6],
      [3, 17, 7],
      [4, 18, 1],
      [4, 19, 2],
      [4, 20, 3],
      [4, 21, 4],
      [4, 22, 5],
      [4, 23, 6],
      [4, 24, 7]
    ];

    const insertRecipeSteps = `INSERT INTO recipe_steps (recipe_id, step_id, stepByOrder) VALUES ?`;
    await connection.query(insertRecipeSteps, [recipeSteps]);

    const vegetarianPotato = async () => {
      const veganPotato = `SELECT recipes.name FROM recipes
            JOIN recipe_categories ON recipes.recipe_id = recipe_categories.recipe_id
            JOIN categories ON recipe_categories.category_id = categories.category_id
            JOIN recipe_ingredients ON Recipes.Recipe_id = recipe_ingredients.recipe_id
            JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.ingredient_id
            WHERE categories.name = 'Vegetarian';
`;
      const [results] = await connection.query(veganPotato);
      results.forEach((row) => {
        console.log(row.name);
      });
    };

    const notBakingCakes = async () => {
      const cakes = `SELECT recipes.name FROM recipes
            JOIN recipe_categories ON recipes.recipe_id = recipe_categories.recipe_id
            JOIN categories ON recipe_categories.category_id = categories.category_id
            WHERE categories.name = 'Cake'
            AND recipes.recipe_id IN (
                SELECT recipe_categories.recipe_id
                FROM recipe_categories
                JOIN categories ON recipe_categories.category_id = categories.category_id
                WHERE categories.name = 'No-Bake');
`;
      const [results] = await connection.query(cakes);
      results.forEach((row) => {
        console.log(row.name);
      });
    };

    const veganJapanece = async () => {
      const vegan = `SELECT recipes.name FROM recipes
             JOIN recipe_categories ON recipes.recipe_id = recipe_categories.recipe_id
            JOIN categories ON recipe_categories.category_id = categories.category_id
            WHERE categories.name = 'Vegetarian'
            AND recipes.recipe_id IN (
                SELECT recipe_categories.recipe_id
                FROM recipe_categories
                JOIN categories ON recipe_categories.category_id = categories.category_id
                WHERE categories.name = 'Japanese'
            );
`;
      const [results] = await connection.query(vegan);
      results.forEach((row) => {
        console.log(row.name);
      });
    };

    await vegetarianPotato();
    await notBakingCakes();
    await veganJapanece();
    console.log('data base and tables create');
  } catch (error) {
    console.error('Error: ', error.message);
  } finally {
    await connection.end();
  }
}

createRecipesDB();
