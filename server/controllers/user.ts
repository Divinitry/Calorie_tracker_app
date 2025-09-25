import pkg from 'express';
import userSchema from '../models/userSchema.ts';

const createUser = async (req: pkg.Request, res: pkg.Response) => {
    try {
        const user = await userSchema.create({
            username: "test",
            password: "testpassword123",
    
            age: 50,
    
            dailies: {
            caloriesGoal: 2000,
            caloriesConsumed: 270,
            stepGoal: 10000,
            stepsTaken: 1200,
            proteinGoal: 172,
            proteinConsumed: 23,
            fatGoal: 80,
            fatConsumed: 10,
            carbGoal: 140,
            carbsConsumed: 10
            },
    
            stats: {
            currentWeightKg: 78,
            heightInCm: 180,
            },
        })
        res.status(201).json({ message: "User successfully added", user });
    } catch (error) {
        res.status(404).send(error)
    }
}

export default createUser