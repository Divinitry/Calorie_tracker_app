import mongoose from "mongoose";
const { Schema } = mongoose;

const foodLogSchema = new Schema({
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe", required: true },
    gramsEaten: { type: Number, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fat: { type: Number, required: true },
    loggedAt: { type: Date, default: Date.now },
})

export default foodLogSchema