import pkg from 'express';
import userSchema from '../models/userSchema.ts';
import bcrypt from 'bcrypt';

// need to create JWT token when they createUser 
// create a helper function that creates a JWT Token so its reusable

const createUser = async (req: pkg.Request, res: pkg.Response) => {
    try {
        const { username, password, age, heightInCm, currentWeightLbs, caloriesGoal, proteinGoal, fatGoal, carbGoal, stepGoal } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userSchema.create({
            username,
            password: hashedPassword,
            age,
            stats: {
                heightInCm,
                currentWeightLbs,
            },
            dailies: {
                caloriesGoal,
                proteinGoal,
                fatGoal,
                carbGoal,
                stepGoal,
                caloriesConsumed: 0,
                stepsTaken: 0,
                proteinConsumed: 0,
                fatConsumed: 0,
                carbsConsumed: 0,
            }
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const checkUsernameAvailability = async (req: pkg.Request, res: pkg.Response) => {
    const createdUsername = req.params["username"]
    try {
        const userExists = await userSchema.find({username: createdUsername})

        if(userExists.length > 0){
            res.status(200).json({available: false})
        } else{
            res.status(200).json({available: true})
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

export { createUser, checkUsernameAvailability } 
