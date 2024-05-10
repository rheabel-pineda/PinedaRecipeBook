import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ title: '', ingredients: '', instructions: '' });

  useEffect(() => {
    // Fetch all recipes from the backend when the component mounts
    axios.get('/recipes')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const handleAddRecipe = () => {
    axios.post('/recipes', newRecipe)
      .then(response => {
        setRecipes([...recipes, response.data]);
        setNewRecipe({ title: '', ingredients: '', instructions: '' });
      })
      .catch(error => {
        console.error('Error adding recipe:', error);
      });
  };

  const handleDeleteRecipe = (id) => {
    axios.delete(`/recipes/${id}`)
      .then(() => {
        setRecipes(recipes.filter(recipe => recipe._id !== id));
      })
      .catch(error => {
        console.error('Error deleting recipe:', error);
      });
  };

  return (
    <div>
      <h1>Recipe Book</h1>
      <div>
        <h2>Add New Recipe</h2>
        <input type="text" name="title" placeholder="Title" value={newRecipe.title} onChange={handleInputChange} />
        <input type="text" name="ingredients" placeholder="Ingredients" value={newRecipe.ingredients} onChange={handleInputChange} />
        <textarea name="instructions" placeholder="Instructions" value={newRecipe.instructions} onChange={handleInputChange}></textarea>
        <button onClick={handleAddRecipe}>Add Recipe</button>
      </div>
      <div>
        <h2>Recipes</h2>
        <ul>
          {recipes.map(recipe => (
            <li key={recipe._id}>
              <h3>{recipe.title}</h3>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              <button onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
