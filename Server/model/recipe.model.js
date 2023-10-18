const mongoose=require('mongoose')

const recipeSchema=mongoose.Schema({
    
    userId:{
        type:String,
        required:true
    },
    recipeId:{
        type:Array,
        default:[],
        required:true
    }

},{
    timestamps: true,
    versionKey:false
})

const RecipeModel=mongoose.model('recipe',recipeSchema)

module.exports={
    RecipeModel
}