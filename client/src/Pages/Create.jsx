import React, { useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID.js'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


const Create = () => {
   const userID = useGetUserID();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instruction: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });
  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token"]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({...recipe,[name]:value})

    
  }
  const handleIngredientChange = (event,idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
    
  };
  const addIngredinet = () => {
    setRecipe({...recipe,ingredients:[...recipe.ingredients,""]})
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post("http://localhost:3001/recipes", recipe, {
        headers: { authorization: cookies.access_token },
      });
      alert('recipie created')
      navigate("/")
      
    }
    catch (err) {
      console.error(err)
    }
    
  }
  console.log(recipe)
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form action="" onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleChange} />

        <label htmlFor="ingredients">Ingredients</label>
        <button onClick={addIngredinet} type="button">
          Add Ingredinet{" "}
        </button>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            type="text"
            name="ingredient"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, idx)}
          />
        ))}

        <label htmlFor="name">Instruction</label>
        <textarea
          name="instruction"
          id=""
          cols="30"
          rows="10"
          onChange={handleChange}
        ></textarea>

        <label htmlFor="name">ImageUrl</label>
        <input type="text" name="imageUrl" onChange={handleChange} />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input type="number" name="cookingTime" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Create