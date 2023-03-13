import { RecipieModel } from "../Models/Recipes.js";
import express from 'express';
import mongoose from "mongoose";
import { UserModel } from "../Models/User.js";


const router = express.Router()

router.get('/', async (req, res) => {
    
    try {
        const response = await RecipieModel.find()
        res.json(response)
        
    }
    catch (err) {
        res.json(err)
        
    }
    
})

router.post('/', async (req, res) => {

    const recipe = new RecipieModel(req.body)
    
    try {
      const response = await recipe.save();
      res.json(response);
    } catch (err) {
      res.json(err);
    }
    
})
router.put('/', async (req, res) => {
    try {
    const recipe = await RecipieModel.findById(req.body.recipeID)
    const user = await UserModel.findById(req.body.userID)
    user.savedRecipie = push(recipe);
        await user.save()
        res.json({savedRecipie:user.savedRecipie});
        
    }
    catch (err) {
        res.json(err)
    }
   
    
    
})
router.get('/saved/ids', async (req, res) => {
    
    try {
        const user = await UserModel.findById(req.body.userID)
        res.json({savedRecipie:user?.savedRecipie})
        
    }
    catch (err) {
        res.json(err)
    }
    
})

router.get("/saved/", async (req, res) => {
    const user = await UserModel.findById(req.body.userID);
    const savedRecipie = await RecipieModel.find({
        _id:{$in:user.savedRecipie}
    })
    res.json({savedRecipie});
    
});

export { router as recipieRouter };




