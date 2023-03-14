import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useCookies } from "react-cookie";


const Home = () => {
  
  const [recipes, setRecipes] = useState([]);
  const userID = useGetUserID();
  const [savedrec, setsavedRec] = useState([])
   const [cookies, ] = useCookies(["access_token"]);
  useEffect(() => {
    

    const fetch = async () => {
      try {
       const response= await axios.get("http://localhost:3001/recipes");
         
       setRecipes(response.data)
        
      }
      catch (err) {
        console.log(err)
      }
    }
    
    const savedfecth = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/saved/ids/${userID} `
        );

        setsavedRec(response.data.savedRecipie);
      } catch (err) {
        console.log(err);
      }
      
    }
    fetch()
    if(cookies.access_token)
    savedfecth()
    
  },[])
  const saveRecipie = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        { recipeID, userID },
        { headers: { authorization: cookies.access_token } }
      );
      setsavedRec(response.data.savedRecipie);
      
    }
    catch (err) {
      console.log(err)
    }
    
  }
  const isrecipiesaved = (id) => {
    if (savedrec.includes(id)) {
       return true; 
    }
    
    
  }
  return (
    <div>
      <h1>Recipies</h1>
      <ul>
      
        {recipes.map((recipe) => {
          return (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
                <button
                  onClick={() => saveRecipie(recipe._id)}
                  disabled={isrecipiesaved(recipe._id)}
                >
                  {isrecipiesaved(recipe._id)? "Saved":"Save"}
                </button>
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
  )
}

export default Home