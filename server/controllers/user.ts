import pkg from 'express';
import userSchema from '../models/userSchema.ts';

const createUser = async (req: pkg.Request, res: pkg.Response) => {
    try {
        const user = await userSchema.create({
            username: "",
            password: "",
        })
        res.status(201).json({ message: "User successfully created", user });
    } catch (error) {
        res.status(404).send(error)
    }
}

export default createUser