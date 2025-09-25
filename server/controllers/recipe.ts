import pkg from 'express';
import recipeSchema from '../models/recipeSchema.ts';

const createRecipe = async (req: pkg.Request, res: pkg.Response) => {
    try {
        const recipe = recipeSchema.create({
            name: "potatoes",
            baseServingGrams: 150,
            caloriesPerServing: 110,
            proteinPerServing: 4
        })
    } catch (error) {
        
    }
}

export default createRecipe