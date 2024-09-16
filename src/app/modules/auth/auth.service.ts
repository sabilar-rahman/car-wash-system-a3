import { TUser } from "../user/user.interface"
import { UserModel } from "../user/user.model"


const registeredUserIntoDB = async (payload: TUser) => {
    const result = await UserModel.create(payload)
    return result
  }
  
  export const AuthServices = {
    registeredUserIntoDB,
  }