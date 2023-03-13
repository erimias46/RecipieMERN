import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const Home = () => {
  
const [recipes, setRecipes] = useState([]);
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
    fetch()
    
  },[])
  
  return (
    <div>
      <h1>Recipies</h1>
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
  )
}

export default Home