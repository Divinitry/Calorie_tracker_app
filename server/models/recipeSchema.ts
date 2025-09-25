import mongoose from "mongoose";
const { Schema } = mongoose;

const recipeSchema = new Schema({
    name: { type: String, required: true },
    baseServingGrams: { type: Number, required: true },
    caloriesPerServing: { type: Number, required: true },
    proteinPerServing: { type: Number, required: true },
    carbsPerServing: { type: Number, required: false },
    fatPerServing: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Recipe', recipeSchema)