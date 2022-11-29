import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserlogin } from "../../interfaces/users";
import { AppError } from "../../errors/AppError";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import "dotenv/config";

const createSessionUserService = async ({
  email,
  password,
}: IUserlogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError("Email or Password Invalid!", 403);
  }

  const pwdMatch = compare(password, user.password);

  if (!pwdMatch) {
    throw new AppError("Invalid Credentials!", 403);
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "12h",
    }
  );

  return token;
};
export default createSessionUserService;
