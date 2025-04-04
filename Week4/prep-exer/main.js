const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

console.log(process.env.MONGODB_URL);
async function createDataBaseRecipe() {
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
  });

  try {
    await client.connect();
    console.log('you connection done!!!');
    await client.db('DBrecipes').createCollection('recipes');
    const recipes = client.db().collection('recipes');
    await recipes.insertMany([
      {
        name: 'No-Bake Cheesecake',
        categories: ['Cake', 'No-Bake', 'Vegetarian'],
        ingredients: [
          { name: 'Condensed milk', amount: '1 can' },
          { name: 'Cream Cheese', amount: '200g' },
          { name: 'Lemon Juice', amount: '2 tbsp' },
          { name: 'Pie Crust', amount: '1 piece' },
          { name: 'Cherry Jam', amount: '100g' }
        ],
        steps: [
          { order: 1, description: 'Beat Cream Cheese' },
          { order: 2, description: 'Add condensed Milk and blend' },
          { order: 3, description: 'Add Lemon Juice and blend' },
          { order: 4, description: 'Add the mix to the pie crust' },
          { order: 5, description: 'Spread the Cherry Jam' },
          { order: 6, description: 'Place in refrigerator for 3h' }
        ]
      },
      {
        name: 'Roasted Brussels Sprouts',
        category: ['Vegetarian', 'Vegan', 'Gluten-Free'],
        ingredients: [
          { name: 'Brussels Sprouts', amount: '200g' },
          { name: 'Olive Oil', amount: '2 tbsp' },
          { name: 'Salt', amount: '1 tsp' },
          { name: 'Pepper', amount: '1/2 tsp' },
          { name: 'Sesame seeds', amount: '1 tbsp' }
        ],
        steps: [
          { order: 1, description: 'Preheat the oven to 200°C (392°F).' },
          {
            order: 2,
            description:
              'Cut Brussels sprouts in half and place them in a bowl.'
          },
          {
            order: 3,
            description:
              'Add olive oil, salt, pepper, and sesame seeds. Mix well.'
          },
          {
            order: 4,
            description: 'Spread the Brussels sprouts on a baking sheet.'
          },
          {
            order: 5,
            description: 'Roast for 25-30 minutes, stirring halfway through.'
          },
          { order: 6, description: 'Remove from oven and serve hot.' }
        ]
      },
      {
        name: 'Mac & Cheese',
        category: ['Vegetarian'],
        ingredients: [
          { name: 'Macaroni', amount: '200g' },
          { name: 'Butter', amount: '2 tbsp' },
          { name: 'Flour', amount: '2 tbsp' },
          { name: 'Milk', amount: '1 cup' },
          { name: 'Shredded Cheddar cheese', amount: '150g' },
          { name: 'Salt', amount: '1 tsp' },
          { name: 'Pepper', amount: '1/2 tsp' }
        ],
        steps: [
          {
            order: 1,
            description:
              'Cook macaroni according to package instructions and drain.'
          },
          {
            order: 2,
            description: 'Melt butter in a saucepan over medium heat.'
          },
          {
            order: 3,
            description:
              'Add flour, salt, and pepper, stirring constantly for 1 minute.'
          },
          {
            order: 4,
            description:
              'Slowly add milk, stirring to avoid lumps. Cook until thickened.'
          },
          {
            order: 5,
            description:
              'Remove from heat and stir in shredded cheddar cheese until melted.'
          },
          { order: 6, description: 'Mix in cooked macaroni and serve warm.' }
        ]
      }
    ]);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

createDataBaseRecipe();

// since our tables, that is, collections, are recipes for dishes,
// then in Mongolia it would be most appropriate to use each document as an example of a recipe and in it,
// therefore, it is necessary to indicate all the necessary elements: steps, ingredients.

// sql and nosql have their own advantages and disadvantages.
// sql is probably better for structured data with clear relationships.
// nosql document-oriented model of MongoDB allows to create flexible and dynamic schemes.
// transactions are more reliable in mysql than in mongodb therefore it is more often used by banks
// and financial institutions
