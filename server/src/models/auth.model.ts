import mongoose, { CallbackError } from "mongoose";
import bcrypt from "bcrypt";

export type TUser = {
  _id: number;
  name: string;
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
};

const userSchema = new mongoose.Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  const user = this;

  try {
    if (!user.isModified("password")) return next();

    const hash = await bcrypt.hash(user.password, 13);
    user.password = hash;
    return next();
  } catch (error) {
    console.error(error);
    return next(error as CallbackError | undefined);
  }
});

userSchema.methods.comparePassword = async function (password: string) {
  try {
    let result = await bcrypt.compare(password, this.password);

    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const UserModel = mongoose.model<TUser>("User", userSchema);

export default UserModel;
