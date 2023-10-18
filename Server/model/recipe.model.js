const mongoose=require('mongoose')

const recipeSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },

})

const RecipeModel=mongoose.model('recipe',recipeSchema)

module.exports={
    RecipeModel
}