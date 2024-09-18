import { model, Schema } from "mongoose";
import { userRoleEnum } from "./user.constant";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: userRoleEnum,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//   password hashing process
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// remove password from response
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});



//remove user from response
userSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}


export const UserModel = model<TUser>("user", userSchema);
