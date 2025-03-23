CREATE TABLE ingredients (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS units (
    unit_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS recipe_ingredient_quantities (
    recipe_id INT,
    ingredient_id INT,
    quantity DECIMAL(10, 2) NOT NULL,
    unit_id INT,
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id) ON DELETE CASCADE,
    FOREIGN KEY (unit_id) REFERENCES units(unit_id) ON DELETE CASCADE
);


INSERT INTO units (name) VALUES
('grams'),
('milliliters'),
('cups'),
('tablespoons'),
('teaspoons');

INSERT INTO ingredients (name) VALUES
('Flour'),
('Sugar'),
('Milk'),
('Eggs'),
('Butter');

INSERT INTO recipe_ingredient_quantities (recipe_id, ingredient_id, quantity, unit_id) 
VALUES 
(1, 1, 200, 1),   
(1, 2, 100, 1),   
(2, 3, 500, 2);   

INSERT INTO categories (name) VALUES 
('Dessert'),
('Vegetarian'),
('Japanese');

INSERT INTO recipe_categories (recipe_id, category_id) VALUES 
(1, 1), 
(2, 2); 

-- No, I don't think she was in a state 2NF / 3NF
-- I think it is necessary to make the following changes to normalize 
-- the database, decomposition
-- Separated categories and recipes, now M:M via recipe_categories relationship.
-- Separate units table to avoid duplicating rows.
-- Added ON DELETE CASCADE relationships, which minimizes data deletion.