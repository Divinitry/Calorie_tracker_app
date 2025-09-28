import mongoose from 'mongoose';
import foodLogSchema from './foodLogSchema.ts';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}, // hash password

    age: {
        type: Number,
        min: [1, "Age must be atleast 1."],
        max: [100, "Age cannot be greater than 100."]
    },

    dailies: {
    caloriesGoal: { type: Number, min: 1, max: 10000 },
    caloriesConsumed: { type: Number, default: 0 },
    stepGoal: { type: Number, min: 1 },
    stepsTaken: { type: Number, default: 0 },
    proteinGoal: { type: Number, min: 1 },
    proteinConsumed: { type: Number, default: 0 },
    fatGoal: { type: Number, min: 1 },
    fatConsumed: { type: Number, default: 0 },
    carbGoal: { type: Number, min: 1 },
    carbsConsumed: { type: Number, default: 0 }
    },

    stats: {
    currentWeightKg: { type: Number, min: 1 },
    heightInCm: { type: Number, min: 1 },
    },

    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    dailyFoodLog: [foodLogSchema]
    
}, { timestamps: true, collection: "users"})

export default mongoose.model('User', userSchema)