import mongoose from "mongoose";
const { Schema } = mongoose;

const apiRecipeSchema = new Schema({
  name: { type: String, required: true },
  baseServingGrams: { type: Number, required: true },
  caloriesPerServing: { type: Number, required: true },
  proteinPerServing: { type: Number, required: true },
  carbsPerServing: { type: Number, required: true },
  fatPerServing: { type: Number, required: true },
  source: { type: String, enum: ["openfoodfacts"], default: "user" },
  externalId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const ApiRecipe = mongoose.model("ApiRecipe", apiRecipeSchema);
export default ApiRecipe;