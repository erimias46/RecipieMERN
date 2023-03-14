import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID.js";

const Save = () => {
  const [recipes, setRecipes] = useState([]);
  const userID = useGetUserID();
 
  useEffect(() => {
    const savedfecth = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/saved/${userID} `
        );

        setRecipes(response.data.savedRecipie);
      } catch (err) {
        console.log(err);
      }
    };
    
    savedfecth();
  }, []);
 
  
  return (
    <div>
      <h1>Saved Recipies</h1>
      <ul>
        {recipes.map((recipe) => {
          return (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
              </div>
              <div className="instruction">
                <p>{recipe.instruction}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time : {recipe.cookingTime} (minutes)</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Save;
