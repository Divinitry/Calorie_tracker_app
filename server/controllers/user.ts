import pkg from 'express';
import userSchema from '../models/userSchema.ts';
import bcrypt from 'bcrypt';

const createUser = async (req: pkg.Request, res: pkg.Response) => {
    try {
        console.log(req.body)
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

export default createUser;
