// https://api.spoonacular.com/recipes/complexSearch?apiKey=17be99a7ad524f6eaf2e4da9306f6427&query=Rice&cuisine=american
const { default: axios } = require('axios');
const express=require('express');
const { RecipeModel } = require('../model/recipe.model');
const recipeRouter=express.Router()
require('dotenv').config()
// const API = 'https://api.spoonacular.com/recipes';
const key = "17be99a7ad524f6eaf2e4da9306f6427";

/**Search Recipes */
recipeRouter.get("/search",async(req,res)=>{
    // console.log("req.query:",req.query.query)
    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
          params: {
            apiKey: key,
            query: req.query.query, 
          },
        });
        console.log("response:",response.data.results)
        res.status(200).send({"msg":`Getting Item related to ${req.query.query}`,"Data":response.data.results});
      } catch (error) {
        res.status(500).status(200).send({ error: 'Failed to fetch recipes as per your search' });
      }
})


// Saved recipe
recipeRouter.post("/saved", async (req, res) => {
    const { userId, recipeId } = req.body;
    try {
        // Check if the recipe is already saved by the user, and if not, save it
        const existingRecipe = await RecipeModel.findOne({ userId, recipeId });
        if (!existingRecipe) {
            const savedRecipe = new RecipeModel({ userId, recipeId });
            await savedRecipe.save();
            res.status(200).json({ msg: 'Recipe saved successfully', data: savedRecipe });
        } else {
            res.status(200).json({ msg: 'Recipe is already saved by the user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save the recipe' });
    }
});



module.exports={
    recipeRouter
}
