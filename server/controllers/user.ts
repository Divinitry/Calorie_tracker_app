import pkg from 'express';
import userSchema from '../models/userSchema.ts';
import resetSchema from '../models/resetSchema.ts';
import bcrypt from 'bcrypt';
import { generateJWT } from "../config/serverHelpers/generateJWTToken.ts"
import sendRecoveryHash from "../config/serverHelpers/nodeMailerTransport.ts"
import generateRecoveryCode from '../config/serverHelpers/generateRecoveryCode.ts';

const createUser = async (req: pkg.Request, res: pkg.Response) => {
  try {
    const { username, email, password, age, heightInCm, currentWeightLbs, caloriesGoal, proteinGoal, fatGoal, carbGoal, stepGoal } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userSchema.create({
      username,
      email,
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

    const token = generateJWT({ id: newUser._id, username: newUser.username })

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const checkUsernameAvailability = async (req: pkg.Request, res: pkg.Response) => {
  const createdUsername = req.params["username"]
  try {
    const userExists = await userSchema.find({ username: createdUsername })

    if (userExists.length > 0) {
      res.status(200).json({ available: false })
    } else {
      res.status(200).json({ available: true })
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

const requestReset = async (req: pkg.Request, res: pkg.Response) => {
  try {
    const email = req.body.email
    const emailExists = await userSchema.findOne({ email });

    if (!emailExists) {
      return res.status(200).json({ message: "Recovery email sent" });
    }

    const code = generateRecoveryCode();
    const hashedCode = bcrypt.hashSync(code, 10);

    await resetSchema.findOneAndUpdate(
      { email },
      { $set: { code: hashedCode, createdAt: new Date() } },
      { upsert: true, new: true }
    );

    await sendRecoveryHash({ userEmail: email, code });

    return res.json({ message: "Recovery email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const confirmReset = async (req: pkg.Request, res: pkg.Response) => {
  try {
    const { email, code, newPassword } = req.body;

    const resetDoc = await resetSchema.findOne({ email });
    if (!resetDoc) {
      return res.status(400).json({ message: "Invalid or expired reset Token." });
    }

    const isMatch = await bcrypt.compare(code, resetDoc.code);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid or expired reset token." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userSchema.updateOne({ email }, { $set: { password: hashedPassword } });

    await resetSchema.deleteOne({ _id: resetDoc._id });

    return res.status(200).json({ message: "Password reset successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { createUser, checkUsernameAvailability, requestReset, confirmReset } 