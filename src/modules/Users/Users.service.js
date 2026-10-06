import { userModel } from "../../DB/models/Users.model.js";

export const usersign = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const emailexsit = await userModel.findOne({ where: { email } });
    if (emailexsit)
      return res.status(409).json({ message: "Email already exsit..." });
    const user = userModel.build({
      name,
      email,
      password,
      role,
    });
    await user.save();
    res.status(201).json({ message: "user added successfully" });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};

export const createOrUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, age, role } = req.body;

    const user = await userModel.upsert(
      {
        id,
        name,
        email,
        age,
        role,
      },
      {
        validate: false,
      },
    );
    res.status(201).json({ message: "user created or ubdate successfullyage" });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};
export const findByEmail = async (req, res, next) => {
  try {
    const { email } = req.query;
    const user = await userModel.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "not user found" });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};
export const getuser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByPk(id, {
      attributes: { exclude: ["role"] },
    });

    if (!user) return res.status(404).json({ message: "not user found" });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};
